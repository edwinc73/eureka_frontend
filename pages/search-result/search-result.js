// pages/search-result/search-result.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    results:[]
  },

  /**
   * Lifecycle function--Called when page load
   */

  onLoad(options) {
    const keyword = options.keyword;
    wx.request({
      url:  `${app.globalData.baseUrl}/recipes`, 
      method: 'GET',
      success: (res) => {
        console.log(res)
        this.setData({ results: [...res.data.recipes, ...res.data.ingredients] });
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },

  // handleInputChange(e) {
  //   let value = e.detail.value;
  //   let results = this.data.allData.filter(item => 
  //     (item.name && item.name.toLowerCase().includes(value)) || 
  //     (item.ingredients && item.ingredients.some(ingredient => ingredient && ingredient.toLowerCase().includes(value)))
  //   );
  //   this.setData({ results });
  // },

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
