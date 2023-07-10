// pages/homepage/homepage.js
import * as echarts from '../../ec-canvas/echarts.js';

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
      url: `${app.globalData.baseUrl}/recipes`,
      // header: app.globalData.header,
      success(res){
        const suggestions = res.data.recipes.slice(0, 3)
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
    console.log(data)

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
      console.log(app.globalData.calorieGrace)
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
            opacity: 0.2
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

  }
})