// pages/profile/profile.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    show: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const page = this
    wx.request({
      url: `${app.globalData.baseUrl}/profile`,
      header: app.globalData.header,
      method: 'GET',
      success: (res) => {
        page.setData({
          username: res.data.username,
          age: res.data.age,
          height: res.data.height,
          current_weight: res.data.weight,
          goal_weight: res.data.goal_weight,
          bmi: (res.data.weight/ [(res.data.height/100) * (res.data.height/100)]).toFixed(1),
          badges: res.data.badges
        })
      }
    })
  },

  click(e) {
    const page = this
    const index = e.currentTarget.dataset.index
    const badge = page.data.badges[index]
    page.setData({
      currentBadge: badge,
      show: !page.data.show
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
        selected: 2
      })
    }
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