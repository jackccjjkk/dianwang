
function polyline(map,pointArr,strokeColor){
    var trackPoint = [];
    for (var i = 0, j = pointArr.length; i < j; i++) {
        trackPoint.push(new BMap.Point(pointArr[i].lng, pointArr[i].lat));
    }
// 画线
    var polyline = new BMap.Polyline(trackPoint, {
        strokeColor: strokeColor,
        strokeWeight: 3,
        setStrokeStyle:"dashed",
        strokeOpacity: 1
    });
    map.addOverlay(polyline);
// 配置图片
    var size = new BMap.Size(22, 22);
    var offset = new BMap.Size(0, 0);
    var imageSize = new BMap.Size(200, 200);
// 画图标
//      for (var i = 0, j = trackPoint.length; i < j; i++) {
//          if(pointArr[i].icon!=""){
//              var icon = new BMap.Icon(pointArr[i].icon, size, {
//                  imageSize: imageSize,
//                  infoWindowAnchor:new BMap.Size(0, -3)
//              });
//             var marker = new BMap.Marker(trackPoint[i], {
//                  icon: icon,
//                  offset: offset
//              }); // 创建标注
//              map.addOverlay(marker);
//          //绑定事件
//          // marker.addEventListener("click",function () {
//          //     // alert(this.getPosition())
//          //     var point=this.getPosition();
//          //     alert("经度："+point.lng+"\n"+"纬度："+point.lat)
//          // })
//
//      }
//      }
}


function getZoom(map,points) {
    if (points.length > 0) {
        var maxLng = points[0].lng;
        var minLng = points[0].lng;
        var maxLat = points[0].lat;
        var minLat = points[0].lat;
        var res;
        for (var i = points.length - 1; i >= 0; i--) {
            res = points[i];
            if (res.lng > maxLng) maxLng = res.lng;
            if (res.lng < minLng) minLng = res.lng;
            if (res.lat > maxLat) maxLat = res.lat;
            if (res.lat < minLat) minLat = res.lat;
        }
    var zoom = ["50", "100", "200", "500", "1000", "2000", "5000", "10000", "20000", "25000", "50000", "100000", "200000", "500000", "1000000", "2000000"]; // 级别18到3。
    var pointA = new BMap.Point(maxLng, maxLat); // 创建点坐标A
    var pointB = new BMap.Point(minLng, minLat); // 创建点坐标B
    var distance = map.getDistance(pointA, pointB).toFixed(1); //获取两点距离,保留小数点后两位
    for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
        if (zoom[i] - distance > 0) {
            return 18 - i + 3; //之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
        }
    }
    }else
        {
            return 12
    }
}
// function setZoom(map,points) {
//
//     if (points.length > 0) {
//         var maxLng = points[0].lng;
//         var minLng = points[0].lng;
//         var maxLat = points[0].lat;
//         var minLat = points[0].lat;
//         var res;
//         for (var i = points.length - 1; i >= 0; i--) {
//             res = points[i];
//             if (res.lng > maxLng) maxLng = res.lng;
//             if (res.lng < minLng) minLng = res.lng;
//             if (res.lat > maxLat) maxLat = res.lat;
//             if (res.lat < minLat) minLat = res.lat;
//         }
//         var cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
//         var cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
//         var zoom = getZoom(map,maxLng, minLng, maxLat, minLat);
//
//         map.centerAndZoom(new BMap.Point(cenLng,cenLat), zoom);
//     } else {
//         //没有坐标，显示全中国
//         map.centerAndZoom(new BMap.Point(121.679122,38.935683), 12);
//     }
// }