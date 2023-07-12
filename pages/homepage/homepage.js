// pages/homepage/homepage.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

Page({
  /**
   * Page initial data
   */
  data: {
    chartData: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const page = this
    // load suggested recipe
    wx.request({
      url: `${app.globalData.baseUrl}/suggestion`,
      // header: app.globalData.header,
      success(res){
      console.log(res)
        const suggestions = res.data.slice(0, 3)
        // console.log(suggestions)
        page.setData({
          suggestions: suggestions
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    const data = app.globalData.chartData
    this.setData({goal: data})

    const chartComponent = this.selectComponent('#myCanvas');
    chartComponent.init((canvas, width, height, dpr) => {

      const chart = echarts.init(canvas, null, {
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
            value: data.current_calorie,
            itemStyle: {
              color: '#52BE8C'
            },
            label: {
              show: false
            }
          },{
            value: data.calorie_goal,
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

      let overCaloriesGreen = {
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
            value: 100,
            itemStyle: {
              color: '#52BE8C'
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
      // console.log(app.globalData.calorieGrace)
      if(data.current_calorie * app.globalData.calorieGrace > data.calorie_goal){
        option = overCalories
      } else if(data.current_calorie > data.calorie_goal) {
        option = overCaloriesGreen
      } else {
        option = underCalories
      }

      // Set the chart options and render the chart
      chart.setOption(option);
      return chart;
    });

    const chartBg = this.selectComponent('#myCanvasBg');
    chartBg.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
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
      chart.setOption(bgoption);
      return chart;
    });

    const protein = this.selectComponent('#protein');
    protein.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
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
            value: data.current_protein,
            itemStyle: {
              color: '#D83D4B'
            },
            label: {
              show: false
            }
          },{
            value: data.protein_goal,
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
      chart.setOption(option);
      return chart;
    });

    const proteinBg = this.selectComponent('#protein_bg');
    proteinBg.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
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
      chart.setOption(bgoption);
      return chart;
    });
    
    const carbs = this.selectComponent('#carbs');
    carbs.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
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
            value: data.current_protein,
            itemStyle: {
              color: '#F8D477'
            },
            label: {
              show: false
            }
          },{
            value: data.protein_goal,
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
      chart.setOption(option);
      return chart;
    });

    const carbs_bg = this.selectComponent('#carbs_bg');
    carbs_bg.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
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
      chart.setOption(bgoption);
      return chart;
    });

    const fat = this.selectComponent('#fat');
    fat.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
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
            value: data.current_protein,
            itemStyle: {
              color: '#575757'
            },
            label: {
              show: false
            }
          },{
            value: data.protein_goal,
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
      chart.setOption(option);
      return chart;
    });

    const fatBg = this.selectComponent('#fat_bg');
    fatBg.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
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
      chart.setOption(bgoption);
      return chart;
    });



  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
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
    wx.navigateTo({
      url: '/pages/homepage/goals',
    })
  },
  goToSuggestions(){
    wx.navigateTo({
      url: '/pages/homepage/suggestions',
    })
  },
  goToRecipe(e){
    // console.log("going")
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/recipes/recipes?id=${id}`,
    })
  }
})