// pages/homepage/suggestions.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    results: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const page = this
    wx.request({
      url: `${app.globalData.baseUrl}/suggestion`,
      method: 'GET',
      success: (res) => {
        console.log(res)
        page.setData({
          results: res.data
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
  goToRecipe(e){
    console.log("going")
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/recipes/recipes?id=${id}&showdetail=true&showreview=false`,
    })
  }
})