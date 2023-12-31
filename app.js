// app.js
App({
  onLaunch() {
    const app = this

    wx.login({
      success: res => {
        wx.request({
          url: `${app.globalData.baseUrl}/login`, 
          method: 'post',
          data: { code: res.code }, 
          success(loginRes) {
            console.log(loginRes)
            app.globalData.user = loginRes.data.user
            app.globalData.header = loginRes.data.headers
            if(loginRes.data.new_user){
              app.globalData.newUser = true
              setTimeout(() =>{
                wx.redirectTo({ url: '/pages/newUser/newUser' });
              }, 1000)
            }else{
              app.globalData.newUser = false
              wx.request({
                url: `${app.globalData.baseUrl}/goals/69`,
                header: loginRes.data.headers,
                success(res){
                  app.globalData.chartData = res.data
                  setTimeout(() =>{
                    wx.switchTab({ url: '/pages/homepage/homepage' });
                  }, 1000)
                }
              })
            }
          },
        })
      }
    })
    
    // load font
    wx.loadFontFace({
      family:"quicksand",
      global:true,
      source: 'url("https://eurekaaa.oss-cn-shanghai.aliyuncs.com/Quicksand.ttf")',
      desc: {
        style: "normal",
        weight: "normal",
        variant: "normal"
      },
      fail(msg){
        console.log(msg)
      },
      complete: (msg) => {
        console.log(msg)
      }
    })
  },
  globalData: {
    navBarHeight: wx.getMenuButtonBoundingClientRect().height+ 9 + wx.getSystemInfoSync().statusBarHeight,
    userInfo: null,
    // baseUrl: 'http://127.0.0.1:3000/api/v1', 
    baseUrl: "https://eureka.wogengapp.cn/api/v1",
    tabPages: ["pages/profile/profile","pages/favourite/favourite","pages/homepage/homepage"],
    calorieGrace: 1.1,
    popUp:false,
    firstLoad: true,
  }
})
