// pages/favourite/favourite.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    recipes:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
  },

  goToRecipe(e){
    const recipe_id = e.currentTarget.dataset.id
    const portion = "0"
    wx.navigateTo({
      url: `/pages/recipes/recipes?id=${recipe_id}&showdetail=true&showreview=false&portion=${portion}`,
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
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }

    const page = this
    wx.request({
      url: `${app.globalData.baseUrl}/favourite_recipes`,
      header:app.globalData.header,
      method: 'GET',
      success: (res) => {
        page.setData({
          recipes: res.data
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
  goToSuggestions(){
    wx.navigateTo({
      url: '/pages/homepage/suggestions',
    })
  }
})