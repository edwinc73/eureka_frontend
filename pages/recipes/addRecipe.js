const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    ingredients:[],
    show_window: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    const page = this
    wx.getStorage({
      key: 'cart',
      success (res) {
        console.log(res)
        page.setData({
          cart: res.data
        })
      },
      fail(res){
        page.setData({
          cart: []
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },
  openDialogueWindow(e){
    const id = e.currentTarget.dataset.id
    const ingredient = this.data.ingredients.filter(x=> x.id == id )[0]
    this.setData({
      portion: 100,
      show_window: true,
      currentIngredient: ingredient
    })
  },
  removeCartItem(e){
    const index = e.currentTarget.dataset.index
    const cart = this.data.cart
    cart.splice(index, 1)
    this.setData({
      cart: cart
    })
  },
  switchShow(){
    this.setData({
      show_window: !this.data.show_window
    })
  },
  portionChange(e){
    this.setData({
      portion: e.detail.value
    })
  },
  addToCart(){
    const cart_item = {
      name: this.data.currentIngredient.name,
      id: this.data.currentIngredient.id,
      portion: this.data.portion
    }
    const cart = this.data.cart
    cart.push(cart_item)
    this.setData({
      cart: cart,
      show_window: false
    })
  },
  goToConfirm(){
    const page = this
    console.log(this.data.cart.length)
    if(page.data.cart.length == 0){
      wx.showToast({
        icon: 'error',
        duration: 2000,
        title: 'No Ingredients',
      })
    } else {
      wx.setStorage({
        key:"cart",
        data: page.data.cart
      })
      wx.navigateTo({
        url: '/pages/recipes/confirmRecipe',
      })
    }
  },
  searchIngredient(e){
    const page = this
    const query = e.detail.value
    wx.request({
      url: `${app.globalData.baseUrl}/ingredients?query=${query}`,
      header: app.globalData.header,
      success(res){
        page.setData({
          ingredients: res.data
        })
      }
    })
  }
  
})

// beef: { id: 1, portion: 1 },
//       # rice: { id: 2, portion: 1 },
//       # broccoli: { id: 3, portion: 1 }