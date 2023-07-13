Component ({
  data: {
    keyword: ''
  },

  methods:{ 
    // search(e) {
    //   this.setData({
    //     keyword: e.detail.value
    //   });
    //   this.triggerEvent('inputChange', { value: e.detail.value });
    //   console.log(this.data.keyword);
    //   this.jumpPage(); 
    // },
    jumpPage(e) {
      let keyword = e.detail.value
      wx.navigateTo({
        url: '/pages/search-result/search-result?keyword=' + this.data.keyword,
      });
    }



  }
})
