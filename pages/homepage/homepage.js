// pages/homepage/homepage.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

let chart = null
let chartBg = null
let protein = null
let proteinBg = null
let carbs = null
let carbsBg = null
let fat = null
let fatBg = null

function clearChart(ec){
  ec.clear(); 
  ec = null; 
}

function clearAllChart() {
  clearChart(chart)
  clearChart(chartBg)
  clearChart(protein)
  clearChart(proteinBg)
  clearChart(carbsBg)
  clearChart(fat)
  clearChart(fatBg)
}

Page({
  /**
   * Page initial data
   */
  data: {
    chartData: {},
    showLoading: true,
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
    const data = app.globalData.chartData
    this.setData({ showLoading: false });
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    const page = this
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    // load suggested recipe
    wx.request({
      url: `${app.globalData.baseUrl}/suggestion`,
      header: app.globalData.header,
      success(res){
        const suggestions = res.data.slice(0, 3)
        page.setData({
          suggestions: suggestions
        })
      }
    })
    // load echart
    wx.request({
      url: `${app.globalData.baseUrl}/goals/90`,
      header: app.globalData.header,
      success(res){
        app.globalData.chartData = res.data
        const data = app.globalData.chartData
        page.setData({goal: data})

    const chartComponent = page.selectComponent('#myCanvas');
    chartComponent.init((canvas, width, height, dpr) => {

      chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      
      let overCalories = {
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          width: "100%",
          height: "100%",
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 180,
          itemStyle: {
            borderRadius: 200
          },
          data: [{
            value: 100,
            itemStyle: {
              color: '#FBC63E'
            },
            label: {
              show: false
            }
          },{
            value: 100,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      // Configure your ECharts chart options and data
      let underCalories = {
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 180,
          itemStyle: {
            borderRadius: 200
          },
          data: [{
            value: data.current_calorie / data.calorie_goal * 100,
            itemStyle: {
              color: '#52BE8C'
            },
            label: {
              show: false
            }
          },{
            value: 100 - (data.current_calorie / data.calorie_goal * 100) + 100,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      let option
      if(data.current_calorie < app.globalData.calorieGrace * data.calorie_goal){
        option = underCalories
      } else if(data.current_calorie > data.calorie_goal) {
        option = overCalories
      }

      // Set the chart options and render the chart
      chart.setOption(option);
      return chart;
    });

    const chartBgComponent = page.selectComponent('#myCanvasBg');
    chartBgComponent.init((canvas, width, height, dpr) => {
      chartBg = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
    
      // Configure your ECharts chart options and data
      let bgoption = {
        animation: false,
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: false,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 180,
          itemStyle: {
            borderRadius: 200,
            color: '#52BE8C',
            opacity: 0.15
          },
          data: [{
            value: 100,
            itemStyle: {
              color: '#A1D97E'
            },
            label: {
              show: false
            }
          },{
            value: 100,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      // Set the chart options and render the chart
      chartBg.setOption(bgoption);
      return chartBg;
    });

    const proteinComponent = page.selectComponent('#protein');
    proteinComponent.init((canvas, width, height, dpr) => {
      protein = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      
      let overProtein = {
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 310,
          itemStyle: {
            borderRadius: 200
          },
          data: [{
            value: 100,
            itemStyle: {
              color: '#D83D4B'
            },
            label: {
              show: false
            }
          },{
            value: 15,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      // Configure your ECharts chart options and data
      let underProtein = {
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 310,
          itemStyle: {
            borderRadius: 200
          },
          data: [{
            value: data.current_protein / data.protein_goal * 100,
            itemStyle: {
              color: '#D83D4B'
            },
            label: {
              show: false
            }
          },{
            value: 100 - (data.current_protein / data.protein_goal * 100) + 13.8,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      let overProteinGreen = {
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 310,
          itemStyle: {
            borderRadius: 200
          },
          data: [{
            value: 100,
            itemStyle: {
              color: '#D83D4B'
            },
            label: {
              show: false
            }
          },{
            value: 100,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      let option
      if(data.current_protein * app.globalData.calorieGrace > data.protein_goal){
        option = overProtein
      } else if(data.current_protein > data.protein_goal) {
        option = overProteinGreen
      } else {
        option = underProtein
      }

      // Set the chart options and render the chart
      protein.setOption(option);
      return protein;
    });

    const proteinBgComponent = page.selectComponent('#protein_bg');
    proteinBgComponent.init((canvas, width, height, dpr) => {
      proteinBg = echarts.init(canvas, null, {
        width: width ,
        height: height,
        devicePixelRatio: dpr
      });
    
      // Configure your ECharts chart options and data
      var bgoption = {
        animation: false,
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: false,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 310,
          
          itemStyle: {
            color: '#D83D4B',
            opacity: 0.15,
            borderRadius: 10,
          },
          data: [{
            value: 100,
            label: {
              show: false
            }
          },{
            value: 15,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      // Set the chart options and render the chart
      proteinBg.setOption(bgoption);
      return proteinBg;
    });
    
    const carbsComponent = page.selectComponent('#carbs');
    carbsComponent.init((canvas, width, height, dpr) => {
      carbs = echarts.init(canvas, null, {
        width: width ,
        height: height,
        devicePixelRatio: dpr
      });
      
      let over = {
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 310,
          itemStyle: {
            borderRadius: 200
          },
          data: [{
            value: 100,
            itemStyle: {
              color: '#F8D477'
            },
            label: {
              show: false
            }
          },{
            value: 15,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      // Configure your ECharts chart options and data
      let under = {
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 310,
          itemStyle: {
            borderRadius: 200
          },
          data: [{
            value: data.current_carbs / data.carbs_goal * 100,
            itemStyle: {
              color: '#F8D477'
            },
            label: {
              show: false
            }
          },{
            value: 100 - (data.current_carbs / data.carbs_goal * 100) + 13.8,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      let overGreen = {
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 310,
          itemStyle: {
            borderRadius: 200
          },
          data: [{
            value: 100,
            itemStyle: {
              color: '#F8D477'
            },
            label: {
              show: false
            }
          },{
            value: 100,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      let option
      if(data.current_carbs * app.globalData.calorieGrace > data.carbs_goal){
        option = over
      } else if(data.current_carbs > data.carbs_goal) {
        option = overGreen
      } else {
        option = under
      }

      // Set the chart options and render the chart
      carbs.setOption(option);
      return carbs;
    });

    const carbsBgComponent = page.selectComponent('#carbs_bg');
    carbsBgComponent.init((canvas, width, height, dpr) => {
      carbsBg = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
    
      // Configure your ECharts chart options and data
      var bgoption = {
        animation: false,
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: false,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 310,
          
          itemStyle: {
            color: '#F8D477',
            opacity: 0.35,
            borderRadius: 10,
          },
          data: [{
            value: 100,
            label: {
              show: false
            }
          },{
            value: 15,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      // Set the chart options and render the chart
      carbsBg.setOption(bgoption);
      return carbsBg;
    });

    const fatComponent = page.selectComponent('#fat');
    fatComponent.init((canvas, width, height, dpr) => {
      fat = echarts.init(canvas, null, {
        width: width ,
        height: height,
        devicePixelRatio: dpr
      });
      
      let over = {
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 310,
          itemStyle: {
            borderRadius: 200
          },
          data: [{
            value: 100,
            itemStyle: {
              color: '#575757'
            },
            label: {
              show: false
            }
          },{
            value: 15,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };
      // Configure your ECharts chart options and data
      let under = {
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 310,
          itemStyle: {
            borderRadius: 200
          },
          data: [{
            value: ( data.current_fat / data.fat_goal) * 100,
            itemStyle: {
              color: '#575757'
            },
            label: {
              show: false
            }
          },{
            value: 100 - (data.current_fat / data.fat_goal * 100) + 13.8,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      let overGreen = {
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 310,
          itemStyle: {
            borderRadius: 200
          },
          data: [{
            value: 100,
            itemStyle: {
              color: '#575757'
            },
            label: {
              show: false
            }
          },{
            value: 100,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      let option
      if(data.current_fat * app.globalData.calorieGrace > data.fat_goal){
        option = over
      } else if(data.current_fat > data.fat_goal) {
        option = overGreen
      } else {
        option = under
      }

      // Set the chart options and render the chart
      fat.setOption(option);
      return fat;
    });

    const fatBgComponent = page.selectComponent('#fat_bg');
    fatBgComponent.init((canvas, width, height, dpr) => {
      fatBg = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
    
      // Configure your ECharts chart options and data
      var bgoption = {
        animation: false,
        backgroundColor: "rgba(0,0,0,0)",
        series: [{
          label: {
            show: false,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '40%'],
          startAngle: 310,
          
          itemStyle: {
            color: '#575757',
            opacity: 0.2,
            borderRadius: 10,
          },
          data: [{
            value: 100,
            label: {
              show: false
            }
          },{
            value: 15,
            name: "fill",
            itemStyle: {
              color: 'none',
              borderRadius: 100
            },
            label: {
              show: false
            }
          }]
        }]
      };

      // Set the chart options and render the chart
      fatBg.setOption(bgoption);
      return fatBg;
    });
      }
    })
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
  goToMyGoals(){
    clearAllChart()
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    wx.navigateTo({
      url: '/pages/homepage/goals?showdaily=true&showweekly=false',
    })
  },
  goToSuggestions(){
    clearAllChart()
    wx.navigateTo({
      url: '/pages/homepage/suggestions',
    })
  },
  goToRecipe(e){
    clearAllChart()
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    const id = e.currentTarget.dataset.id
    const portion = e.currentTarget.dataset.portion

    wx.navigateTo({
      url: `/pages/recipes/recipes?id=${id}&showdetail=true&showreview=false&portion=${portion}`,
      success: () => {
        setTimeout(() => {
          wx.hideLoading();
        }, 1000); 
      },
    })
  }
})