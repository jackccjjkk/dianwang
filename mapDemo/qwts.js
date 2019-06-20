var myChart = null;
var chartLineData = [];
var chartLineDataIndex = 0;
$(document).ready(function () {
    var map = new BMap.Map("map", {mapType: BMAP_HYBRID_MAP})
    var point = new BMap.Point(121.679122, 38.935683);  // 创建点坐标
    map.centerAndZoom(point, 11);                 // 初始化地图，设置中心点坐标和地图级别
    map.setCurrentCity("大连");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    setLinstener();
    getData();
    getpolyline(map);

    var num = 222;
    setInterval(function () {
        num += parseInt(Math.random() * 100);
        $("#dataNums").rollNum({
            deVal: num
        });
    }, 1500);

    setInterval(function () {
        getDataChartLine();
    }, 5000);
});


function setLinstener() {

}

function getpolyline(map) {
    var param = {};
    var success = function (data) {
        if (data.resultCode = '00') {
            polyline(map, data.pointArr, "#ad0e21");
        } else {
        }
    };
    var error = function () {
    };
    ajaxPost("qwts.json", param, success, error, false);
}

function getData(map) {
    var param = {};
    var success = function (data) {
        if (data.resultCode = '00') {
            $("#introduction").text(data.introduction);
            initCircles(data.circleData);
            // 故障信息列表
            initFaultInfoList(data.faultInfoList);
            // 故障信息饼状图
            initChartPie(data.chartPieData);

            // 重要事件列表
            initEventInfoList(data.eventInfoList);
            // // 实时负荷监控
            initChartLine(data.chartLineData);

            // setInterval(function () {
            //     // 实时负荷监控
            //     initChartLine(data.chartLineData);
            // }, 1000);
            // console.log(data.pointArr);
        } else {

        }
    };
    var error = function () {

    };
    ajaxPost("qwts.json", param, success, error, false);
}

function getDataChartLine() {
    var param = {};
    var success = function (data) {
        if (data.resultCode = '00') {
            // 实时负荷监控
            chartLineData = chartLineData.concat(data.chartLineData);
        } else {

        }
    };
    var error = function () {

    };
    ajaxPost("qwts.json", param, success, error, false);
}

function initCircles(circleData) {
    // 变电站总数
    var total1 = circleData.value1 + circleData.value2 + circleData.value3;
    // 变压器总数
    var total2 = circleData.value4 + circleData.value5;
    // 用户总数
    var total3 = circleData.value6 + circleData.value7;
    // 线路总数
    var total4 = circleData.value8 + circleData.value9;

    // 台区总数
    var total5 = circleData.value10;

    // 变电站-220kva
    $("#circleValue1").text(circleData.value1);
    var option1 = getCircleOption(circleData.value1, total1 - circleData.value1);
    var chartCircle1 = echarts.init(document.getElementById('chartCircle1'));
    chartCircle1.setOption(option1);

    // 变电站-66kva
    $("#circleValue2").text(circleData.value2);
    var option2 = getCircleOption(circleData.value2, total1 - circleData.value2);
    var chartCircle2 = echarts.init(document.getElementById('chartCircle2'));
    chartCircle2.setOption(option2);

    // 变电站-10kva
    $("#circleValue3").text(circleData.value3);
    var option3 = getCircleOption(circleData.value3, total1 - circleData.value3);
    var chartCircle3 = echarts.init(document.getElementById('chartCircle3'));
    chartCircle3.setOption(option3);

    // 变压器-专变
    $("#circleValue4").text(circleData.value4);
    var option4 = getCircleOption(circleData.value4, total2 - circleData.value4);
    var chartCircle4 = echarts.init(document.getElementById('chartCircle4'));
    chartCircle4.setOption(option4);

    // 变压器-公变
    $("#circleValue5").text(circleData.value5);
    var option5 = getCircleOption(circleData.value5, total2 - circleData.value5);
    var chartCircle5 = echarts.init(document.getElementById('chartCircle5'));
    chartCircle5.setOption(option5);

    // 用户-专变
    $("#circleValue6").text(circleData.value6);
    var option6 = getCircleOption(circleData.value6, total3 - circleData.value6);
    var chartCircle6 = echarts.init(document.getElementById('chartCircle6'));
    chartCircle6.setOption(option6);

    // 用户-公变
    $("#circleValue7").text(circleData.value7);
    var option7 = getCircleOption(circleData.value7, total3 - circleData.value7);
    var chartCircle7 = echarts.init(document.getElementById('chartCircle7'));
    chartCircle7.setOption(option7);

    // 线路-配电
    $("#circleValue8").text(circleData.value8);
    var option8 = getCircleOption(circleData.value8, total4 - circleData.value8);
    var chartCircle8 = echarts.init(document.getElementById('chartCircle8'));
    chartCircle8.setOption(option8);

    // 用户-输电
    $("#circleValue9").text(circleData.value9);
    var option9 = getCircleOption(circleData.value9, total4 - circleData.value9);
    var chartCircle9 = echarts.init(document.getElementById('chartCircle9'));
    chartCircle9.setOption(option9);

    // 用户-台区
    $("#circleValue10").text(circleData.value10);
    var option10 = getCircleOption(circleData.value10, total5 - circleData.value10);
    var chartCircle10 = echarts.init(document.getElementById('chartCircle10'));
    chartCircle10.setOption(option10);
}

/**
 * 网源网核检测环形图的配置
 */
function getCircleOption(value, valueOther) {
    var option = {
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['70%', '100%'],
                avoidLabelOverlap: false,
                label: {
                    show: false
                },
                silent: true,
                data: [
                    {
                        value: value,
                        name: '我的数量',
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 1,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#ffc605' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#ff3f43' // 100% 处的颜色
                                }]
                            }
                        }
                    },
                    {
                        value: valueOther,
                        name: '其他数量',
                        itemStyle: {
                            color: "transparent"
                        }
                    },
                ]
            }
        ]
    };
    return option;
}

/**
 * 故障信息饼状图
 * @param charData
 */
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
                name: '故障信息',
                type: 'pie',
                radius: '40%',
                center: ['50%', '50%'],
                data: charData,
                // roseType: 'radius',
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

/**
 * 实时负荷监控线状图
 * @param lineData
 */

function initChartLine(lineData) {
    myChart = echarts.init(document.getElementById('chartLine'));
    var xData = [];
    var yData = [];
    $.each(lineData, function (index, item) {
        xData.push(item.xData);
        yData.push(item.yData);
    });
    var option = {
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
                fontSize: "12px"
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
                fontSize: "12px"
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

    myChart.setOption(option);
    chartLineData = chartLineData.concat(lineData);
    chartLineDataIndex = chartLineData.length - 1;
    setTimeout(function () {
        setInterval(function () {
            // 获取数据项
            var data0 = option.series[0].data;
            // 移除旧数据并生成新数据
            data0.shift();
            data0.push(chartLineData[chartLineDataIndex].yData);
            // 移除旧数据项并生成新数据项
            var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
            var data1 = option.xAxis.data;
            data1.shift();
            // var xData = String(chartLineData[chartLineDataIndex].xData);
            data1.push(axisData);
            // 应用配置
            setTimeout(function () {
                myChart.setOption(option);
                chartLineDataIndex++;
            }, 500);

        }, 1000);
    }, 10000)

}

function initFaultInfoList(faultInfoList) {
    // 按照每页7个分页
    var faultSwiperList = [];
    var pageCount = Math.ceil(faultInfoList.length / 7);
    for (var i = 0; i < pageCount; i++) {
        if (faultInfoList.length > 7 * (i + 1)) {
            faultSwiperList[i] = faultInfoList.slice(7 * i, 7 * (i + 1));
        } else {
            faultSwiperList[i] = faultInfoList.slice(7 * i, faultInfoList.length);
        }
    }

    $("#faultSwiperList").empty()
    $.each(faultSwiperList, function (index1, itemList) {
        var $swiperItem = $("#templateArea .template.fault-info-slide").clone();
        var $faultInfoList = $(".faultInfoList", $swiperItem);
        $.each(itemList, function (index2, item) {
            var $item = $("#templateArea .template.fault-info-item").clone();
            $(".fault-info-item-title", $item).text(item.title);
            $(".fault-info-item-name", $item).text(item.name);
            $(".fault-info-item-count", $item).text(item.count);
            $item.removeClass("template").appendTo($faultInfoList)
        });
        $swiperItem.removeClass("template").appendTo("#faultSwiperList")
    });
    var swiper = new Swiper('#faultInfoSwiper', {
        loop: true,
        direction: 'vertical',
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });
}

var intervalList=[];
function initEventInfoList(eventInfoList) {

    // 按照每页7个分页
    var eventSwiperList = [];
    var pageCount = Math.ceil(eventInfoList.length / 7);
    for (var i = 0; i < pageCount; i++) {
        if (eventInfoList.length > 7 * (i + 1)) {
            eventSwiperList[i] = eventInfoList.slice(7 * i, 7 * (i + 1));
        } else {
            eventSwiperList[i] = eventInfoList.slice(7 * i, eventInfoList.length);
        }
    }

    $("#eventSwiperList").empty();
    $.each(eventSwiperList, function (index1, itemList) {
        var $swiperItem = $("#templateArea .template.event-info-slide").clone();
        var $eventInfoList = $(".eventInfoList", $swiperItem);
        $.each(itemList, function (index2, item) {
            var $item = $("#templateArea .template.event-info-item").clone();
            $(".event-info-item-date", $item).text(item.date);
            $(".event-info-item-content", $item).text(item.content);
            $(".event-info-item-status", $item).text(item.status);
            $item.removeClass("template").appendTo($eventInfoList)
        });
        $swiperItem.removeClass("template").appendTo("#eventSwiperList")
    });

    $(".event-info-item-content").each(function (index) {
        var me = $(this);
        var width = me.parent()[0].scrollWidth - (me.parent()[0].clientWidth || me.parent()[0].offsetWidth);
        if (width > 0) {
            var interval = setInterval(function () {
                if (me.parent()[0].scrollLeft >= width) {
                    me.parent()[0].scrollLeft = 0;
                } else {
                    me.parent()[0].scrollLeft++;
                }
            }, 50);
            intervalList.push(interval);
        }
    });

    var swiper = new Swiper('#eventInfoSwiper', {
        loop: true,
        direction: 'vertical',
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
        },
        on: {
            slideChangeTransitionEnd: function () {
                $.each(intervalList,function (index,item) {
                    clearInterval(item);
                });
                intervalList = [];
                $(".event-info-item-content").each(function () {
                    var me = $(this);
                    var width = me.parent()[0].scrollWidth - (me.parent()[0].clientWidth || me.parent()[0].offsetWidth);
                    if (width > 0) {
                        var interval = setInterval(function () {
                            if (me.parent()[0].scrollLeft >= width) {
                                me.parent()[0].scrollLeft = 0;
                            } else {
                                me.parent()[0].scrollLeft++;
                            }
                        }, 50);
                        intervalList.push(interval);
                    }
                });

            },
        }
    });
}
