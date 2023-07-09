Component({
  data: {
    selected: 0,
    selectedColor: "rgba(255, 255, 255, 0.35)",
    list: [{
      pagePath: "/pages/homepage/homepage",
      iconPath: "/images/tab-bar-icons/home-inactive.png",
      selectedIconPath: "/images/tab-bar-icons/home-active.png"
    }, {
      pagePath: "/pages/favourite/favourite",
      iconPath: "/images/tab-bar-icons/fav-inactive.png",
      selectedIconPath: "/images/tab-bar-icons/fav-active.png"
    },{
      pagePath: "/pages/profile/profile",
      iconPath: "/images/tab-bar-icons/user-inactive.png",
      selectedIconPath: "/images/tab-bar-icons/user-active.png"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})