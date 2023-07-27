const app = getApp();
Page({
  data: {
    results:[],
  },

  onLoad(options) {
    const page = this
    const query = options.query;
    wx.request({
      url:  `${app.globalData.baseUrl}/recipes`, 
      header: app.globalData.header,
      method: 'GET',
      data :{
        query: query
      },
      success: (res) => {
        page.setData({ results: res.data });
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

  },
  goToRecipe(e){
    const id = e.currentTarget.dataset.id
    const portion = e.currentTarget.dataset.portion
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    wx.navigateTo({
      url: `/pages/recipes/recipes?id=${id}&showdetail=true&showreview=false&portion=${portion}`,
    })
  },
  goToAddRecipe(){
    wx.navigateTo({
      url: `/pages/recipes/addRecipe`,
    })
  }
})
