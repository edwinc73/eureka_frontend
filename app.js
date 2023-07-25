// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    const app = this

    wx.login({
      success: res => {
        wx.request({
          url: `${app.globalData.baseUrl}/login`, 
          method: 'post',
          data: { code: res.code }, 
          success(loginRes) {
            app.globalData.user = loginRes.data.user
            app.globalData.header = loginRes.data.headers
            console.log(loginRes.data.new_user)
            if(loginRes.data.new_user){
              app.globalData.newUser = true
            }else{
              app.globalData.newUser = false
              wx.request({
                url: `${app.globalData.baseUrl}/goals/69`,
                header: loginRes.data.headers,
                success(res){
                  app.globalData.chartData = res.data
                  wx.switchTab({ url: '/pages/homepage/homepage' });
                }
              })
            }
          },
        })
      }
    })


    const system = wx.getSystemInfoSync()
    console.log(system.statusBarHeight)

    // load font
    wx.loadFontFace({
      family:"quicksand",
      global:true,
      source: 'url("/pages/index/Quicksand.ttf")',
      desc: {
        style: "normal",
        weight: "normal",
        variant: "normal"
      },
      complete: (msg) => {
        // console.log(msg)
      }
    })
  },
  globalData: {
    navBarHeight: wx.getMenuButtonBoundingClientRect().height+ 9 + wx.getSystemInfoSync().statusBarHeight,
    userInfo: null,
    baseUrl: 'http://127.0.0.1:3000/api/v1',
    tabPages: ["pages/profile/profile","pages/favourite/favourite","pages/homepage/homepage"],
    calorieGrace: 1.1
  }
})
