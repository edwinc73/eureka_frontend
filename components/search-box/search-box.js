Component ({
  data: {
    query: ''
  },

  methods:{ 
    jumpPage(e) {
      let query = e.detail.value
      console.log(query)
      wx.navigateTo({
        url: `/pages/search-result/search-result?query=${query}`,
      });
    }



  }
})
