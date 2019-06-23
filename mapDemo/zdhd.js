var kaiguanzhanList = null;
var biandianzhanList = null;
var changsuoList = null;
var xianluList = null;
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
            kaiguanzhanList = data.kaiguanzhanList;
            biandianzhanList = data.biandianzhanList;
            changsuoList = data.changsuoList;
            xianluList = data.xianluList;
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
    // $("#leftMenu1").mouseover(function () {
    //     $("#submenu-1").show();
    // });
    // $("#leftMenu1").mouseout(function () {
    //     $("#submenu-1").hide();
    // });
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
        selectedChangsuoMaker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
        selectedChangsuoMaker = null;
        $(".content-right-area").hide();
        $("#changsuoListRightArea").show();
    });

    $("#menu_zhansuo").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        hideBottomPopup();

        if(selectedMenu == "zhansuo"){
            selectedMenu = null;
            // 显示默认布局
            $(".content-right-area").hide();
            $("#defaultRightArea").show();

            $("#menu_zhansuo_img").attr("src","img/zs.png")
        }else{
            // 隐藏底部浮层
            showKaiguanzhanList();
            showBiandianzhanList();
            resetMenuImages();
            $("#menu_zhansuo_img").attr("src","img/zs_selected.png");
            selectedMenu = "zhansuo";
        }
    });

    $("#menu_baodianchangsuo").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        hideBottomPopup();

        if(selectedMenu == "baodianchangsuo"){
            selectedMenu = null;
            // 显示默认布局
            $(".content-right-area").hide();
            $("#defaultRightArea").show();
            $("#menu_changsuo_img").attr("src","img/cs.png")
        }else{
            // 隐藏底部浮层
            showChangsuoList();
            resetMenuImages();
            $("#menu_changsuo_img").attr("src","img/cs_selected.png");
            selectedMenu = "baodianchangsuo";
        }
    });
    $("#menu_xianlu").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        hideBottomPopup();

        if(selectedMenu == "xianlu"){
            selectedMenu = null;
            // 显示默认布局
            $(".content-right-area").hide();
            $("#defaultRightArea").show();
            $("#menu_xianlu_img").attr("src","img/xl.png")
        }else{
            // 隐藏底部浮层
            showXianluList();
            resetMenuImages();
            $("#menu_xianlu_img").attr("src","img/xl_selected.png");
            selectedMenu = "xianlu";
        }

    })
}

function resetMenuImages() {
    $("#menu_huodong_img").attr("src","img/zs.png")
    $("#menu_changsuo_img").attr("src","img/cs.png")
    $("#menu_xianlu_img").attr("src","img/xl.png")
    $("#menu_zhansuo_img").attr("src","img/zs.png")
    $("#menu_duiwu_img").attr("src","img/dw.png")
    $("#menu_renyuan_img").attr("src","img/ry.png")
    $("#menu_cheliang_img").attr("src","img/cl.png")
    $("#menu_wuzi_img").attr("src","img/wz.png")
    $("#menu_shebei_img").attr("src","img/sb.png")
}

/**
 * 点击开关站菜单的时候在地图上显示开关站图标
 */
function showKaiguanzhanList() {
    $.each(kaiguanzhanList, function (index, item) {
        var pt = new BMap.Point(item.longitude, item.latitude);
        var myIcon = new BMap.Icon("img/map_icon_kaiguanzhan.png", new BMap.Size(66, 59));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        marker.addEventListener("click", function (type, target) {
            showKaiguanzhanDetail(item.id);
        });
        map.addOverlay(marker);
    });
}

/**
 * 点击变电站菜单的时候在地图上显示变电站图标
 */
function showBiandianzhanList() {
    $.each(biandianzhanList, function (index, item) {
        var pt = new BMap.Point(item.longitude, item.latitude);
        var myIcon = new BMap.Icon("img/map_icon_biandianzhan.png", new BMap.Size(66, 59));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        marker.addEventListener("click", function (type, target) {
            showBiandianzhanDetail(item.id);
        });
        map.addOverlay(marker);
    });
}

/**
 * 点击线路
 */
function showXianluList() {
    $(".content-right-area").hide();
    $("#xianluListRightArea").show();
    $("#xianluListRight").html($("#xianluListRight .template.xianlu-item"));
    $.each(xianluList, function (index, item) {
        var pt = new BMap.Point(item.pointArr[0].lng, item.pointArr[0].lat);
        var myIcon = new BMap.Icon("img/map_icon_biandianzhan.png", new BMap.Size(66, 59));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        marker.addEventListener("click", function (type, target) {
            showXianluDetail(item.id);
        });
        map.addOverlay(marker);
        polyline(map, item.pointArr, "#ad0e21");

        // setTimeout(function () {
        //     resetMkPoint(marker, 0);
        // }, 100)

        var $item = $("#xianluListRight .template.xianlu-item").clone();
        $(".xianlu-item-name",$item).text(item.name);
        $(".xianlu-item-address",$item).text(item.address);
        $item.click(function () {
        });
        $item.removeClass("template").appendTo("#xianluListRight")

    });
    var zoom = getZoom(map, xianluList[0].pointArr);
    var center = new BMap.Point(xianluList[0].pointArr[0].lng, xianluList[0].pointArr[0].lat);
    map.centerAndZoom(center, zoom);

    function resetMkPoint(marker, i) {
        marker.setPosition(new BMap.Point(xianluList[0].pointArr[i].lng,xianluList[0].pointArr[i].lat));//重新设置marker的position
        if (i < xianluList[0].pointArr.length -1) {
            setTimeout(function () {
                i++;
                resetMkPoint(marker, i);
            }, 500);
        } else {
            setTimeout(function () {
                resetMkPoint(marker, 0);
            }, 500);
        }
    }

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
        marker.addEventListener("click", function (type, target) {
            if(selectedChangsuoMaker == null){
                // 未选中任何点
                showChangsuoDetail(item);
                marker.setIcon(new BMap.Icon("img/map_icon_changsuo_selected.png", new BMap.Size(66, 59)));
                selectedChangsuoMaker = marker;
            }else if(selectedChangsuoMaker.getTitle() == item.location){
                // 选中当前点，则点击时隐藏
                hideBottomPopup();
                $(".content-right-area").hide();
                $("#changsuoListRightArea").show();
                marker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
                selectedChangsuoMaker = null;
            }else if(selectedChangsuoMaker.getTitle()!= item.location){
                // 先取消选中状态
                selectedChangsuoMaker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
                showChangsuoDetail(item);
                marker.setIcon(new BMap.Icon("img/map_icon_changsuo_selected.png", new BMap.Size(66, 59)));
                selectedChangsuoMaker = marker;
            }

        });
        map.addOverlay(marker);

        var $item = $("#changsuoListRight .template.changsuo-item").clone();
        $(".changsuo-item-name",$item).text(item.location);
        $(".changsuo-item-address",$item).text(item.address);
        $item.click(function () {
            map.panTo(marker.getPosition(), 13);
            if(selectedChangsuoMaker == null){
                // 未选中任何点
                showChangsuoDetail(item);
                marker.setIcon(new BMap.Icon("img/map_icon_changsuo_selected.png", new BMap.Size(66, 59)));
                selectedChangsuoMaker = marker;
            }else if(selectedChangsuoMaker.getTitle() == item.location){
                // 选中当前点，则点击时隐藏
                hideBottomPopup();
                marker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
                selectedChangsuoMaker = null;
            }else if(selectedChangsuoMaker.getTitle()!= item.location){
                // 先取消选中状态
                selectedChangsuoMaker.setIcon(new BMap.Icon("img/map_icon_changsuo.png", new BMap.Size(66, 59)));
                showChangsuoDetail(item);
                marker.setIcon(new BMap.Icon("img/map_icon_changsuo_selected.png", new BMap.Size(66, 59)));
                selectedChangsuoMaker = marker;
            }

        });
        $item.removeClass("template").appendTo("#changsuoListRight")
    });
}

/**
 * 点击地图的开关站图标，弹出下方浮层，显示开关站详情
 */
function showKaiguanzhanDetail(id) {
    showBottomPopup();
    $(".content-bottom-area").hide();
    $("#kaiguanzhanArea").show();
    $.each(kaiguanzhanList, function (index, item) {
        if (id == item.id) {
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
}

/**
 * 点击地图的开关站图标，弹出下方浮层，显示开关站详情
 */
function showBiandianzhanDetail(id) {
    showBottomPopup();
    $(".content-bottom-area").hide();
    $("#biandianzhanArea").show();
    $.each(biandianzhanList, function (index, item) {
        if (id == item.id) {
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
    $("#changsuo_right_img").attr("src",item.rightImage);
    $("#changsuo_right_video_source1").attr("src",item.rightVideo1);
    $("#changsuo_right_video1").load();
    $("#changsuo_right_video_source2").attr("src",item.rightVideo2);
    $("#changsuo_right_video2").load();

}

/**
 * 线路详细
 */
function showXianluDetail(id) {
    showBottomPopup();
    $(".content-bottom-area").hide();
    $("#xianluArea").show();
    $.each(xianluList, function (index, item) {
        if (id == item.id) {
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
        }
    });
}