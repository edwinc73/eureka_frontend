// pages/recipes/confirmRecipe.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    tempFiles:[],
    showLoading: false,
    newImage: false,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const page = this
    page.setData({
      newRecipe: options.newRecipe == "true"
    })
    wx.getStorage({
      key: "cart",
      success(res){
        page.setData({
          cart: res.data
        })
      }
    })

    if(!page.data.newRecipe){
      wx.getStorage({
        key:"recipe details",
        success(res){
          page.setData({
            recipeDetail: res.data,
            name : res.data.name,
            description: res.data.description,
            instructions: res.data.instructions,
            tempFiles: [res.data.photo[0]],
            id: res.data.id
          })
        }
      })
    }
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
          newImage: true,
          tempFiles: res.tempFiles
        })
      }
    })
  },
  submitRecipe(e){
    const page = this
    const newRecipe = page.data.newRecipe
    const recipe = e.detail.value
    const ingredientsData = this.data.cart
    const reformattedData = {}
    ingredientsData.forEach(ingredient => {
      reformattedData[ingredient.name] = {
          id: ingredient.id,
          portion: ingredient.portion / 100
        }
      })

    const {name,description,instructions} = recipe
    const tempFiles = this.data.tempFiles
    if(!name || !description || !instructions || tempFiles.length == 0){
      wx.showToast({
        icon: 'error',
        duration: 2000,
        title: 'Missing input',
      })
    } else if (newRecipe){
      page.setData({ showLoading: true })
      wx.request({
        url: `${app.globalData.baseUrl}/recipes`,
        method: "POST",
        header: app.globalData.header,
        data:{
          recipe: recipe,
          ingredients: reformattedData
        },
        success(res){
          console.log(res)
          const id = res.data.recipe_id
          app.globalData.popUp = res.data.recipe_trailblazer
          wx.uploadFile({
            url: `${app.globalData.baseUrl}/recipes/${res.data.recipe_id}/upload_img`,
            filePath: page.data.tempFiles[0].tempFilePath,
            name: 'photos',
            header: app.globalData.header,
            complete(res){
              wx.clearStorage({ key: "cart" })
              wx.showToast({
                title: "Recipe Added",
              })
              wx.redirectTo({
                url: `/pages/recipes/recipes?id=${id}&showdetail=true&showreview=false&portion=0`
              })
            }
          })
        }
      })
    } else {
      const recipe ={
        name: this.data.name,
        instructions: this.data.instructions,
        description: this.data.description
      }
      wx.request({
        url: `${app.globalData.baseUrl}/recipes/${page.data.id}`,
        header: app.globalData.header,
        data:{ recipe },
        success(res){
          console.log(page.data.id)
          console.log(res)
        }
      })
    }
  },
  changeInput(e){
    const value = e.detail.value
    const input = e.currentTarget.dataset.name
    this.setData({
      [input] : value
    })
  }
})