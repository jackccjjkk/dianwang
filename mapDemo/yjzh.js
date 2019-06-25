var changsuoList;
var xianluList;
var duiwuList;
var cheliangList;
var wuziList;
var fujinList;
var map;
$(document).ready(function () {

    initMap();
    setLinstener();
    getData();

});

var menu_baodianchangsuo_selected = false;
var menu_xianlu_selected = false;
var menu_duiwu_selected = false;
var menu_cheliang_selected = false;
var menu_wuzi_selected = false;

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

    $("#zhihuizhongxin").click(function () {
        if(selectedMarker){
            showFujinList1();
        }
    });

    $("#yijiandiaodu").click(function () {
        if(selectedMarker){
            showFujinList2();
        }
    });

    $("#menu_baodianchangsuo").click(function () {
        if (menu_baodianchangsuo_selected) {
            menu_baodianchangsuo_selected = false;
            $("#menu_changsuo_img").attr("src", "img/cs.png")
        } else {
            // 隐藏底部浮层
            menu_baodianchangsuo_selected = true;
            $("#menu_changsuo_img").attr("src", "img/cs_selected.png");
        }
        refreshMarker();
    });
    $("#menu_xianlu").click(function () {
        if (menu_xianlu_selected) {
            menu_xianlu_selected = false;
            $("#menu_xianlu_img").attr("src", "img/xl.png")
        } else {
            menu_xianlu_selected = true;
            $("#menu_xianlu_img").attr("src", "img/xl_selected.png");
        }
        refreshMarker();
    });

    $("#menu_duiwu").click(function () {
        if (menu_duiwu_selected) {
            menu_duiwu_selected = false;
            $("#menu_duiwu_img").attr("src", "img/dw.png")
        } else {
            menu_duiwu_selected = true;
            $("#menu_duiwu_img").attr("src", "img/dw_selected.png");
        }
        refreshMarker();
    });

    $("#menu_cheliang").click(function () {
        if (menu_cheliang_selected) {
            menu_cheliang_selected = false;
            $("#menu_cheliang_img").attr("src", "img/cl.png")
        } else {
            menu_cheliang_selected = true;
            $("#menu_cheliang_img").attr("src", "img/cl_selected.png");
        }
        refreshMarker();
    });
    $("#menu_wuzi").click(function () {
        if (menu_wuzi_selected) {
            menu_wuzi_selected = false;
            $("#menu_wuzi_img").attr("src", "img/wz.png")
        } else {
            // 隐藏底部浮层
            menu_wuzi_selected = true;
            $("#menu_wuzi_img").attr("src", "img/wz_selected.png");
        }
        refreshMarker();
    });
}


function initMap() {
    map = new BMap.Map("map", {mapType: BMAP_HYBRID_MAP})
//  var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
//  var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
//  var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮

    var point = new BMap.Point(121.679122, 38.935683);  // 创建点坐标
    map.centerAndZoom(point, 13);                 // 初始化地图，设置中心点坐标和地图级别
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
            // 重要事件列表
            initEventInfoList(data.eventInfoList);
            changsuoList = data.changsuoList;
            xianluList = data.xianluList;
            duiwuList = data.duiwuList;
            cheliangList = data.cheliangList;
            wuziList = data.wuziList;
            fujinList = data.fujinList;
        } else {

        }
    };
    var error = function () {

    };
    ajaxPost("yjzh.json", param, success, error, false);
}

var selectedMarker = null;
var selectedCircle = null;

function initEventInfoList(eventInfoList) {
    $("#eventInfoList").html($("#eventInfoList .template.event-info-item"));
    $.each(eventInfoList, function (index, item) {
        var $item = $("#eventInfoList .template.event-info-item").clone();
        $(".event-info-item-date", $item).text(item.date);
        $(".event-info-item-content", $item).text(item.content);
        $(".event-info-item-status", $item).text(item.status);
        $item.click(function () {
            $("#video_source1").attr("src", item.video1);
            $("#video1").load();
            $("#video_source2").attr("src", item.video2);
            $("#video2").load();
            if (selectedMarker) {
                map.removeOverlay(selectedMarker);
                map.removeOverlay(selectedCircle);
            }
            var pt = new BMap.Point(item.longitude, item.latitude);
            var myIcon = new BMap.Icon("img/map_icon_yingjidian.png", new BMap.Size(66, 59));
            var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
            map.addOverlay(marker);
            map.centerAndZoom(pt, 16);

            //创建圆对象
            var circle = new BMap.Circle(pt, 500, {
                strokeColor: "#ff0000",
                strokeWeight: 1,
                fillColor: "#ff0000",
                fillOpacity: 0.1
            });
            //画到地图上面
            map.addOverlay(circle);

            selectedCircle = circle;
            selectedMarker = marker;
        });
        $item.removeClass("template").appendTo("#eventInfoList");
    })
}

function refreshMarker() {
    map.clearOverlays();
    if (menu_baodianchangsuo_selected) {

    }
    if (menu_xianlu_selected) {

    }

    if (menu_duiwu_selected) {
        showDuiwuList();
    }
    if (menu_cheliang_selected) {
        showCheliangList();
    }
    if (menu_wuzi_selected) {
        showWuziList();
    }
}

function showDuiwuList() {
    $.each(duiwuList, function (index, item) {
        var pt = new BMap.Point(item.longitude, item.latitude);
        var myIcon = null;
        myIcon = new BMap.Icon("img/map_icon_duiwu.png", new BMap.Size(66, 59));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        map.addOverlay(marker);
    });
}

function showCheliangList() {
    $.each(cheliangList, function (index, item) {
        var pt = new BMap.Point(item.longitude, item.latitude);
        var myIcon = null;
        myIcon = new BMap.Icon("img/map_icon_cheliang.png", new BMap.Size(66, 59));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        map.addOverlay(marker);
    });
}

var selectedWuziMaker = null;

function showWuziList() {
    $.each(wuziList, function (index, item) {
        var pt = new BMap.Point(item.longitude, item.latitude);
        var myIcon = new BMap.Icon("img/map_icon_wuzi.png", new BMap.Size(66, 59));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        marker.setTitle(item.id);
        map.addOverlay(marker);
    });
}

function showFujinList1() {
    $(".content-center").hide();
    $(".content-center1").show();
    $.each(fujinList, function (index, item) {
        var $item = $("#fujinList1 .template.fujin-item").clone();
        $(".fujin-item-name", $item).text(item.name);
        $item.removeClass("template").appendTo("#fujinList1");
    });
}

function showFujinList2() {
    $(".content-center").hide();
    $(".content-center2").show();
    $.each(fujinList, function (index, item) {
        var $item = $("#fujinList2 .template.fujin-item").clone();
        $(".fujin-item-name", $item).text(item.name);
        $item.removeClass("template").appendTo("#fujinList2");
    });
}