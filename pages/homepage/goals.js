// pages/homepage/goals.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp()
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
    activeIndex: 6,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.scrollRight()
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
      url: `${app.globalData.baseUrl}/weekly_goals`,
      header: app.globalData.header,
      success(res){
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

        const dailyGoals = res.data
        const goal = res.data[6]
        console.log(goal)
        page.setData({
          dailyGoal: goal,
          dailyGoals: dailyGoals,
          dateRange : dateRange.reverse(),
          meals : res.data[6].meals
        })
        },
      complete(res){
        const chartComponent = page.selectComponent('#myCanvas');
        chartComponent.init((canvas, width, height, dpr) => {
          chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr
          });
          
          let overCalories = {
            backgroundColor: "rgba(0,0,0,0)",
            grid: {
                top: '20%',
                left: '0%',
                right: '0%',
                bottom: '0%',
                containLabel: true
              },
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
    
          let underCalories = {
            backgroundColor: "rgba(0,0,0,0)",
            series: [{
              label: {
                show: true,
                formatter(param) {
                  const currentCalories = page.data.dailyGoal.current_calorie;
                  const caloriesGoal = page.data.dailyGoal.calorie_goal;
                  const percentage = (currentCalories / caloriesGoal) * 100;
                  const visiblePercentage = Math.min(percentage, 50);
                  return `${param.name} (${visiblePercentage.toFixed(0)}%)`;
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
                value: (page.data.dailyGoal.current_calorie / page.data.dailyGoal.calorie_goal) * 100,
                itemStyle: {
                  color: '#52BE8C'
                },
                label: {
                  show: false
                }
              },{
                value: (100 - (page.data.dailyGoal.current_calorie / page.data.dailyGoal.calorie_goal) * 100 + 100),
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
          if(page.data.dailyGoal.current_calorie / app.globalData.calorieGrace > page.data.dailyGoal.calorie_goal){
            option = overCalories
          } else if(page.data.dailyGoal.current_calorie > page.data.dailyGoal.calorie_goal) {
            option = overCaloriesGreen
          } else {
            option = underCalories
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
        
          let underProtein = {
            backgroundColor: "rgba(0,0,0,0)",
            series: [{
              label: {
                show: true
              },
              type: 'pie',
              center: ['50%', '50%'],
              radius: ['50%', '40%'],
              startAngle: 310,
              itemStyle: {
                borderRadius: 200
              },
              data: [
                {
                  value: (page.data.dailyGoal.current_protein / page.data.dailyGoal.protein_goal) * 100,
                  itemStyle: {
                    color: '#D83D4B'
                  },
                  label: {
                    show: false
                  }
                },
                {
                  value: 100 - (page.data.dailyGoal.current_protein / page.data.dailyGoal.protein_goal * 100) + 13.8,
                  name: 'fill',
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
          if(page.data.dailyGoal.current_protein > page.data.dailyGoal.protein_goal){
            option = overProtein
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

        const carbs = page.selectComponent('#carbs');
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
          value: page.data.dailyGoal.current_carbs / page.data.dailyGoal.carbs_goal * 100,
          itemStyle: {
            color: '#F8D477'
          },
          label: {
            show: false
          }
        },{
          value: 100 - (page.data.dailyGoal.current_carbs / page.data.dailyGoal.carbs_goal * 100) + 13.8,
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
    if(page.data.dailyGoal.current_carbs > page.data.dailyGoal.carbs_goal){
      option = over
    } else {
      option = under
    }

    // Set the chart options and render the chart
    chart.setOption(option);
    return chart;
        });
        
        const carbsBgComponent = page.selectComponent('#carbs_bg');
        carbsBgComponent.init((canvas, width, height, dpr) => {
          carbsBg = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr
          });
        
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
                value: page.data.dailyGoal.current_fat / page.data.dailyGoal.fat_goal * 100,
                itemStyle: {
                  color: '#575757'
                },
                label: {
                  show: false
                }
              },{
                value: 100 - (page.data.dailyGoal.current_fat / page.data.dailyGoal.fat_goal * 100) + 13.8,
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
          if(page.data.dailyGoal.current_fat > page.data.dailyGoal.current_fat){
            option = over
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
  scrollRight() {
    this.setData({
      rightID: 'date6'
    })
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

    clearAllChart()

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

    let underCalories = {
      backgroundColor: "rgba(0,0,0,0)",
      series: [{
        label: {
          show: true
        },
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['50%', '40%'],
        startAngle: 180,
        itemStyle: {
          borderRadius: 200
        },
        data: [{
          value: page.data.dailyGoals[index].current_calorie / page.data.dailyGoals[index].calorie_goal * 100,
          itemStyle: {
            color: '#52BE8C'
          },
          label: {
            show: false
          }
        },{
          value: 100 - (page.data.dailyGoals[index].calorie_goal / page.data.dailyGoals[index].current_calorie /100) + 13.8,
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
  
    if(page.data.dailyGoal.current_calorie / app.globalData.calorieGrace > page.data.dailyGoal.calorie_goal){
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

    const chartBgComponent = page.selectComponent('#myCanvasBg');
    
    let chartOption = {
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
      chartBgComponent.init((canvas, width, height, dpr) => {
        chartBg = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
        });
        chartBg.setOption(chartOption);
        return chartBg;
    });
    
    const proteinComponent = page.selectComponent('#protein');

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
          value: page.data.dailyGoal.current_protein / page.data.dailyGoal.protein_goal * 100,
          itemStyle: {
            color: '#D83D4B'
          },
          label: {
            show: false
          }
        },{
          value: 100 - (page.data.dailyGoal.current_protein / page.data.dailyGoal.protein_goal * 100) + 13.8,
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

    let proteinOption
  
    if(page.data.dailyGoal.current_protein > page.data.dailyGoal.protein_goal){
      proteinOption = overProtein
    } else {
      proteinOption = underProtein
    }

    proteinComponent.init((canvas, width, height, dpr) => {
      protein = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      protein.setOption(proteinOption);
      return protein
    })

    const proteinBgComponent = page.selectComponent('#protein_bg');
        
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

    proteinBgComponent.init((canvas, width, height, dpr) => {
      proteinBg = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      proteinBg.setOption(bgoption);
      return proteinBg
    })

    const carbComponent = page.selectComponent('#carbs');

    let overcarb = {
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
  
    let undercarb = {
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
          value: page.data.dailyGoal.current_carbs / page.data.dailyGoal.carbs_goal * 100,
          itemStyle: {
            color: '#F8D477'
          },
          label: {
            show: false
          }
        },{
          value: 100 - (page.data.dailyGoal.current_carbs / page.data.dailyGoal.carbs_goal * 100) + 13.8,
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

    let carbOption
  
    if(page.data.dailyGoal.current_carbs > page.data.dailyGoal.carbs_goal){
      carbOption = overcarb
    } else {
      carbOption = undercarb
    }

    carbComponent.init((canvas, width, height, dpr) => {
      carbs = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      carbs.setOption(carbOption);
      return carbs
    })

    const carbsBgComponent = page.selectComponent('#carbs_bg');

    var carbBgOption = {
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

    carbsBgComponent.init((canvas, width, height, dpr) => {
      carbsBg = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      })
      carbsBg.setOption(carbBgOption);
      return carbsBg;
    });

    const fatComponent = page.selectComponent('#fat');

    let overfat = {
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
  
    let underfat = {
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
          value: page.data.dailyGoal.current_fat / page.data.dailyGoal.fat_goal * 100,
          itemStyle: {
            color: '#575757'
          },
          label: {
            show: false
          }
        },{
          value: 100 - (page.data.dailyGoal.current_fat / page.data.dailyGoal.fat_goal * 100) + 13.8,
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

    let fatOption
  
    if(page.data.dailyGoal.current_fat > page.data.dailyGoal.fat_goal){
      fatOption = overfat
    } else {
      fatOption = underfat
    }

    fatComponent.init((canvas, width, height, dpr) => {
      fat = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      fat.setOption(fatOption);
      return fat
    })
    const fatBgComponent = page.selectComponent('#fat_bg');

    var fatBgOption = {
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

    fatBgComponent.init((canvas, width, height, dpr) => {
      fatBg = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      fatBg.setOption(fatBgOption);
      return fatBg;
    });
  },
  goToRecipe(e){
    clearAllChart()
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/recipes/recipes?id=${id}&showdetail=true&showreview=false`,
    })
  }
})