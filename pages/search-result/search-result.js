// pages/search-result/search-result.js
Page({

  /**
   * Page initial data
   */
  data: {
    results: [],
    searchValue: '', 
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const page = this
    this.setData({
      results: this.data.recipes
    });
  },

  onSearchInput: function(e) {
    const searchValue = e.detail.value;
    this.setData({ searchValue });
    wx.request({
      url: 'http://127.0.0.1:3000/api/v1/recipes', 
      data: {
        query: searchValue
      },
      success: (res) => {
        console.log(res)
        this.setData({ results: res.data });
      }
    });
  },

  filterResults: function() {
    const filteredResults = this.data.results.filter(item =>
      item.includes(this.data.searchValue)
    );
    this.setData({ results: filteredResults });
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