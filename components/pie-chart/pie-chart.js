import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

// counter
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
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
        value: 50,
        itemStyle: {
          color: '#52BE8C'
        },
        label: {
          show: false
        }
      },{
        value: 150,
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

  chart.setOption(option);
  return chart;
}

// background
function bgInitChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
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
        color: '#BFE3B2',
        opacity: 0.4,
        borderRadius: 200,
      },
      data: [{
        value: 100,
        label: {
          show: false
        }
      },{
        value: 100,
        name: "fill",
        itemStyle: {
          color: 'none',
          borderRadius: 200
        },
        label: {
          show: false
        }
      }]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    },

    bgEc: {
      onInit: bgInitChart
    },
    chartData:{}
  },

  onReady() {
  },
  onShow(){
    console.log(this)
    const data = [/* Your chart data */];
    this.setData({ chartData: data });
  }
});
