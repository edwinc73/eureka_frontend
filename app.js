// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // const app = this
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     wx.request({
    //       url: `${app.globalData.baseUrl}/login`, 
    //       method: 'post',
    //       data: { code: res.code }, 
    //       success(loginRes) {
    //         app.globalData.user = loginRes.data.user
    //         app.globalData.header = loginRes.data.headers
    //       },
    //     })
    //   }
    // })

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
        console.log(msg)
      }
    })
  },
  globalData: {
    userInfo: null,
    baseUrl: 'http://127.0.0.1:3000/api/v1',
    tabPages: ["pages/profile/profile","pages/favourite/favourite","pages/homepage/homepage"]
  }
})
