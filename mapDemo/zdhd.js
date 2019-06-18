var kaiguanzhanList = null;
var biandianzhanList = null;
var changsuoList = null;
var map = null;
// 地图的中心，大连东港会议中心
var centerPoint = new BMap.Point(121.685041, 38.927147);
$(document).ready(function () {
    initMap();
    setLinstener();
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
            biandianzhanList =  data.biandianzhanList;
            changsuoList = data.changsuoList;
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

    $("#menu_zhansuo").click(function () {
        // 清除地图上其他浮层，显示站所浮层
        map.clearOverlays();
        map.centerAndZoom(centerPoint, 13);
        // 隐藏底部浮层
        hideBottomPopup();
        showKaiguanzhanList();
        showBiandianzhanList();
    })
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
 * 点击场所菜单的时候在地图上显示场所图标
 */
function showChangsuoList() {
    $.each(changsuoList, function (index, item) {
        var pt = new BMap.Point(item.longitude, item.latitude);
        var myIcon = new BMap.Icon("img/map_icon_zs.png", new BMap.Size(66, 59));
        var marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        marker.addEventListener("click", function (type, target) {
            showChangsuoDetail(item.id);
        });
        map.addOverlay(marker);
    });
}

/**
 * 点击地图的开关站图标，弹出下方浮层，显示开关站详情
 */
function showKaiguanzhanDetail(id) {
    showBottomPopup();
    $("#kaiguanzhanArea").show();
    $("#biandianzhanArea").hide();
    $("#changsuoArea").hide();
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
    $("#kaiguanzhanArea").hide();
    $("#biandianzhanArea").show();
    $("#changsuoArea").hide();
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
function showChangsuoDetail(id) {
    showBottomPopup();
    $("#kaiguanzhanArea").hide();
    $("#biandianzhanArea").show();
    $("#changsuoArea").hide();
    $.each(changsuoList, function (index, item) {
        if (id == item.id) {
            $("#changsuo_bdzmc").text(item.bdzmc);
            $("#changsuo_sbmc").text(item.sbmc);
            $("#changsuo_ssds").text(item.ssds);
            $("#changsuo_ywdw").text(item.ywdw);
            $("#changsuo_whbz").text(item.whbz);
            $("#changsuo_zcxz").text(item.zcxz);
            $("#changsuo_zcdw").text(item.zcdw);
            $("#changsuo_dydj").text(item.dydj);
            $("#changsuo_sbzt").text(item.sbzt);
            $("#changsuo_tyrq").text(item.tyrq);
            $("#changsuo_dzlx").text(item.dzlx);
            $("#changsuo_gdqy").text(item.gdqy);
            $("#changsuo_sfznbdz").text(item.sfznbdz);
            $("#changsuo_sfsnz").text(item.sfsnz);
            $("#changsuo_sfdw").text(item.sfdw);

            $("#peopleDataList").html($("#peopleDataList .template.people-data-item"));
            $.each(item.peopleDataList, function (index2, peopleData) {
                var $peopleItem = $("#peopleDataList .template.people-data-item").clone();
                $(".people-data-item-stationname", $peopleItem).text(peopleData.stationname);
                $(".people-data-item-peopledevice", $peopleItem).text(peopleData.peopledevice);
                $(".people-data-item-ambrtemp", $peopleItem).text(peopleData.ambrtemp);
                $(".people-data-item-amp_pch", $peopleItem).text(peopleData.amp_pch);
                $(".people-data-item-freq_pch", $peopleItem).text(peopleData.freq_pch);
                $(".people-data-item-energy_pch", $peopleItem).text(peopleData.energy_pch);
                $(".people-data-item-cabcttmp_a", $peopleItem).text(peopleData.cabcttmp_a);
                $(".people-data-item-cabctalarm_a", $peopleItem).text(peopleData.cabctalarm_a);
                $peopleItem.removeClass("template").appendTo("#peopleDataList");
            });
        }
    });
}