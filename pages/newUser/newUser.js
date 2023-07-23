// pages/newUser/newUser.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

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
    console.log(avatarUrl)
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
    this.setData({
      firstPage: false,
      dialogue: "Tell me more.",
      typedText: "",
      currentCharIndex: 0,
    })
    this.typeNextCharStep2()
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
})