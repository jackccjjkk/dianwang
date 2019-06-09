$(document).ready(function () {

  initMap();
  setLinstener();
  getData();

});

function setLinstener() {

}


function initMap() {
  var map = new BMap.Map("map", {mapType: BMAP_HYBRID_MAP})
//  var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
//  var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
//  var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮

  var point = new BMap.Point(121.679122, 38.935683);  // 创建点坐标
  map.centerAndZoom(point, 11);                 // 初始化地图，设置中心点坐标和地图级别
  // map.addControl(top_left_navigation);
  //添加地图类型控件
//  map.addControl(new BMap.MapTypeControl({
//      mapTypes:[
//          BMAP_HYBRID_MAP,
//          BMAP_NORMAL_MAP
//
//      ]}));
  map.setCurrentCity("大连");          // 设置地图显示的城市 此项是必须设置的
  map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
}

function getData() {
  var param = {};
  var success = function (data) {
    if (data.resultCode = '00') {
      // 故障信息列表
      initFaultInfoList(data.faultInfoList);
      // 故障信息饼状图
      initChartPie(data.chartPieData);

      // 重要事件列表
      initEventInfoList(data.eventInfoList);

      // 实时负荷监控
      initChartLine(data.chartLineData);
    } else {

    }
  };
  var error = function () {

  };
  ajaxPost("qwts.json", param, success, error, false);
}

function initChartPie(charData) {
  var option = {
    grid: {
      left: 10,
      right: 10,
      top: 0,
      bottom: 10,
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: '物资信息',
        type: 'pie',
        radius: '40%',
        center: ['50%', '50%'],
        data: charData,
        roseType: 'radius',
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          normal: {
            formatter: '{b}：{d}% ',
            color: '#33ffff'

          }
        },
      }
    ]
  };
  var myChart = echarts.init(document.getElementById('chartPie'));
  myChart.setOption(option);
}

function initChartLine(lineData) {
  var xData = [];
  var yData = [];
  $.each(lineData, function (index, item) {
    xData.push(item.xData);
    yData.push(item.yData);
  })
  var option = option = {
    grid: {
      left: 40,
      right: 20,
      top: 20,
      bottom: 20,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData,
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          // 使用深浅的间隔色
          color: '#10506b',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#ffffff',
        fontSize:"12px"
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#ffffff',
        fontSize:"12px"
      }
    },
    series: [{
      data: yData,
      type: 'line',
      lineStyle: {
        color: "#11cff4"
      },
      symbol: 'none',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#478cbd' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(0, 0, 0, 0)' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      }
    }]
  };
  var myChart = echarts.init(document.getElementById('chartLine'));
  myChart.setOption(option);
}

function initFaultInfoList(faultInfoList) {
  $("#faultInfoList").html($("#faultInfoList .template.fault-info-item"));
  $.each(faultInfoList, function (index, item) {
    var $item = $("#faultInfoList .template.fault-info-item").clone();
    $(".fault-info-item-title", $item).text(item.title);
    $(".fault-info-item-name", $item).text(item.name);
    $(".fault-info-item-count", $item).text(item.count);
    $item.removeClass("template").appendTo("#faultInfoList");
  })
}

function initEventInfoList(eventInfoList) {
  $("#eventInfoList").html($("#eventInfoList .template.event-info-item"));
  $.each(eventInfoList, function (index, item) {
    var $item = $("#eventInfoList .template.event-info-item").clone();
    $(".event-info-item-date", $item).text(item.date);
    $(".event-info-item-content", $item).text(item.content);
    $(".event-info-item-status", $item).text(item.status);
    $item.removeClass("template").appendTo("#eventInfoList");
  })
}
