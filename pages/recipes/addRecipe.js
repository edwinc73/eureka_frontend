const app = getApp()
Page({
  data: {
    ingredients:[],
    show_window: false,
    activeIndex: -1,
    filterIngredients:[],
    filterIngredientsAnimation: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const page = this
    page.setData({
      newRecipe: options.newRecipe == "true"
    })
    console.log(options)
    wx.request({
      url: `${app.globalData.baseUrl}/ingredients?query=`,
      header: app.globalData.header,
      success(res){
        page.setData({
          ingredients: res.data,
          filterIngredients: res.data,
          categories: filters(res.data)
        })
      }
    })
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
      currentIngredient: ingredient,
      currentId : id
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
        url: `/pages/recipes/confirmRecipe?newRecipe=${page.data.newRecipe}`,
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
          ingredients: res.data,
          filterIngredients: res.data,
          categories: filters(res.data)
        })
      }
    })
  },
  changeFilter(e){
    const index = parseInt(e.currentTarget.dataset.index, 10)
    const name = e.currentTarget.dataset.name
    const animation = wx.createAnimation({
      duration: 150, 
      timingFunction: 'ease',
    });
  
    animation.opacity(0).step();
    this.setData({
      filterIngredientsAnimation: animation.export(),
    });
  
    setTimeout(() => {
      this.setData({
        activeIndex: index,
        filterIngredients: filterIngredients(name, this.data.ingredients),
      });
    }, 150); 

    setTimeout(() => {
      animation.opacity(1).step();
      this.setData({
        filterIngredientsAnimation: animation.export(),
      });
    }, 300);
  }
})

function filterIngredients(category, list) {
  if(category == "all"){
    return list
  } else{
    return list.filter(ingredient => ingredient.category.toUpperCase() == category.toUpperCase() )
  }
}

function filters(ingredients) {
  const categories =[]
  ingredients.forEach(ingredient =>{
    const category = ingredient.category[0].toUpperCase() + ingredient.category.split("").splice(1,ingredient.category.length).join("")
    if(!categories.includes(category)){
      categories.push(category)
    }
  })
  console.log(categories)
  return categories
}