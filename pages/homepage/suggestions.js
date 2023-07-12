// pages/homepage/suggestions.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    allData:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const page = this

    wx.request({
      url: `${app.globalData.baseUrl}/recipes/suggestion`, 
      method: 'GET',
      success: (res) => {
        console.log(res)
        this.setData({ allData: res.data.recipes });
      },
      fail: (err) => {
        console.log(err);
      }
    });
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

  }
})