Component ({
  data: {
    keyword: ''
  },

  methods:{
    search: function(e) {
      this.setData({
        keyword: e.detail.value
      });
      this.triggerEvent('inputChange', { value: e.detail.value });
      console.log(this.data.keyword);
      this.setData({
        keyword: ''
      });
    }

  }
})
