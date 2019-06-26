var shudian;
var dianlan;
var biandian;
var peidian;
$(document).ready(function () {
    initMap();
    setLinstener();
    setInterval(function () {
        getData();
    }, 60000);
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

var intervalList = [];

function getData() {
    var param = {};
    var success = function (data) {
        if (data.resultCode = '00') {
            // initChart(data.chartData);
            // initGoodsInfoList(data.goodsInfoList);
            initShudianList1(data.shudian.dataList1);
            initShudianList2(data.shudian.dataList2);
            initShudianList3(data.shudian.dataList3);
            initdianlan(data.dianlan.dataList);
            initbiandian1(data.biandian.dataList1);
            initbiandian2(data.biandian.dataList2);
            initpeidian1(data.peidian.dataList1);
            initpeidian2(data.peidian.dataList2);

            $(".scroll-content").each(function (index) {
                var me = $(this);
                var height = me.parent()[0].scrollHeight - (me.parent()[0].clientHeight || me.parent()[0].offsetHeight);
                if (height > 0) {
                    var interval = setInterval(function () {
                        if (me.parent()[0].scrollTop >= height) {
                            me.parent()[0].scrollTop = 0;
                        } else {
                            me.parent()[0].scrollTop++;
                        }
                    }, 50);
                    intervalList.push(interval);
                }
            });

            shudian = data.shudian;
            dianlan = data.dianlan;
            biandian = data.biandian;
            peidian = data.peidian;
        } else {

        }
    };
    var error = function () {

    };
    ajaxPost("znyw.json", param, success, error, false);
}

// TODO
function initShudianList1(dataList) {
    $("#shudianList1").html($("#shudianList1 .template.shudian-item"));
    $.each(dataList, function (index, item) {
        var $item = $("#shudianList1 .template.shudian-item").clone();
        $(".shudian-item-xianlu", $item).text(item.xianlu);
        $(".shudian-item-vl", $item).text(item.vl);
        $(".shudian-item-type", $item).text(item.type);
        $(".shudian-item-name", $item).text(item.name);
        $(".shudian-item-temperature", $item).text(item.temperature);
        $(".shudian-item-pressure", $item).text(item.pressure);
        $(".shudian-item-Pi", $item).text(item.Pi);
        $(".shudian-item-maxw", $item).text(item.maxw);
        $(".shudian-item-nomw", $item).text(item.nomw);
        $(".shudian-item-bigw", $item).text(item.bigw);
        $(".shudian-item-avgw", $item).text(item.avgw);
        $(".shudian-item-Pw", $item).text(item.Pw);
        $(".shudian-item-state", $item).text(item.state);
        $item.removeClass("template").appendTo("#shudianList1");
    })
}

// TODO
function initShudianList2(dataList) {
    $("#shudianList2").html($("#shudianList2 .template.shudian-item"));
    $.each(dataList, function (index, item) {
        var $item = $("#shudianList2 .template.shudian-item").clone();
        $(".shudian-item-xianlu", $item).text(item.xianlu);
        $(".shudian-item-gan", $item).text(item.gan);
        $(".shudian-item-vl", $item).text(item.vl);
        $(".shudian-item-type", $item).text(item.type);
        $(".shudian-item-name", $item).text(item.name);
        $(".shudian-item-angle", $item).text(item.angle);
        $(".shudian-item-deflection", $item).text(item.deflection);
        $(".shudian-item-td", $item).text(item.td);
        $(".shudian-item-ice", $item).text(item.ice);
        $(".shudian-item-hang", $item).text(item.hang);
        $(".shudian-item-state", $item).text(item.state);
        $item.removeClass("template").appendTo("#shudianList2");
    })
}

// TODO
function initShudianList3(dataList) {
    $("#shudianList3").html($("#shudianList3 .template.shudian-item"));
    $.each(dataList, function (index, item) {
        var $item = $("#shudianList3 .template.shudian-item").clone();
        $(".shudian-item-xianlu", $item).text(item.xianlu);
        $(".shudian-item-gan", $item).text(item.gan);
        $(".shudian-item-vl", $item).text(item.vl);
        $(".shudian-item-type", $item).text(item.type);
        $(".shudian-item-name", $item).text(item.name);
        $(".shudian-item-temp", $item).text(item.temp);
        $(".shudian-item-state", $item).text(item.state);
        $item.removeClass("template").appendTo("#shudianList3");
    })
}


// TODO
function initdianlan(dataList) {
    $("#dianlan").html($("#dianlan .template.dianlan-item"));
    $.each(dataList, function (index, item) {
        var $item = $("#dianlan .template.dianlan-item").clone();
        $(".dianlan-item-xianlu", $item).text(item.xianlu);
        $(".dianlan-item-shijian", $item).text(item.shijian);
        $(".dianlan-item-wendu", $item).text(item.wendu);
        $(".dianlan-item-shidu", $item).text(item.shidu);
        $(".dianlan-item-CO", $item).text(item.CO);
        $(".dianlan-item-H2S", $item).text(item.H2S);
        $(".dianlan-item-O2", $item).text(item.O2);
        $(".dianlan-item-CH4", $item).text(item.CH4);
        $(".dianlan-item-shuiweizhi", $item).text(item.shuiweizhi);
        $(".dianlan-item-dianliu", $item).text(item.dianliu);
        $(".dianlan-item-jdwendu", $item).text(item.jdwendu);
        $(".dianlan-item-guangxian", $item).text(item.guangxian);
        $(".dianlan-item-real", $item).text(item.real);
        $item.removeClass("template").appendTo("#dianlan");
    })
}

// TODO
function initbiandian1(dataList) {
    $("#biandian1").html($("#biandian1 .template.biandian-item"));
    $.each(dataList, function (index, item) {
        var $item = $("#biandian1 .template.biandian-item").clone();
        $(".biandian-item-biandian", $item).text(item.biandian);
        $(".biandian-item-shebei", $item).text(item.shebei);
        $(".biandian-item-dengji", $item).text(item.dengji);
        $(".biandian-item-type", $item).text(item.type);
        $(".biandian-item-name", $item).text(item.name);
        $(".biandian-item-jw", $item).text(item.jw);
        $(".biandian-item-yx", $item).text(item.yx);
        $(".biandian-item-yq", $item).text(item.yq);
        $(".biandian-item-qq", $item).text(item.qq);
        $(".biandian-item-yw", $item).text(item.yw);
        $(".biandian-item-zj", $item).text(item.zj);
        $(".biandian-item-ert", $item).text(item.ert);
        $(".biandian-item-yit", $item).text(item.yit);
        $(".biandian-item-yangq", $item).text(item.yangq);
        $(".biandian-item-qingq", $item).text(item.qingq);
        $(".biandian-item-zt", $item).text(item.zt);
        $item.removeClass("template").appendTo("#biandian1");
    })
}

// TODO
function initbiandian2(dataList) {
    $("#biandian2").html($("#biandian2 .template.biandian-item"));
    $.each(dataList, function (index, item) {
        var $item = $("#biandian2 .template.biandian-item").clone();
        $(".biandian-item-biandian", $item).text(item.biandian);
        $(".biandian-item-shebei", $item).text(item.shebei);
        $(".biandian-item-dengji", $item).text(item.dengji);
        $(".biandian-item-type", $item).text(item.type);
        $(".biandian-item-name", $item).text(item.name);
        $(".biandian-item-mc", $item).text(item.mc);
        $(".biandian-item-fd", $item).text(item.fd);
        $(".biandian-item-zt", $item).text(item.zt);
        $item.removeClass("template").appendTo("#biandian2");
    })
}


function initpeidian1(dataList) {
    $("#peidian1").html($("#peidian1 .template.peidian-item"));
    var myDate = new Date();//获取系统当前时间
    myDate.setMinutes (myDate.getMinutes () - 3);
    var nowStr= myDate.getFullYear() + "/"+ (myDate.getMonth()+1)+"/"+myDate.getDate()+" "+myDate.getHours() + ":"+myDate.getMinutes();
    $.each(dataList, function (index, item) {
        var $item = $("#peidian1 .template.peidian-item").clone();
        $(".peidian-item-id", $item).text(item.id);
        $(".peidian-item-shebei", $item).text(item.shebei);
        $(".peidian-item-wd", $item).text(item.wd);
        $(".peidian-item-Awd", $item).text(item.Awd);
        $(".peidian-item-Bwd", $item).text(item.Bwd);
        $(".peidian-item-Cwd", $item).text(item.Cwd);
        $(".peidian-item-val", $item).text(item.val);
        $(".peidian-item-num", $item).text(item.num);
        $(".peidian-item-nengliang", $item).text(item.nengliang);
        $(".peidian-item-bj", $item).text(item.bj);
        $(".peidian-item-time", $item).text(nowStr);
        $item.removeClass("template").appendTo("#peidian1");
    })
}

// TODO
function initpeidian2(dataList) {
    $("#peidian2").html($("#peidian2 .template.peidian-item"));
    var myDate = new Date();//获取系统当前时间
    myDate.setMinutes (myDate.getMinutes () - 3);
    var nowStr= myDate.getFullYear() + "/"+ (myDate.getMonth()+1)+"/"+myDate.getDate()+" "+myDate.getHours() + ":"+myDate.getMinutes();
    $.each(dataList, function (index, item) {
        var $item = $("#peidian2 .template.peidian-item").clone();
        $(".peidian-item-id", $item).text(item.id);
        $(".peidian-item-type", $item).text(item.type);
        $(".peidian-item-O2", $item).text(item.O2);
        $(".peidian-item-SF6", $item).text(item.SF6);
        $(".peidian-item-CO", $item).text(item.CO);
        $(".peidian-item-WN", $item).text(item.WN);
        $(".peidian-item-TEP", $item).text(item.TEP);
        $(".peidian-item-SD", $item).text(item.SD);
        $(".peidian-item-time", $item).text(nowStr);
        $item.removeClass("template").appendTo("#peidian2");
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

    $(".content-center1").show();

    $("#leftMenu1").click(function () {
        $(".content-center").hide();
        $(".content-center1").show();

        $("#video_source1").attr("src", shudian.video1);
        $("#video1").load();
        $("#video_source2").attr("src", shudian.video2);
        $("#video2").load();
        $("#video_source3").attr("src", shudian.video3);
        $("#video3").load();
        $.each(intervalList, function (index, item) {
            clearInterval(item);
        });
        intervalList = [];
        $(".scroll-content").each(function (index) {
            var me = $(this);
            var height = me.parent()[0].scrollHeight - (me.parent()[0].clientHeight || me.parent()[0].offsetHeight);
            if (height > 0) {
                var interval = setInterval(function () {
                    if (me.parent()[0].scrollTop >= height) {
                        me.parent()[0].scrollTop = 0;
                    } else {
                        me.parent()[0].scrollTop++;
                    }
                }, 50);
                intervalList.push(interval);
            }
        });

    });

    $("#leftMenu2").click(function () {
        $(".content-center").hide();
        $(".content-center2").show();

        $("#video_source1").attr("src", biandian.video1);
        $("#video1").load();
        $("#video_source2").attr("src", biandian.video2);
        $("#video2").load();
        $("#video_source3").attr("src", biandian.video3);
        $("#video3").load();
        $.each(intervalList, function (index, item) {
            clearInterval(item);
        });
        intervalList = [];
        $(".scroll-content").each(function (index) {
            var me = $(this);
            var height = me.parent()[0].scrollHeight - (me.parent()[0].clientHeight || me.parent()[0].offsetHeight);
            console.log(height)
            if (height > 0) {
                var interval = setInterval(function () {
                    if (me.parent()[0].scrollTop >= height) {
                        me.parent()[0].scrollTop = 0;
                    } else {
                        me.parent()[0].scrollTop++;
                    }
                }, 50);
                intervalList.push(interval);
            }
        });

    });

    $("#leftMenu3").click(function () {
        $(".content-center").hide();
        $(".content-center3").show();

        $("#video_source1").attr("src", dianlan.video1);
        $("#video1").load();
        $("#video_source2").attr("src", dianlan.video2);
        $("#video2").load();
        $("#video_source3").attr("src", dianlan.video3);
        $("#video3").load();
        $.each(intervalList, function (index, item) {
            clearInterval(item);
        });
        intervalList = [];
        $(".scroll-content").each(function (index) {
            var me = $(this);
            var height = me.parent()[0].scrollHeight - (me.parent()[0].clientHeight || me.parent()[0].offsetHeight);
            console.log(height)
            if (height > 0) {
                var interval = setInterval(function () {
                    if (me.parent()[0].scrollTop >= height) {
                        me.parent()[0].scrollTop = 0;
                    } else {
                        me.parent()[0].scrollTop++;
                    }
                }, 50);
                intervalList.push(interval);
            }
        });

    });

    $("#leftMenu4").click(function () {
        $(".content-center").hide();
        $(".content-center4").show();

        $("#video_source1").attr("src", peidian.video1);
        $("#video1").load();
        $("#video_source2").attr("src", peidian.video2);
        $("#video2").load();
        $("#video_source3").attr("src", peidian.video3);
        $("#video3").load();
        $.each(intervalList, function (index, item) {
            clearInterval(item);
        });
        intervalList = [];
        $(".scroll-content").each(function (index) {
            var me = $(this);
            var height = me.parent()[0].scrollHeight - (me.parent()[0].clientHeight || me.parent()[0].offsetHeight);
            if (height > 0) {
                var interval = setInterval(function () {
                    if (me.parent()[0].scrollTop >= height) {
                        me.parent()[0].scrollTop = 0;
                    } else {
                        me.parent()[0].scrollTop++;
                    }
                }, 50);
                intervalList.push(interval);
            }
        });
    });


    $(".content-center-close").click(function () {
        $(".content-center").hide();
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
}
