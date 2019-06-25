

// 动态直方图

var myChart = echarts.init(document.getElementById("dynamic-bar-graph"));

myChart.showLoading();

// 定义相关配置
var option = {
    // 直角坐标系 grid 中的 x 轴
    xAxis: [
        {
            // 坐标轴类型(数值轴：连续值， 类目轴：离散值，时间轴：连续时序数据， 对数轴：对数数据) ['value', 'category', 'time', 'log']
            type: 'category',
            // 坐标轴两边留白策略（类目轴为Boolean，非类目轴为Array）
            boundaryGap: true,
            // 定义下方x轴数据名称
            data: (function () {
                // 加载10项时间数据，每项相隔20秒
                var now = new Date();
                var res = [];
                var len = 10;
                while (len--) {
                    // 格式化时间
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                    now = new Date(now - 1000);
                }
                return res;
            })()
        },
        {
            // 坐标轴类型(数值轴：连续值， 类目轴：离散值，时间轴：连续时序数据， 对数轴：对数数据) ['value', 'category', 'time', 'log']
            type: 'category',
            // 坐标轴两边留白策略（类目轴为Boolean，非类目轴为Array）
            boundaryGap: true,
            // 定义上方坐标轴数据名称
            data: (function () {
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(10 - len - 1);
                }
                return res;
            })()
        },
    ],
    // 直角坐标系 grid 中的 y 轴
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
    // 图表数据
    series: [
        // {
        //     name: '预购队列',
        //     // 定义图标类型
        //     /**
        //      * line: 折线图
        //      * bar: 柱状图
        //      * pie：饼图
        //      * scatter：散点图
        //      * effectScatter：涟漪特效散点图
        //      * radar：雷达图
        //      * tree：树图
        //      * treemap: 面积树图
        //      * sunburst： 旭日图
        //      * boxplot: 箱图
        //      * candlestick：K线图
        //      * heatmap：热力图
        //      * map：地图
        //      * parallel：平行坐标系
        //      * lines：带有起点和终点信息的线数据的绘制（航线图）
        //      * graph：关系图
        //      * sankey：桑基图（可看作是有向无环图）
        //      * funnel：漏斗图
        //      * gauge：仪表盘
        //      * pictorialBar：象形柱图
        //      * themeRiver：主题河流
        //      * custom: 自定义
        //      **/
        //     type: 'bar',
        //     // 对应的X轴数据项索引（默认为0）
        //     xAxisIndex: 1,
        //     // 对应的Y轴数据项索引（默认为0）
        //     yAxisIndex: 1,
        //     // 预购队列数据
        //     data: (function () {
        //         var res = [];
        //         var len = 10;
        //         while (len--) {
        //             res.push(Math.round(Math.random() * 1000));
        //         }
        //         return res;
        //     })()
        // },
        {
            name: '最新成交价',
            type: 'line',
            lineStyle: {
                color: "#11cff4"
            },
            symbol: 'none',
            // 最新成交价数据
            data: (function () {
                var res = [];
                var len = 0;
                while (len < 10) {
                    res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })(),
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
        }
    ]
};

// 首次绘制表格
myChart.hideLoading();
myChart.setOption(option);

var app = {
    count: 11,
}
// 定时生成新数据
setInterval(function () {
    // 格式化时间
    var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
    // 获取数据项
    var data0 = option.series[0].data;
    // var data1 = option.series[1].data;
    // 移除旧数据并生成新数据
    // data0.shift();
    // data0.push(Math.round(Math.random() * 1000));
    data0.shift();
    data0.push((Math.random() * 10 + 5).toFixed(1) - 0);
    // 移除旧数据项并生成新数据项
    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    // option.xAxis[1].data.shift();
    // option.xAxis[1].data.push(app.count++);
    // 应用配置
    myChart.setOption(option);
}, 1000);