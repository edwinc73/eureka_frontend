Component ({
  properties: {
    placeholder: {
      type: String,
      value: 'Add Your Meal'
    }
  },

  methods:{ 
    jumpPage(e) {
      let query = e.detail.value
      wx.navigateTo({
        url: `/pages/search-result/search-result?query=${query}`,
      });
    },
    test(e){
      console.log(e)
    }
  }
})
