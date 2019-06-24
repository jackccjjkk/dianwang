$(document).ready(function () {
  initMap();
  setLinstener();
  getData();

});

function initMap() {
  var map = new BMap.Map("map", { mapType: BMAP_HYBRID_MAP })
//  var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
//  var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
//  var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮

  var point = new BMap.Point(121.679122,38.935683);  // 创建点坐标
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
      initChart(data.chartData);
      initGoodsInfoList(data.goodsInfoList);
    } else {

    }
  };
  var error = function () {

  };
  ajaxPost("znyw.json", param, success, error, false);
}

function initChart(charData) {
  var option = {
    grid: {
      left: 10,
      right: 10,
      top: 0,
      left: 10,
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: '物资信息',
        type: 'pie',
        radius: '70%',
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
  var myChart = echarts.init(document.getElementById('chart'));
  myChart.setOption(option);
}

function initGoodsInfoList(goodsInfoList) {
  $("#goodsInfoList").html($("#goodsInfoList .template.goods-info-item"));
  $.each(goodsInfoList, function (index, item) {
    var $item = $("#goodsInfoList .template.goods-info-item").clone();
    $(".goods-info-item-stockName", $item).text(item.stockName);
    $(".goods-info-item-goodsName", $item).text(item.goodsName);
    $(".goods-info-item-goodsCount", $item).text(item.goodsCount + "件");
    $item.removeClass("template").appendTo("#goodsInfoList");
  })
}

function setLinstener() {
    $("#headerMenuBaodianjiankong").mouseover(function () {
        $(".header-sub-menu-baodianjiankong").show();
    });
    $("#headerMenuBaodianjiankong").mouseout(function () {
        $(".header-sub-menu-baodianjiankong").hide();
    });

    $(".header-sub-menu-baodianjiankong").mouseover(function () {
        $(".header-sub-menu-baodianjiankong").show();
    });
    $(".header-sub-menu-baodianjiankong").mouseout(function () {
        $(".header-sub-menu-baodianjiankong").hide();
    });
  $("#leftMenu1").mouseover(function () {
    $("#submenu-1").show();
  });
  $("#leftMenu1").mouseout(function () {
    $("#submenu-1").hide();
  });

  $("#submenu-1").mouseover(function () {
    $("#submenu-1").show();
  });
  $("#submenu-1").mouseout(function () {
    $("#submenu-1").hide();
  });

  $("#leftMenu2").mouseover(function () {
    $("#submenu-2").show();
  });
  $("#leftMenu2").mouseout(function () {
    $("#submenu-2").hide();
  });

  $("#submenu-2").mouseover(function () {
    $("#submenu-2").show();
  });
  $("#submenu-2").mouseout(function () {
    $("#submenu-2").hide();
  });

  $("#leftMenu3").mouseover(function () {
    $("#submenu-3").show();
  });
  $("#leftMenu3").mouseout(function () {
    $("#submenu-3").hide();
  });

  $("#submenu-3").mouseover(function () {
    $("#submenu-3").show();
  });
  $("#submenu-3").mouseout(function () {
    $("#submenu-3").hide();
  });

  $("#leftMenu4").mouseover(function () {
    $("#submenu-4").show();
  });
  $("#leftMenu4").mouseout(function () {
    $("#submenu-4").hide();
  });

  $("#submenu-4").mouseover(function () {
    $("#submenu-4").show();
  });
  $("#submenu-4").mouseout(function () {
    $("#submenu-4").hide();
  });
}
