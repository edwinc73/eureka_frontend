import * as echarts from '../../ec-canvas/echarts';

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
    stars: [1, 2, 3, 4, 5],
    selectedStars: 0,
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
        console.log(recipe)
        const instructions = recipe.instructions.split(/\d\./);
        instructions.shift()
        page.setData({
          instructions: instructions,
          description: recipe.description,
          ingredients: recipe.ingredients,
          photo: recipe.photos[0],
          review: recipe.reviews,
          carbs: recipe.carbs,
          fat: recipe.fat,
          sodium: recipe.sodium,
          fiber: recipe.fiber,
          name: recipe.name,
          protein: recipe.protein,
          calories: recipe.total_calories,
          caloriesPerPortion: Math.ceil(recipe.total_calories / 300),
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
    const chart = this.selectComponent('#protein');
    chart.init((canvas, width, height, dpr) => {
          const chart = echarts.init(canvas, null, {
            width: width ,
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
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    // console.log(this.calories)
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
  },
  submitReview(e){
    const selectedStars = this.data.selectedStars;
    const reviewText = this.data.reviewText;

    console.log("Selected stars:", selectedStars);
    console.log("Review text:", reviewText);
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