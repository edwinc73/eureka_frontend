import * as echarts from '../../ec-canvas/echarts';

const app = getApp()

let chart = null

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
    stars: [1, 2, 3, 4, 5],
    selectedStars: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {


    const page = this
    wx.request({
      url: `${app.globalData.baseUrl}/recipes/2`,
      header:app.globalData.header,
      success(res){
        const recipe = res.data
        console.log(recipe)
        const instructions = recipe.instructions.split(/\d\./);
        instructions.shift()
        page.setData({
          id: recipe.id,
          instructions: instructions,
          description: recipe.description,
          ingredients: recipe.ingredients,
          photo: recipe.photos,
          reviews: recipe.reviews,
          carbs: Math.floor(recipe.nutritious.carbs),
          fat: Math.floor(recipe.nutritious.fat),
          sodium: Math.floor(recipe.nutritious.sodium),
          fiber: Math.floor(recipe.nutritious.fiber),
          protein: Math.floor(recipe.nutritious.protein),
          name: recipe.name,
          calories: recipe.total_calories,
          caloriesPerPortion: Math.ceil(recipe.total_calories / recipe.portion),
          nutrients: [
            {protein: recipe.protein},
            {fat: recipe.fat},
            {carbs: recipe.carbs},
            {sodium: recipe.sodium},
            {fiber: recipe.fiber}
          ]

        })
      }
    })
    const chartComponent = this.selectComponent('#protein');
    chartComponent.init((canvas, width, height, dpr) => {
      chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
    
          let option = {
            xAxis: {
              type: 'category',
              data: ['Protein', 'Carbs', 'Fat'],
              axisLine: {
                show: false,
              },
              splitLine: false,
              axisTick: false,
              axisLabel: {
                color: 'rgba(25, 16, 17, 0.5)',
                fontSize: 12,
                fontWeight: '400',
              },
            },
            yAxis: {
              axisLabel:{
                show: false
              },
              axisLine:{
                show: false,
              },
              splitLine: false,
              axisTick: false,
            },
            grid: {
              top: '20%',
              left: '0%',
              right: '0%',
              bottom: '0%',
              containLabel: true,
            },
            series: [
              {
                type: 'bar',
                data: [this.data.protein, this.data.carbs, this.data.fat],
                showBackground: false,
                barWidth: '12',
                itemStyle: {
                  color: function(params) {
                    const colorList = ['#D83D4B', '#F8D477', '#575757'];
                    return colorList[params.dataIndex];
                  },
                  borderRadius: 50,
                },
                label: {
                  show: true,
                  position: 'top',
                  formatter: function(params) {
                    return params.value + "g";
                  },
                  textStyle: {
                    color: 'rgba(25, 16, 17, 0.5)', // Set the label text color,
                    fontSize: 12, // Set the label font size
                    fontWeight: '400', // Set the label font weight,
                    textBorderColor: 'transparent', // Set the text border color to transparent
                  },
                },
              }
            ]
          };
    
        // Set the chart options and render the chart
        chart.setOption(option);
        return chart;
      });
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
    if (chart) {
      chart.dispose(); // Dispose the chart to clean up resources
      chart = null; // Set chart to null when hiding the page
    }
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
  addToMeal(e){
    console.log(this.data)
    const portion = this.data.portion / 100;
    let id = this.data.id
    wx.request({
      url: `${app.globalData.baseUrl}/add_to_goal`,
      header: app.globalData.header,
      method: "POST",
      data: {
        id: id,
        portion: portion
      },
      success(res){
        console.log(res)
        wx.switchTab({
          url: '/pages/homepage/homepage',
        })
      }
    })
  },
  portionChange(e){
    this.setData({
      portion: e.detail.value
    })
  },
  submitReview(e){
    const page = this
    const selectedStars = this.data.selectedStars;
    const reviewText = this.data.reviewText;
    let id = this.data.id

    wx.request({
      url: `${app.globalData.baseUrl}/recipes/${id}/add_review`,
      method: "POST",
      data:{
        review:{
          rating: selectedStars,
          content: reviewText
        }
      },
      success(res){
        console.log(res)
        wx.redirectTo({
          url: '/pages/recipes/recipes?showDetail=true&showreview=true'
        })
        page.setData({
          showDetail: false,
          showReview: true,
          opacityDetail: "opacity: 0",
          opacityRecipe: "opacity: 1"
        })
      }
    })
  },
  handleStarClick(e) {
    const selectedStarIndex = e.currentTarget.dataset.index;
    const selectedStars = selectedStarIndex + 1;

    this.setData({
      selectedStars: selectedStars,
    });
    console.log(this.data.selectedStars)
  },
  handleTextareaInput(e){
    const reviewText = e.detail.value;
    this.setData({
      reviewText: reviewText,
    });
  }
})