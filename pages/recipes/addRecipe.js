Page({

  /**
   * Page initial data
   */
  data: {
    ingredients:[{name:"chicken", id:1 ,calories:160},{name:"chicken_1", id:2,calories:120},{name:"chicken_2", id:3 ,calories:100},{name:"chicken_3", id:4 ,calories:100}],
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
    const cart = this.data.cart || []
    cart.push(cart_item)
    this.setData({
      cart: cart,
      show_window: false
    })
  },
  goToConfirm(){
    console.log("aslkdlk")
    const page = this
    if(page.data.cart.length == 0){
      wx.showToast({
        title: 'Please Add Ingredients',
      })
    }
    wx.setStorage({
      key:"cart",
      data: page.data.cart
    })
    wx.navigateTo({
      url: '/pages/recipes/confirmRecipe',
    })
  }
})