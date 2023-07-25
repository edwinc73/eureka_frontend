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
      duration: 2000,
      timingFunction: 'ease-in-out',
    })

    this.animation = animation

    animation.translateY(-50).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(() => {
      wx.switchTab({ url: '/pages/homepage/homepage' })
    }, 2500);

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