Component({
  data: {
    showAppName: false,
    showBackButton: false
  },
  ready() {
    let app = getApp()
    const currentRoute = getCurrentPages()[getCurrentPages().length - 1].route
    if(currentRoute !== "pages/homepage/homepage"){
      if (app.globalData.tabPages.includes(currentRoute)) {
        this.setData({
          showAppName: true,
         })
      } else {
        this.setData({
          showBackButton: true,
        })
      }
    }
  },
  methods:{
    goBack: function(){
      wx.navigateBack(1)
    }
  } 
})