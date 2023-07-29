import * as echarts from '../../ec-canvas/echarts';

const app = getApp()

let chart = null

function clearChart(ec){
  ec.clear(); 
  ec = null; 
}

Page({
  /**
   * Page initial data
   */
  data: {
    opacityRecipe: "opacity: 0",
    portion: 100,
    stars: [1, 2, 3, 4, 5],
    selectedStars: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    mealPortion: 0,
    showRecipePage: false,
    showRecipe: false

  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.setData({
      showDetail: options.showdetail == "true",
      showReview: options.showreview == "true",
      opacityDetail: options.showdetail == "false" && "opacity: 0",
      opacityReview: options.showreview == "false" && "opacity: 0",
      mealPortion: parseFloat(this.options.portion, 10),
      showRecipePage: parseFloat(this.options.portion, 10) == 0
      })
    if(this.data.mealPortion != 0){
      this.setData({
        portion: this.data.mealPortion * 100
      })
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    const page = this
    const showRecipePage = page.data.showRecipePage
    wx.request({
      url: `${app.globalData.baseUrl}/recipes/${page.options.id}`,
      header: app.globalData.header,
      success(res) {
        const recipe = res.data;
        const instructions = recipe.instructions.replace(/^\d+\.\s?/gm, '')
        .replace(/(^\w|\.\s\w)/gm, (match) => match.toUpperCase()) 
        .trim() 
        .split('\n')
        .filter((str) => str.trim() !== '')
        console.log(res)
        page.setData({
          unedittedInstructions: recipe.instructions,
          id: recipe.id,
          instructions: instructions,
          description: recipe.description,
          ingredients: recipe.ingredients,
          photo: recipe.photos,
          reviews: recipe.reviews,
          rating: showRecipePage ? Math.floor(recipe.rating) : Math.floor(recipe.rating),
          carbs: showRecipePage ? Math.floor(recipe.nutritious_per_100g.carbs) : Math.floor(recipe.nutritious_per_100g.carbs * page.data.portion / 100),
          fat: showRecipePage ? Math.floor(recipe.nutritious_per_100g.fat) : Math.floor(recipe.nutritious_per_100g.fat * page.data.portion / 100),
          sodium: showRecipePage ? Math.floor(recipe.nutritious_per_100g.sodium) : Math.floor(recipe.nutritious_per_100g.sodium * page.data.portion / 100),
          fiber: showRecipePage ? Math.floor(recipe.nutritious_per_100g.fiber) : Math.floor(recipe.nutritious_per_100g.fiber * page.data.portion / 100) ,
          protein: showRecipePage ? Math.floor(recipe.nutritious_per_100g.protein) : Math.floor(recipe.nutritious_per_100g.protein * page.data.portion / 100),
          name: recipe.name,
          calories: recipe.total_calories,
          caloriesPerPortion: recipe.calories_per_100g,
          isFavourite: recipe.user_favourite,
          isOwner:recipe.is_made_by_current_user
        });
        const { protein, carbs, fat } = page.data;
        const canvasId = 'protein';
  
        const canvas = page.selectComponent(`#${canvasId}`).init((canvas, width, height, dpr) => {
          chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr,
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
                data: [protein, carbs, fat],
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
                    color: 'rgba(25, 16, 17, 0.5)', 
                    fontSize: 12, 
                    fontWeight: '400', 
                    textBorderColor: 'transparent', 
                  },
                },
              }
            ]
          };
  
          chart.setOption(option);
          return chart;
        });
      },
    });
  },
  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    console.log("showRecipepage",this.data.showRecipePage)
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
    const showRecipePage = this.data.showRecipePage
    clearChart(chart)
    this.setData({
      showDetail: state == "detail",
      showRecipe: state == "recipe",
      showReview: state == "review",
      opacityDetail: state == "detail" ? "opacity: 1" : "opacity: 0",
      opacityRecipe: state == "recipe" ? "opacity: 1" : "opacity: 0",
      opacityReview: state == "review" ? "opacity: 1" : "opacity: 0"
    })
    if(state == "detail"){
      const page = this
      const canvas = page.selectComponent(`#protein`)
      canvas.init((canvas, width, height, dpr) => {
      chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr,
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
            data: [page.data.protein, page.data.carbs, page.data.fat],
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
                color: 'rgba(25, 16, 17, 0.5)', 
                fontSize: 12, 
                fontWeight: '400', 
                textBorderColor: 'transparent', 
              },
            },
          }
        ]
      };

      chart.setOption(option);
      return chart;
    });
    }
  },
  addToMeal(e){
    const portion = this.data.portion / 100;
    let id = this.data.id
    wx.request({
      url: `${app.globalData.baseUrl}/add_to_goal`,
      header: app.globalData.header,
      method: "POST",
      data: {
        id: id,
        meal:{
          portion: portion
        }
      },
      success(res){
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
    const selectedStars = this.data.selectedStars;
    const reviewText = this.data.reviewText;
    const id = this.data.id
    if(reviewText != ""){
      wx.request({
        url: `${app.globalData.baseUrl}/recipes/${id}/add_review`,
        method: "POST",
        header: app.globalData.header,
        data:{
          review:{
            rating: selectedStars,
            content: reviewText
          }
        },
        success(res){
          wx.redirectTo({
            url: `/pages/recipes/recipes?id=${id}&showdetail=false&showreview=true`
          })
        }
      })
    }
  },
  handleStarClick(e) {
    const selectedStarIndex = e.currentTarget.dataset.index;
    const selectedStars = selectedStarIndex + 1;

    this.setData({
      selectedStars: selectedStars,
    });
  },
  handleTextareaInput(e){
    const reviewText = e.detail.value;
    this.setData({
      reviewText: reviewText,
    });
  },
  editRecipe(){
    const id = this.data.id
    wx.navigateTo({

    })
  },
  clickFavourite(){
    const id = this.data.id
    const page = this
    
    if(page.data.isFavourite){
      wx.request({
        url: `${app.globalData.baseUrl}/favourite_delete`,
        header: app.globalData.header,
        method: "DELETE",
        data:{
          id:id,
        },
        success(res){
        }
      })
    } else {
      wx.request({
        url: `${app.globalData.baseUrl}/favourite_recipes`,
        header: app.globalData.header,
        method: "POST",
        data:{
          id:id,
        },
        success(res){
        }
      })
    }
    page.setData({
      isFavourite: !page.data.isFavourite,
    })
  },
  goToEdit(){
    const page = this
    clearChart(chart)
    const ingredients = this.data.ingredients
    ingredients.forEach(ingredient => {
      ingredient.portion = ingredient.portion * 100
    })
    wx.setStorage({
      key: "cart",
      data: ingredients
    })
    wx.setStorage({
      key: "recipe details",
      data: {
        instructions: page.data.unedittedInstructions,
        description: page.data.description,
        photo: page.data.photo,
        name: page.data.name,
        id: page.data.id
      }
    })
    wx.navigateTo({
      url: '/pages/recipes/addRecipe?newRecipe=false',
    })
  }
})

