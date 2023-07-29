const app = getApp()
Component({
  lifetimes: {
    ready() {  
      const currentPage = getCurrentPages().pop();
      const page = this
      if(currentPage.route == "pages/homepage/homepage"){
        page.setData({
          width: "active"
        })
        setTimeout(() => {
        page.setData({
          showIcon: true
        })
      }, 1000);
      } else {
        page.setData({
          transition: "no-transition",
          width: "active",
          showIcon: true
       })
      }
    },
  },
  data: {
    transition: "transition",
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
    }],
    animationData: {},
    firstLoad: true,
    width: "inactive",
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      console.log(data.index)
      this.setData({
        selected: data.index,
      })
    }
  }
})