Component({
  data: {
    showAppName: false,
    showBackButton: false
  },
  ready() {
    let app = getApp()
    if(getCurrentPages()[getCurrentPages().length - 1].route !== "pages/cars/homepage"){
      if (getCurrentPages().length > 1) {
        this.setData({
          showBackButton: true,
        })
      } else {
        this.setData({
          showAppName: true,
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