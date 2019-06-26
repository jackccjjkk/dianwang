$(document).ready(function () {
    initMap();
    setLinstener();
    getData();

});

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
        } else {

        }
    };
    var error = function () {

    };
    ajaxPost("txth.json", param, success, error, false);
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

    $("#leftMenu1").click(function () {
    });

    $("#leftMenu2").click(function () {
    });

    $("#leftMenu3").click(function () {
    });

    $("#leftMenu4").click(function () {
    });
}
