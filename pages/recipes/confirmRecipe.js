// pages/recipes/confirmRecipe.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    tempFiles:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const page = this
    wx.getStorage({
      key: "cart",
      success(res){
        page.setData({
          cart: res.data
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
  uploadImage(){
    const page = this
    wx.chooseMedia({
      count: 1,
      mediaType: 'image',
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        page.setData({
          tempFiles: res.tempFiles
        })
      }
    })
  },
  submitRecipe(e){
    const recipe = e.detail.value
    const ingredientsData = this.data.cart
    const reformattedData = []
    ingredientsData.forEach(ingredient => {
      reformattedData.push({
        [ingredient.name] : {
          id: ingredient.id,
          portion: ingredient.portion / 100
        }
      })
    });

    console.log({
      recipe: recipe,
      ingredients: reformattedData
    })
    const {name,description,instructions} = recipe
    const tempFiles = this.data.tempFiles
    if(!name || !description || !instructions || tempFiles.length == 0){
      wx.showToast({
        icon: 'error',
        duration: 2000,
        title: 'Missing input',
      })
    } else{
      wx.request({
        url: `${app.globalData.baseUrl}/recipes`,
        method: "POST",
        header: app.globalData.header,
        data:{
          recipe: recipe,
          ingredients: reformattedData
        },
        success(res){
          wx.navigateTo({
            url: '/page/',
          })
        }
      })
    }
  }
})