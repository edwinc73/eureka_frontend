// pages/recipes/recipes.js

const app = getApp()
Page({
  /**
   * Page initial data
   */
  data: {
    showDetail : true,
    opacityDetail: "opacity: 1",
    opacityRecipe: "opacity: 0",
    opacityReview: "opacity: 0",
    portion: 100,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const page = this
    const id = options.id
    wx.request({
      url: `${app.globalData.baseUrl}/recipes/${id}`,
      header:app.globalData.header,
      success(res){
        const recipe = res.data
        console.log(recipe.photos[0])
        page.setData({
          description: recipe.description,
          ingredients: recipe.ingredients,
          photo: recipe.photos[0],
          review: recipe.reviews,
          carbs: recipe.carb,
          fat: recipe.fat,
          fiber: recipe.fiber,
          name: recipe.name,
          protein: recipe.protein,
          calories: recipe.total_calories,
          caloriesPerPortion: recipe.total_calories / 100
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    console.log(this.calories)
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
  switchTab(e){
    const state = e.currentTarget.dataset.value
    this.setData({
      showDetail: state == "detail",
      showRecipe: state == "recipe",
      showReview: state == "review",
      opacityDetail: state == "detail" ? "opacity: 1" : "opacity: 0",
      opacityRecipe: state == "recipe" ? "opacity: 1" : "opacity: 0",
      opacityReview: state == "review" ? "opacity: 1" : "opacity: 0"
    })
  },
  addToMeal(){
    console.log("im adding my food")
  },
  portionChange(e){
    this.setData({
      portion: e.detail.value
    })
  }
})