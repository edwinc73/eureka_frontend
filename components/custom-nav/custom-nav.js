Component({
  data: {
    showAppName: false,
    showBackButton: false
  },
  ready() {
    let app = getApp()
    const currentRoute = getCurrentPages()[getCurrentPages().length - 1].route
    console.log(currentRoute)
    if(currentRoute !== "pages/homepage/homepage"){
      if (app.globalData.tabPages.includes(currentRoute)) {
        this.setData({
          showAppName: true,
         })
      } else {
        this.setData({
          showBackButton: true,
        })
        console.log(this.data.showBackButton)
      }
    }
  },
  methods:{
    goBack: function(){
      wx.navigateBack(1)
    }
  } 
})