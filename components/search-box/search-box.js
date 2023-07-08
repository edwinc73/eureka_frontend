Component ({
  data: {
    keyword: ''
  },

  methods:{
    search: function(e) {
      this.setData({
        keyword: e.detail.value
      });
      console.log('User searched for: ' + this.data.keyword);
    }
  }
})