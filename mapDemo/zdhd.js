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
            initProcessList(data.processList);
        } else {

        }
    };
    var error = function () {

    };
    ajaxPost("zdhd.json", param, success, error, false);
}

function initProcessList(processList) {
    $("#processList").html($("#processList .template.process-item"));
    $.each(processList, function (index, item) {
        var $item = $("#processList .template.process-item").clone();
        $(".process-item-date", $item).text(item.date);
        $(".process-item-desc", $item).text(item.desc);
        if (index == 0) {
            $(".process-item-line-1", $item).css("background","transparent");
        }
        if (index == processList.length - 1) {
            $(".process-item-line-2", $item).css("background","transparent");
        }
        $item.removeClass("template").appendTo("#processList");
    })
}

function setLinstener() {
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
