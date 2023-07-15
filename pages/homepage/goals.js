// pages/homepage/goals.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    activeIndex: 6
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

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    const page = this
    wx.request({
      url: `${app.globalData.baseUrl}/goals`,
      header: app.globalData.header,
      success(res){
        const goal= res.data.goals[res.data.goals.length - 1]

        // setting the dates based on the last
        const currentDate = new Date();
        const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dateRange = []
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(currentDate.getDate() - i);
          const dayOfWeek = daysOfWeek[date.getDay()];
          dateRange.push([[dayOfWeek],[date.getDate()]])
        }

        // applying default data to the dailygoals
        const defaultGoal = {
          calorie_goal: goal.calorie_goal,
          current_calorie: 0 
        }

        const dailyGoals = [goal]
        while(dailyGoals.length < 7){
          dailyGoals.unshift(defaultGoal)
        }
        console.log(dailyGoals)
        page.setData({
          dailyGoal: goal,
          dailyGoals: dailyGoals,
          dateRange : dateRange.reverse()
        })
        },
        complete(){
          const chartComponent = page.selectComponent('#myCanvas');
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
                  value: page.data.dailyGoal.current_calorie,
                  itemStyle: {
                    color: '#52BE8C'
                  },
                  label: {
                    show: false
                  }
                },{
                  value: page.data.dailyGoal.calorie_goal,
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
            if(page.data.dailyGoals[0].current_calorie * app.globalData.calorieGrace > page.data.dailyGoals[0].calorie_goal){
              option = overCalories
            } else if(page.data.dailyGoals[0].current_calorie > page.data.dailyGoals[0].calorie_goal) {
              option = overCaloriesGreen
            } else {
              option = underCalories
            }
      
            // Set the chart options and render the chart
            chart.setOption(option);
            return chart;
          });
      
          const chartBg = page.selectComponent('#myCanvasBg');
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
  selectDate(e){
    const page = this
    const index = e.currentTarget.dataset.index;
    console.log(index)
    this.setData({
      scrollIntoView: `date_${index}`,
      activeIndex: index,
      dailyGoal: this.data.dailyGoals[index]
    });
    console.log(page.data.dailyGoals[index])

    const chartComponent = page.selectComponent('#myCanvas');

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
          value: page.data.dailyGoals[index].current_calorie,
          itemStyle: {
            color: '#52BE8C'
          },
          label: {
            show: false
          }
        },{
          value: page.data.dailyGoals[index].calorie_goal,
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
    if(page.data.dailyGoal.current_calorie * app.globalData.calorieGrace > page.data.dailyGoal.calorie_goal){
      option = overCalories
    } else if(page.data.dailyGoal.current_calorie > page.data.dailyGoal.calorie_goal) {
      option = overCaloriesGreen
    } else {
      option = underCalories
    }

    chartComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      chart.setOption(option);
      return chart
    })
  }
})