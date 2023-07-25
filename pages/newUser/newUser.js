// pages/newUser/newUser.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    maleActive: "",
    femaleActive: "",
    firstPage: true,
    text: "What's your name?",
    text2: "Great, please tell me more.",
    typedText: '', 
    typingSpeed: 55, 
    currentCharIndex: 0,
    screenWidth:0,
    height: 0,
    weight: 0,
    target: 0,
    showLoading: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    let today = year + '-' + month + '-' + day;
    this.setData({
      birthday: today,
      today: today
    });
    this.typeNextChar();
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
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl,
    })
  },
  bindDateChange(e){
    const input = e.detail.value
    this.setData({
      birthday: input
    })
  },
  setGender(e){
    const input = e.currentTarget.dataset.value
    if(input == "m"){
      this.setData({
        gender: input,
        maleActive: "active",
        femaleActive: ""
      })
    } else {
      this.setData({
        gender: input,
        maleActive: "",
        femaleActive: "active"
      })
    }
  },
  goToNext(){
    const {birthday, avatarUrl, nickname, gender,today} = this.data
    if(birthday == today || avatarUrl == defaultAvatarUrl || nickname == "" || gender == ""){
      wx.showToast({
        icon: "error",
        title: 'Missing input',
      })
    } else {
      this.setData({
        firstPage: false,
        dialogue: "Tell me more.",
        typedText: "",
        currentCharIndex: 0,
        screenWidth: 390
      })
      this.typeNextCharStep2()
    }
  },
  typeNextChar () {
    if (this.data.currentCharIndex < this.data.text.length) {
      const nextChar = this.data.text[this.data.currentCharIndex];
      this.setData({
        typedText: this.data.typedText + nextChar,
        currentCharIndex: this.data.currentCharIndex + 1,
      });
      setTimeout(() => {
        this.typeNextChar();
      }, this.data.typingSpeed);
    }
  },
  typeNextCharStep2 () {
    if (this.data.currentCharIndex < this.data.text2.length) {
      const nextChar = this.data.text2[this.data.currentCharIndex];
      this.setData({
        typedText: this.data.typedText + nextChar,
        currentCharIndex: this.data.currentCharIndex + 1,
      });
      setTimeout(() => {
        this.typeNextCharStep2();
      }, this.data.typingSpeed);
    }
  },
  goToHomepage(){
    const {height, weight, target} = this.data
    if(height == 0 || weight == 0 || target == 0){
      wx.showToast({
        icon: "error",
        title: 'Missing input',
      })
    } else {
      this.setUserData()
      this.setData({showLoading: true})
      setTimeout(() => {
        this.setData({ showLoading: false });
        wx.switchTab({ url: '/pages/homepage/homepage' })
      }, 2000);
    }
  },
  setUserData(){
    const {birthday, avatarUrl, nickname, gender, height, weight, target} = this.data
    const page = this
    function calculateAge(date) {
      const [birthYear, birthMonth, birthDay] = date.split('-').map(Number);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthYear;

      if (currentDate.getMonth() < birthMonth - 1 || (currentDate.getMonth() === birthMonth - 1 && currentDate.getDate() < birthDay)) {
        age--;
      }
      return age;
    }
    
    const user = {
      age: calculateAge(birthday),
      username: nickname,
      gender: gender,
      height: parseInt(height, 10),
      weight: parseInt(weight, 10),
      goal_weight: parseInt(target, 10)
    }
    wx.request({
      url: `${app.globalData.baseUrl}/fill_up_profile`,
      method: "PUT",
      header: app.globalData.header,
      data:{ user },
      success(res){
        wx.uploadFile({
          url: `${app.globalData.baseUrl}/upload_avatar`,
          filePath: page.data.avatarUrl,
          name: 'avatar',
          header: app.globalData.header,
          complete(res){
            console.log(res)
          }
        })
      }
    })
  },
  setNickname (e) {
    const input = e.detail.value;
    this.setData({ nickname: input });
  },
  setHeight (e){
    const input = e.detail.value
    this.setData({height: input})
  },
  setWeight (e){
    const input = e.detail.value
    this.setData({weight: input})
  },
  setTarget (e){
    const input = e.detail.value
    this.setData({target: input})
  }
})