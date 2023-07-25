// pages/welcome/welcome.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    animationData: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const animation = wx.createAnimation({
      duration: 5000,
      timingFunction: 'cubic-bezier(0.37, 0, 0.63, 1)',
    })

    this.animation = animation

    animation.translateY(-100).opacity(0.45).step()

    this.setData({
      animationData: animation.export()
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

  }
})