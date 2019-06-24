var kaiguanzhanList = null;
var biandianzhanList = null;

var changsuoList = null;
var xianluList = null;
var zhansuoList = null;

var duiwuList = null;
var renyuanList = null;
var cheliangList = null;
var wuziList = null;
var shebeiList = null;

var fanganList = null;
var fengxianList = null;
var zhizekaList = null;

var map = null;
// 地图的中心，大连东港会议中心
var centerPoint = new BMap.Point(121.685041, 38.927147);
$(document).ready(function () {
    initMap();
    setListener();
    getData();

});

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
            initProcessList(data.processList);
            kaiguanzhanList = data.kaiguanzhanList;
            biandianzhanList = data.biandianzhanList;
            zhansuoList = data.zhansuoList;
            changsuoList = data.changsuoList;
            xianluList = data.xianluList;
            duiwuList = data.duiwuList;
            renyuanList = data.renyuanList;
            cheliangList = data.cheliangList;
            wuziList = data.wuziList;
            shebeiList = data.shebeiList;
            fanganList = data.fanganList;
            fengxianList = data.fengxianList;
            zhizekaList = data.zhizekaList;
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
            $(".process-item-line-1", $item).css("background", "transparent");
        }
        if (index == processList.length - 1) {
            $(".process-item-line-2", $item).css("background", "transparent");
        }
        $item.removeClass("template").appendTo("#processList");
    })
}

var selectedMenu = null;

function setListener() {
    $(".content-center-close").click(function () {
       $(".content-center").hide();
    });
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

    //
    // $("#submenu-1").mouseover(function () {
    //     $("#submenu-1").show();
    // });
    // $("#submenu-1").mouseout(function () {
    //     $("#submenu-1").hide();
    // });
    //
    // $("#leftMenu2").mouseover(function () {
    //     $("#submenu-2").show();
    // });
    // $("#leftMenu2").mouseout(function () {
    //     $("#submenu-2").hide();
    // });
    //
    // $("#submenu-2").mouseover(function () {
    //     $("#submenu-2").show();
    // });
    // $("#submenu-2").mouseout(function () {
    //     $("#submenu-2").hide();
    // });
    //
    // $("#leftMenu3").mouseover(function () {
    //     $("#submenu-3").show();
    // });
    // $("#leftMenu3").mouseout(function () {
    //     $("#submenu-3").hide();
    // });
    //
    // $("#submenu-3").mouseover(function () {
    //     $("#submenu-3").show();
    // });
    // $("#submenu-3").mouseout(function () {
    //     $("#submenu-3").hide();
    // });
    //
    // $("#leftMenu4").mouseover(function () {
    //     $("#submenu-4").show();
    // });
    // $("#leftMenu4").mouseout(function () {
    //     $("#submenu-4").hide();
    // });
    //
    // $("#submenu-4").mouseover(function () {
    //     $("#submenu-4").show();
    // });
    // $("#submenu-4").mouseout(function () {
    //     $("#submenu-4").hide();
    // });
    $("#backToChangsuoList").click(function () {
        hideBottomPopup();
        // selectedChangsuoMaker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
        selectedChangsuoMaker.setAnimation(null);
        selectedChangsuoMaker = null;
        $(".content-right-area").hide();
        $("#changsuoListRightArea").show();
    });

    $("#backToXianluList").click(function () {
        hideBottomPopup();
        // selectedXianluMaker.setIcon(new BMap.Icon("img/map_icon_xianlu.png", new BMap.Size(66, 59)));
        // selectedXianluMaker.setAnimation(null);
        // selectedXianluMaker = null;
        $(".content-right-area").hide();
        $("#xianluListRightArea").show();
    });

    $("#backToZhansuoList").click(function () {
        hideBottomPopup();
        // selectedZhansuoMaker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
        selectedZhansuoMaker.setAnimation(null);
        selectedZhansuoMaker = null;
        $(".content-right-area").hide();
        $("#zhansuoListRightArea").show();
    });

    $("#menu_zhansuo").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        hideBottomPopup();
        $(".content-center").hide();
        if (selectedMenu == "zhansuo") {
            selectedMenu = null;
            // 显示默认布局
            $(".content-right-area").hide();
            $("#defaultRightArea").show();

            $("#menu_zhansuo_img").attr("src", "img/zs.png")
        } else {
            // 隐藏底部浮层
            // showKaiguanzhanList();
            showZhansuoList();
            resetMenuImages();
            $("#menu_zhansuo_img").attr("src", "img/zs_selected.png");
            selectedMenu = "zhansuo";
        }
    });

    $("#menu_baodianchangsuo").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        hideBottomPopup();
        $(".content-center").hide();
        if (selectedMenu == "baodianchangsuo") {
            selectedMenu = null;
            // 显示默认布局
            $(".content-right-area").hide();
            $("#defaultRightArea").show();
            $("#menu_changsuo_img").attr("src", "img/cs.png")
        } else {
            // 隐藏底部浮层
            showChangsuoList();
            resetMenuImages();
            $("#menu_changsuo_img").attr("src", "img/cs_selected.png");
            selectedMenu = "baodianchangsuo";
        }
    });
    $("#menu_xianlu").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        hideBottomPopup();
        $(".content-center").hide();
        if (selectedMenu == "xianlu") {
            selectedMenu = null;
            // 显示默认布局
            $(".content-right-area").hide();
            $("#defaultRightArea").show();
            $("#menu_xianlu_img").attr("src", "img/xl.png")
        } else {
            // 隐藏底部浮层
            showXianluList();
            resetMenuImages();
            $("#menu_xianlu_img").attr("src", "img/xl_selected.png");
            selectedMenu = "xianlu";
        }

    });
    $("#menu_duiwu").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        hideBottomPopup();
        $(".content-center").hide();
        if (selectedMenu == "duiwu") {
            selectedMenu = null;
            // 显示默认布局
            $(".content-right-area").hide();
            $("#defaultRightArea").show();
            $("#menu_duiwu_img").attr("src", "img/dw.png")
        } else {
            // 隐藏底部浮层
            showDuiwuList();
            resetMenuImages();
            $("#menu_duiwu_img").attr("src", "img/dw_selected.png");
            selectedMenu = "duiwu";
        }

    });
    $("#menu_renyuan").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        hideBottomPopup();
        $(".content-center").hide();
        if (selectedMenu == "renyuan") {
            selectedMenu = null;
            // 显示默认布局
            $(".content-right-area").hide();
            $("#defaultRightArea").show();
            $("#menu_renyuan_img").attr("src", "img/ry.png")
        } else {
            // 隐藏底部浮层
            showRenyuanList();
            resetMenuImages();
            $("#menu_renyuan_img").attr("src", "img/ry_selected.png");
            selectedMenu = "renyuan";
        }

    });
    $("#menu_cheliang").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        hideBottomPopup();
        $(".content-center").hide();
        if (selectedMenu == "cheliang") {
            selectedMenu = null;
            // 显示默认布局
            $(".content-right-area").hide();
            $("#defaultRightArea").show();
            $("#menu_cheliang_img").attr("src", "img/cl.png")
        } else {
            // 隐藏底部浮层
            showCheliangList();
            resetMenuImages();
            $("#menu_cheliang_img").attr("src", "img/cl_selected.png");
            selectedMenu = "cheliang";
        }

    });
    $("#menu_wuzi").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        hideBottomPopup();
        $(".content-center").hide();
        if (selectedMenu == "wuzi") {
            selectedMenu = null;
            // 显示默认布局
            $(".content-right-area").hide();
            $("#defaultRightArea").show();
            $("#menu_wuzi_img").attr("src", "img/wz.png")
        } else {
            // 隐藏底部浮层
            showWuziList();
            resetMenuImages();
            $("#menu_wuzi_img").attr("src", "img/wz_selected.png");
            selectedMenu = "wuzi";
        }

    });
    $("#menu_fangan").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        hideBottomPopup();
        $(".content-center").hide();
        if (selectedMenu == "fangan") {
            selectedMenu = null;
            // 显示默认布局
            $(".content-right-area").hide();
            $("#defaultRightArea").show();
            $("#menu_fangan_img").attr("src", "img/fa.png")
        } else {
            // 隐藏底部浮层
            showFanganList();
            resetMenuImages();
            $("#menu_fangan_img").attr("src", "img/fa_selected.png");
            selectedMenu = "fangan";
        }
    });
    $("#menu_fengxian").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        hideBottomPopup();
        $(".content-center").hide();
        if (selectedMenu == "fengxian") {
            selectedMenu = null;
            // 显示默认布局
            $(".content-right-area").hide();
            $("#defaultRightArea").show();
            $("#menu_fengxian_img").attr("src", "img/fx.png")
        } else {
            // 隐藏底部浮层
            showFengxianList();
            resetMenuImages();
            $("#menu_fengxian_img").attr("src", "img/fx_selected.png");
            selectedMenu = "fengxian";
        }
    });
    $("#menu_zhizeka").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        hideBottomPopup();
        $(".content-center").hide();
        if (selectedMenu == "zhizeka") {
            selectedMenu = null;
            // 显示默认布局
            $(".content-right-area").hide();
            $("#defaultRightArea").show();
            $("#menu_zhizeka_img").attr("src", "img/zdk.png")
        } else {
            // 隐藏底部浮层
            showZhizekaList();
            resetMenuImages();
            $("#menu_zhizeka_img").attr("src", "img/zdk_selected.png");
            selectedMenu = "zhizeka";
        }
    })
}

function resetMenuImages() {
    $("#menu_huodong_img").attr("src", "img/zs.png")
    $("#menu_changsuo_img").attr("src", "img/cs.png")
    $("#menu_xianlu_img").attr("src", "img/xl.png")
    $("#menu_zhansuo_img").attr("src", "img/zs.png")
    $("#menu_duiwu_img").attr("src", "img/dw.png")
    $("#menu_renyuan_img").attr("src", "img/ry.png")
    $("#menu_cheliang_img").attr("src", "img/cl.png")
    $("#menu_wuzi_img").attr("src", "img/wz.png")
    $("#menu_fangan_img").attr("src", "img/fa.png")
    $("#menu_zhizeka_img").attr("src", "img/zdk.png")
    $("#menu_fengxian_img").attr("src", "img/fx.png")
}

/**
 * 点击开关站菜单的时候在地图上显示开关站图标
 */
var selectedZhansuoMaker = null;

function showZhansuoList() {
    $(".content-right-area").hide();
    $("#zhansuoListRightArea").show();
    $("#zhansuoListRight").html($("#zhansuoListRight .template.zhansuo-item"));
    $.each(zhansuoList, function (index, item) {
        var pt = new BMap.Point(item.longitude, item.latitude);
        var myIcon = null;
        if (item.type == "1") {
            // 开关站
            myIcon = new BMap.Icon("img/map_icon_kaiguanzhan.png", new BMap.Size(66, 59));
        } else if (item.type == "2") {
            // 变电
            myIcon = new BMap.Icon("img/map_icon_biandianzhan.png", new BMap.Size(66, 59));
        }
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        marker.setTitle(item.id);
        marker.addEventListener("click", function (type, target) {
            if (selectedZhansuoMaker == null) {
                if (item.type == 1) {
                    showKaiguanzhanDetail(item);
                } else {
                    showBiandianzhanDetail(item)
                }
                // 未选中任何点
                // marker.setIcon(new BMap.Icon("img/map_icon_changsuo_selected.png", new BMap.Size(66, 59)));
                marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                selectedZhansuoMaker = marker;
            } else if (selectedZhansuoMaker.getTitle() == item.id) {
                // 选中当前点，则点击时隐藏
                hideBottomPopup();
                $(".content-right-area").hide();
                $("#zhansuoListRightArea").show();
                // marker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
                marker.setAnimation(null);
                selectedZhansuoMaker = null;
            } else if (selectedZhansuoMaker.getTitle() != item.id) {
                if (item.type == 1) {
                    showKaiguanzhanDetail(item);
                } else {
                    showBiandianzhanDetail(item)
                }
                // 先取消选中状态
                // selectedZhansuoMaker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
                selectedZhansuoMaker.setAnimation(null);
                if (item.type == 1) {
                    showKaiguanzhanDetail(item);
                } else {
                    showBiandianzhanDetail(item)
                }
                // marker.setIcon(new BMap.Icon("img/map_icon_changsuo_selected.png", new BMap.Size(66, 59)));
                selectedZhansuoMaker.setAnimation(BMAP_ANIMATION_BOUNCE);
                selectedZhansuoMaker = marker;
            }
        });

        map.addOverlay(marker);
        if (index < 8) {
            var $item = $("#zhansuoListRight .template.zhansuo-item").clone();
            $(".zhansuo-item-name", $item).text(item.name);
            $(".zhansuo-item-unit", $item).text(item.unit);
            $item.click(function () {
                map.centerAndZoom(marker.getPosition(), 14);
                if (item.type == 1) {
                    showKaiguanzhanDetail(item);
                } else {
                    showBiandianzhanDetail(item)
                }
                if (selectedZhansuoMaker == null) {
                    // 未选中任何点
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                    selectedZhansuoMaker = marker;
                } else {
                    // 先取消选中状态
                    selectedZhansuoMaker.setAnimation(null);
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                    selectedZhansuoMaker = marker;
                }

            });
            $item.removeClass("template").appendTo("#zhansuoListRight")
        }
    });
}

function showDuiwuList() {
    $(".content-right-area").hide();
    $("#duiwuListRightArea").show();
    $("#duiwuListRight").html($("#duiwuListRight .template.duiwu-item"));
    $.each(duiwuList, function (index, item) {
        var pt = new BMap.Point(item.longitude, item.latitude);
        var myIcon = null;
        myIcon = new BMap.Icon("img/map_icon_duiwu.png", new BMap.Size(66, 59));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        marker.addEventListener("click", function (type, target) {
            showDuiwuDetail(item);
        });
        map.addOverlay(marker);

        var $item = $("#duiwuListRight .template.duiwu-item").clone();
        $(".duiwu-item-name", $item).text(item.name);
        $(".duiwu-item-unit", $item).text(item.type);
        $item.click(function () {
            showDuiwuDetail(item);
        });
        $item.removeClass("template").appendTo("#duiwuListRight")
    });
}

function showRenyuanList() {
    $(".content-right-area").hide();
    $("#renyuanListRightArea").show();
    $("#renyuanListRight").html($("#renyuanListRight .template.renyuan-item"));
    $.each(renyuanList, function (index, item) {
        var pt = new BMap.Point(item.longitude, item.latitude);
        var myIcon = null;
        myIcon = new BMap.Icon("img/map_icon_renyuan.png", new BMap.Size(66, 59));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        marker.addEventListener("click", function (type, target) {
            showRenyuanDetail(item);
        });
        map.addOverlay(marker);

        var $item = $("#renyuanListRight .template.renyuan-item").clone();
        $(".renyuan-item-name", $item).text(item.name);
        $(".renyuan-item-unit", $item).text(item.unit);
        $(".renyuan-item-phone", $item).text(item.phone);
        $item.click(function () {
            showRenyuanDetail(item);
        });
        $item.removeClass("template").appendTo("#renyuanListRight")
    });
}

function showCheliangList() {
    $(".content-right-area").hide();
    $("#cheliangListRightArea").show();
    $("#cheliangListRight").html($("#cheliangListRight .template.cheliang-item"));
    $.each(cheliangList, function (index, item) {
        var pt = new BMap.Point(item.longitude, item.latitude);
        var myIcon = null;
        myIcon = new BMap.Icon("img/map_icon_cheliang.png", new BMap.Size(66, 59));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        marker.addEventListener("click", function (type, target) {
            showCheliangDetail(item);
        });
        map.addOverlay(marker);

        var $item = $("#cheliangListRight .template.cheliang-item").clone();
        $(".cheliang-item-name", $item).text(item.name);
        // $(".cheliang-item-unit", $item).text(item.unit);
        // $(".cheliang-item-phone", $item).text(item.phone);
        $item.click(function () {
            showCheliangDetail(item);
        });
        $item.removeClass("template").appendTo("#cheliangListRight")
    });
}

var selectedWuziMaker = null;

function showWuziList() {
    $(".content-right-area").hide();
    $("#wuziListRightArea").show();
    $("#wuziListRight").html($("#wuziListRight .template.wuzi-item"));
    $.each(wuziList, function (index, item) {
        var pt = new BMap.Point(item.longitude, item.latitude);
        var myIcon = null;
        myIcon = new BMap.Icon("img/map_icon_wuzi.png", new BMap.Size(66, 59));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        marker.setTitle(item.id);
        marker.addEventListener("click", function (type, target) {
            if (selectedWuziMaker == null) {
                // 未选中任何点
                // marker.setIcon(new BMap.Icon("img/map_icon_changsuo_selected.png", new BMap.Size(66, 59)));
                marker.setAnimation(BMAP_ANIMATION_BOUNCE)
                selectedWuziMaker = marker;
            } else if (selectedWuziMaker.getTitle() == item.id) {
                // 选中当前点，则点击时隐藏
                hideBottomPopup();
                $(".content-right-area").hide();
                $("#changsuoListRightArea").show();
                // marker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
                marker.setAnimation(null)
                selectedWuziMaker = null;
            } else if (selectedWuziMaker.getTitle() != item.id) {
                // 先取消选中状态
                // selectedChangsuoMaker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
                selectedWuziMaker.setAnimation(null)
                // marker.setIcon(new BMap.Icon("img/map_icon_changsuo_selected.png", new BMap.Size(66, 59)));
                marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                selectedWuziMaker = marker;
            }
        });
        map.addOverlay(marker);

        var $item = $("#wuziListRight .template.wuzi-item").clone();
        $(".wuzi-item-name", $item).text(item.name);
        $(".wuzi-item-unit", $item).text(item.unit);
        $(".wuzi-item-phone", $item).text(item.phone);
        $item.click(function () {
            // map.panTo(new BMap.Point(item.longitude, item.latitude));
            map.centerAndZoom(new BMap.Point(item.longitude, item.latitude), 14);
            if (selectedWuziMaker == null) {
                // 未选中任何点
                marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                selectedWuziMaker = marker;
            } else {
                // 先取消选中状态
                selectedWuziMaker.setAnimation(null);
                marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                selectedWuziMaker = marker;
            }

        });
        $item.removeClass("template").appendTo("#wuziListRight")
    });
}

function showShebeiList() {
    $(".content-right-area").hide();
    $("#shebeiListRightArea").show();
    $("#shebeiListRight").html($("#shebeiListRight .template.shebei-item"));
    $.each(shebeiList, function (index, item) {
        var pt = new BMap.Point(item.longitude, item.latitude);
        var myIcon = null;
        myIcon = new BMap.Icon("img/map_icon_shebei.png", new BMap.Size(66, 59));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        marker.addEventListener("click", function (type, target) {
            showShebeiDetail(item);
        });
        map.addOverlay(marker);

        var $item = $("#shebeiListRight .template.shebei-item").clone();
        $(".shebei-item-name", $item).text(item.name);
        $(".shebei-item-unit", $item).text(item.unit);
        $(".shebei-item-phone", $item).text(item.phone);
        $item.click(function () {
            showShebeiDetail(item);
        });
        $item.removeClass("template").appendTo("#shebeiListRight")
    });
}


function showZhizekaList() {
    $(".content-right-area").hide();
    $("#zhizekaListRightArea").show();
    $("#zhizekaListRight").html($("#zhizekaListRight .template.zhizeka-item"));
    $.each(zhizekaList, function (index, item) {
        var $item = $("#zhizekaListRight .template.zhizeka-item").clone();
        $(".zhizeka-item-name", $item).text(item.name);
        $(".zhizeka-item-unit", $item).text(item.unit);
        $item.click(function () {
            showZhizekaDetail(item);
        });
        $item.removeClass("template").appendTo("#zhizekaListRight")
    });
}

function showZhizekaList() {
    $(".content-right-area").hide();
    $("#zhizekaListRightArea").show();
    $("#zhizekaListRight").html($("#zhizekaListRight .template.zhizeka-item"));
    $.each(zhizekaList, function (index, item) {
        var $item = $("#zhizekaListRight .template.zhizeka-item").clone();
        $(".zhizeka-item-name", $item).text(item.name);
        $(".zhizeka-item-unit", $item).text(item.unit);
        $item.click(function () {
            showZhizekaDetail(item);
        });
        $item.removeClass("template").appendTo("#zhizekaListRight")
    });
}

function showFanganList() {
    $(".content-right-area").hide();
    $("#fanganListRightArea").show();
    $("#fanganListRight").html($("#fanganListRight .template.fangan-item"));
    $.each(fanganList, function (index, item) {
        var $item = $("#fanganListRight .template.fangan-item").clone();
        $(".fangan-item-name", $item).text(item.name);
        // $(".fangan-item-unit", $item).text(item.unit);
        $item.click(function () {
            showFanganDetail(item);
        });
        $item.removeClass("template").appendTo("#fanganListRight")
    });
}

function showFengxianList() {
    $(".content-right-area").hide();
    $("#fengxianListRightArea").show();
    $("#fengxianListRight").html($("#fengxianListRight .template.fengxian-item"));
    $.each(fengxianList, function (index, item) {
        var $item = $("#fengxianListRight .template.fengxian-item").clone();
        $(".fengxian-item-name", $item).text(item.name);
        // $(".fengxian-item-unit", $item).text(item.unit);
        $item.click(function () {
            showFengxianDetail(item);
        });
        $item.removeClass("template").appendTo("#fengxianListRight")
    });
}

/**
 * 点击变电站菜单的时候在地图上显示变电站图标
 */
// function showBiandianzhanList() {
//     $.each(biandianzhanList, function (index, item) {
//         var pt = new BMap.Point(item.longitude, item.latitude);
//         var myIcon = new BMap.Icon("img/map_icon_biandianzhan.png", new BMap.Size(66, 59));
//         var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
//         marker.addEventListener("click", function (type, target) {
//             showBiandianzhanDetail(item.id);
//         });
//         map.addOverlay(marker);
//     });
// }

/**
 * 点击线路
 */
function showXianluList() {
    $(".content-right-area").hide();
    $("#xianluListRightArea").show();
    $("#xianluListRight").html($("#xianluListRight .template.xianlu-item"));
    $.each(xianluList, function (index, item) {
        // polyline(map,item.pointArr);
        // var pt = new BMap.Point(item.pointArr[0].lng, item.pointArr[0].lat);
        // var myIcon = new BMap.Icon("img/map_icon_biandianzhan.png", new BMap.Size(66, 59));
        // var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        // marker.addEventListener("click", function (type, target) {
        //     showXianluDetail(item);
        // });
        // map.addOverlay(marker);
        $.each(item.pointArr, function (index2, item2) {
            polyline(map, item2, echarts.color.modifyHSL('#5A94DF', Math.round(20 * index)));
        });

        var $item = $("#xianluListRight .template.xianlu-item").clone();
        $(".xianlu-item-name", $item).text(item.name);
        $(".xianlu-item-unit", $item).text(item.unit);
        $item.click(function () {
            console.log(item);
            showXianluDetail(item);
        });
        $item.removeClass("template").appendTo("#xianluListRight")

    });
    var zoom = getZoom(map, xianluList[0].pointArr[0]);
    var center = new BMap.Point(xianluList[0].pointArr[0][0].lng, xianluList[0].pointArr[0][0].lat);
    map.centerAndZoom(center, 14);

}

/**
 * 点击场所菜单的时候在地图上显示场所图标
 */
var selectedChangsuoMaker;

function showChangsuoList() {
    $(".content-right-area").hide();
    $("#changsuoListRightArea").show();
    $("#changsuoListRight").html($("#changsuoListRight .template.changsuo-item"));
    $.each(changsuoList, function (index, item) {
        var pt = new BMap.Point(item.longitude, item.latitude);
        var myIcon = new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        marker.setTitle(item.location);
        // if(item.id == 1 || item.id==2){
        //     marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        // }
        marker.addEventListener("click", function (type, target) {
            if (selectedChangsuoMaker == null) {
                // 未选中任何点
                showChangsuoDetail(item);
                // marker.setIcon(new BMap.Icon("img/map_icon_changsuo_selected.png", new BMap.Size(66, 59)));
                marker.setAnimation(BMAP_ANIMATION_BOUNCE)
                selectedChangsuoMaker = marker;
            } else if (selectedChangsuoMaker.getTitle() == item.location) {
                // 选中当前点，则点击时隐藏
                hideBottomPopup();
                $(".content-right-area").hide();
                $("#changsuoListRightArea").show();
                // marker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
                marker.setAnimation(null)
                selectedChangsuoMaker = null;
            } else if (selectedChangsuoMaker.getTitle() != item.location) {
                // 先取消选中状态
                // selectedChangsuoMaker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
                selectedChangsuoMaker.setAnimation(null)
                showChangsuoDetail(item);
                // marker.setIcon(new BMap.Icon("img/map_icon_changsuo_selected.png", new BMap.Size(66, 59)));
                marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                selectedChangsuoMaker = marker;
            }

        });
        map.addOverlay(marker);

        var $item = $("#changsuoListRight .template.changsuo-item").clone();
        $(".changsuo-item-name", $item).text(item.location);
        $(".changsuo-item-address", $item).text(item.address);
        $item.click(function () {
            map.centerAndZoom(marker.getPosition(), 14);
            showChangsuoDetail(item);
            if (selectedChangsuoMaker == null) {
                // 未选中任何点
                marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                selectedChangsuoMaker = marker;
            } else {
                // 先取消选中状态
                selectedChangsuoMaker.setAnimation(null);
                marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                selectedChangsuoMaker = marker;
            }

            // map.panTo(marker.getPosition(), 14);
            // map.centerAndZoom(marker.getPosition(), 14);
            // if (selectedChangsuoMaker == null) {
            //     // 未选中任何点
            //     showChangsuoDetail(item);
            //     marker.setIcon(new BMap.Icon("img/map_icon_changsuo_selected.png", new BMap.Size(66, 59)));
            //     selectedChangsuoMaker = marker;
            // } else if (selectedChangsuoMaker.getTitle() == item.location) {
            //     // 选中当前点，则点击时隐藏
            //     hideBottomPopup();
            //     marker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
            //     selectedChangsuoMaker = null;
            // } else if (selectedChangsuoMaker.getTitle() != item.location) {
            //     // 先取消选中状态
            //     selectedChangsuoMaker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
            //     showChangsuoDetail(item);
            //     marker.setIcon(new BMap.Icon("img/map_icon_changsuo_selected.png", new BMap.Size(66, 59)));
            //     selectedChangsuoMaker = marker;
            // }

        });
        $item.removeClass("template").appendTo("#changsuoListRight")
    });
}

/**
 * 点击地图的开关站图标，弹出下方浮层，显示开关站详情
 */
function showKaiguanzhanDetail(selectedItem) {
    showBottomPopup();
    $(".content-bottom-area").hide();
    $("#kaiguanzhanArea").show();
    $.each(kaiguanzhanList, function (index, item) {
        if (selectedItem.id == item.id) {
            $("#kaiguanzhan_bdzmc").text(item.bdzmc);
            $("#kaiguanzhan_sbmc").text(item.sbmc);
            $("#kaiguanzhan_ssds").text(item.ssds);
            $("#kaiguanzhan_ywdw").text(item.ywdw);
            $("#kaiguanzhan_whbz").text(item.whbz);
            $("#kaiguanzhan_zcxz").text(item.zcxz);
            $("#kaiguanzhan_zcdw").text(item.zcdw);
            $("#kaiguanzhan_dydj").text(item.dydj);
            $("#kaiguanzhan_sbzt").text(item.sbzt);
            $("#kaiguanzhan_tyrq").text(item.tyrq);
            $("#kaiguanzhan_dzlx").text(item.dzlx);
            $("#kaiguanzhan_gdqy").text(item.gdqy);
            $("#kaiguanzhan_sfznbdz").text(item.sfznbdz);
            $("#kaiguanzhan_sfsnz").text(item.sfsnz);
            $("#kaiguanzhan_sfdw").text(item.sfdw);

            $("#monitorDataList").html($("#monitorDataList .template.monitor-data-item"));
            $.each(item.monitorDataList, function (index2, monitorData) {
                var $monitorItem = $("#monitorDataList .template.monitor-data-item").clone();
                $(".monitor-data-item-stationname", $monitorItem).text(monitorData.stationname);
                $(".monitor-data-item-monitordevice", $monitorItem).text(monitorData.monitordevice);
                $(".monitor-data-item-ambrtemp", $monitorItem).text(monitorData.ambrtemp);
                $(".monitor-data-item-amp_pch", $monitorItem).text(monitorData.amp_pch);
                $(".monitor-data-item-freq_pch", $monitorItem).text(monitorData.freq_pch);
                $(".monitor-data-item-energy_pch", $monitorItem).text(monitorData.energy_pch);
                $(".monitor-data-item-cabcttmp_a", $monitorItem).text(monitorData.cabcttmp_a);
                $(".monitor-data-item-cabctalarm_a", $monitorItem).text(monitorData.cabctalarm_a);
                $monitorItem.removeClass("template").appendTo("#monitorDataList");
            });
        }
    });
    // 右侧区域
    $(".content-right-area").hide();
    $("#zhansuoRightArea").show();
    // $("#zhansuo_right_img1").attr("src", selectedItem.rightImage);
    // $("#zhansuo_right_img2").attr("src", selectedItem.rightImage);
    $("#zhansuo_right_video_source3").attr("src", selectedItem.rightVideo3);
    $("#zhansuo_right_video3").load();
    $("#zhansuo_right_video_source1").attr("src", selectedItem.rightVideo1);
    $("#zhansuo_right_video1").load();
    $("#zhansuo_right_video_source2").attr("src", selectedItem.rightVideo2);
    $("#zhansuo_right_video2").load();
}

/**
 * 点击地图的开关站图标，弹出下方浮层，显示开关站详情
 */
function showBiandianzhanDetail(selectedItem) {
    showBottomPopup();
    $(".content-bottom-area").hide();
    $("#biandianzhanArea").show();
    $.each(biandianzhanList, function (index, item) {
        if (selectedItem.id == item.id) {
            $("#biandianzhan_dzmc").text(item.dzmc);
            $("#biandianzhan_ywdw").text(item.ywdw);
            $("#biandianzhan_dydj").text(item.dydj);
            $("#biandianzhan_tyrq").text(item.tyrq);
            $("#biandianzhan_dzzyjb").text(item.dzzyjb);
            $("#biandianzhan_ssds").text(item.ssds);
            $("#biandianzhan_whbz").text(item.whbz);
            $("#biandianzhan_sbzt").text(item.sbzt);
            $("#biandianzhan_dzlx").text(item.dzlx);
            $("#biandianzhan_wsdj").text(item.wsdj);
            $("#biandianzhan_zbfs").text(item.zbfs);
            $("#biandianzhan_sfsnz").text(item.sfsnz);
            $("#biandianzhan_rl").text(item.rl);
            $("#biandianzhan_zyfl").text(item.zyfl);
            $("#biandianzhan_xflx").text(item.xflx);
            $("#biandianzhan_sfdw").text(item.sfdw);

            $("#reportDataList").html($("#reportDataList .template.report-data-item"));
            $.each(item.reportDataList, function (index2, reportData) {
                var $reportItem = $("#reportDataList .template.report-data-item").clone();
                $(".report-data-item-sblx", $reportItem).text(reportData.sblx);
                $(".report-data-item-dwmc", $reportItem).text(reportData.dwmc);
                $(".report-data-item-sbqy", $reportItem).text(reportData.sbqy);
                $(".report-data-item-jgmc", $reportItem).text(reportData.jgmc);
                $(".report-data-item-sblx", $reportItem).text(reportData.sblx);
                $(".report-data-item-hjwd", $reportItem).text(reportData.hjwd);
                $(".report-data-item-hjsd", $reportItem).text(reportData.hjsd);
                $(".report-data-item-hjfs", $reportItem).text(reportData.hjfs);
                $(".report-data-item-gjdj", $reportItem).text(reportData.gjdj);
                $(".report-data-item-cjxx", $reportItem).text(reportData.cjxx);
                $reportItem.removeClass("template").appendTo("#reportDataList");
            });
        }
    });

    // 右侧区域
    $(".content-right-area").hide();
    $("#zhansuoRightArea").show();
    // $("#zhansuo_right_img1").attr("src", selectedItem.rightImage);
    // $("#zhansuo_right_img2").attr("src", selectedItem.rightImage);
    // $("#zhansuo_right_video_source1").attr("src", selectedItem.rightVideo1);
    // $("#zhansuo_right_video1").load();
    // $("#zhansuo_right_video_source2").attr("src", selectedItem.rightVideo2);
    // $("#zhansuo_right_video2").load();
    $("#zhansuo_right_video_source3").attr("src", selectedItem.rightVideo3);
    $("#zhansuo_right_video3").load();
    $("#zhansuo_right_video_source1").attr("src", selectedItem.rightVideo1);
    $("#zhansuo_right_video1").load();
    $("#zhansuo_right_video_source2").attr("src", selectedItem.rightVideo2);
    $("#zhansuo_right_video2").load();
}

/**
 * 点击地图的开关站图标，弹出下方浮层，显示开关站详情
 */
function showChangsuoDetail(item) {
    // 底部区域

    showBottomPopup();
    $(".content-bottom-area").hide();
    $("#changsuoArea").show();
    $("#changsuo_location").text(item.location);
    $("#changsuo_address").text(item.address);
    $("#changsuo_name_10").text(item.name10);
    $("#changsuo_people_10").text(item.people10);
    $("#changsuo_phone_10").text(item.phone10);
    $("#changsuo_name_66").text(item.name66);
    $("#changsuo_people_66").text(item.people66);
    $("#changsuo_phone_66").text(item.phone66);
    $("#changsuo_name_66line").text(item.name66line);
    $("#changsuo_people_66line").text(item.people66line);
    $("#changsuo_phone_66line").text(item.phone66line);
    $("#changsuo_name_220").text(item.name220);
    $("#changsuo_people_220").text(item.people220);
    $("#changsuo_phone_220").text(item.phone220);

    $("#peopleDataList").html($("#peopleDataList .template.people-data-item"));
    $.each(item.peopleDataList, function (index2, peopleData) {
        var $peopleItem = $("#peopleDataList .template.people-data-item").clone();
        $(".people-data-item-dw", $peopleItem).text(peopleData.dw);
        $(".people-data-item-bdry", $peopleItem).text(peopleData.bdry);
        $(".people-data-item-zw", $peopleItem).text(peopleData.zw);
        $(".people-data-item-lxfs", $peopleItem).text(peopleData.lxfs);
        $(".people-data-item-cph", $peopleItem).text(peopleData.cph);
        $(".people-data-item-cllx", $peopleItem).text(peopleData.cllx);
        $(".people-data-item-wzck", $peopleItem).text(peopleData.wzck);
        $peopleItem.removeClass("template").appendTo("#peopleDataList");
    });

    // 右侧区域
    $(".content-right-area").hide();
    $("#changsuoRightArea").show();
    $("#changsuo_right_img1").attr("src", item.rightImage1);
    $("#changsuo_right_img2").attr("src", item.rightImage2);
    // $("#changsuo_right_video_source1").attr("src", item.rightVideo1);
    // $("#changsuo_right_video1").load();
    $("#changsuo_right_video_source2").attr("src", item.rightVideo2);
    $("#changsuo_right_video2").load();

}

/**
 * 线路详细
 */
function showXianluDetail(item) {
    showBottomPopup();
    $(".content-bottom-area").hide();
    $("#xianluArea").show();
    $("#xianlu_name").text(item.name);
    $("#xianlu_address").text(item.address);
    $("#xianlu_length").text(item.length);
    $("#xianlu_line").text(item.line);
    $("#xianlu_device").text(item.device);

    $("#xianluDataList").html($("#xianluDataList .template.xianlu-data-item"));
    $.each(item.xianluDataList, function (index2, xianluData) {
        var $xianluItem = $("#xianluDataList .template.xianlu-data-item").clone();
        $(".xianlu-data-item-name", $xianluItem).text(xianluData.name);
        $(".xianlu-data-item-t_status", $xianluItem).text(xianluData.t_status);
        $(".xianlu-data-item-t_time", $xianluItem).text(xianluData.t_time);
        $(".xianlu-data-item-h_status", $xianluItem).text(xianluData.h_status);
        $(".xianlu-data-item-h_time", $xianluItem).text(xianluData.h_time);
        $(".xianlu-data-item-g_status", $xianluItem).text(xianluData.g_status);
        $(".xianlu-data-item-g_comm", $xianluItem).text(xianluData.g_comm);
        $(".xianlu-data-item-w_status", $xianluItem).text(xianluData.w_status);
        $(".xianlu-data-item-w_comm", $xianluItem).text(xianluData.w_comm);
        $xianluItem.removeClass("template").appendTo("#xianluDataList");
    });

    // 右侧区域
    $(".content-right-area").hide();
    $("#xianluRightArea").show();
    $("#xianlu_right_img").attr("src", item.rightImage);
    $("#xianlu_right_video_source1").attr("src", item.rightVideo1);
    $("#xianlu_right_video1").load();
    $("#xianlu_right_video_source2").attr("src", item.rightVideo2);
    $("#xianlu_right_video2").load();
    $("#xianlu_right_video_source3").attr("src", item.rightVideo3);
    $("#xianlu_right_video3").load();
}


/**
 * 指导卡详细
 */

function showZhizekaDetail(item) {
    $(".content-center1").show();
    $(".content-center1-type").show();
    $(".content-center1-title").text(item.title);
    $(".content-center1-type").text("保电职责卡");
    $(".content-center1-img").attr("src", item.img);
}

/**
 * 方案明细
 */

function showFanganDetail(item) {
    $(".content-center1").show();
    $(".content-center1-type").hide();
    $(".content-center1-title").text(item.name);
    $(".content-center1-type").text("保电方案");
    $(".content-center1-img").attr("src", item.img);
}

/**
 * 风险卡
 */

function showFengxianDetail(item) {
    $(".content-center1").show();
    $(".content-center1-type").show();
    $(".content-center1-title").text(item.title);
    $(".content-center1-type").text("保电风险卡");
    $(".content-center1-img").attr("src", item.img);
}

function showDuiwuDetail(item) {
    $(".content-center2").show();
    $(".content-center2-img").attr("src", item.img);
}

function showCheliangDetail(item) {
    $(".content-center3").show();
    $(".content-center3-img").attr("src", item.img);
}