var SERVER_PATH = "data/";
var myDate = new Date();
var dateStr = myDate.getFullYear() + "年" + (myDate.getMonth() + 1) + "月"+ myDate.getDate() + "日";
$("#currentDate").text(dateStr);
function ajaxPost(url, param, success, error, showProgress) {
    if (typeof (showProgress) == 'undefined' || showProgress) {
        showLoading();
    }
    jQuery.ajax({
        url: SERVER_PATH + url,
        type: 'POST',
        timeout: 60000, // 超时时间设置，单位毫秒
        data: JSON.stringify(param),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: eval(function (data) {
            if (typeof (showProgress) == 'undefined' || showProgress) {
                hideLoading();
            }
            success(data);
        }),
        error: eval(function (data) {
            if (typeof (showProgress) == 'undefined' || showProgress) {
                hideLoading();
            }
            if (typeof (shadeFlag) == 'undefined' || shadeFlag) {
                // TODO 隐藏进度条
            }
            if (data.responseText == "login") {
                showAlert("登录过期，请重新登录。", "提示", function () {
                    window.location.href = "login.html";
                })
            }
            error(data);
        })
    });
}

function showLoading() {
    //$("#subLoading").show();
    $("body").mLoading("show");
}

function hideLoading() {
    //$("#subLoading").hide();
    $("body").mLoading("hide");
}

var isShow = false;
function showBottomPopup() {
    if(isShow){
        hideBottomPopup();
        setTimeout(function () {
            $('.content-bottom').css('bottom', '0');
            isShow = true;
        },1500)
    }else{
        setTimeout(function () {
            $('.content-bottom').css('bottom', '0');
            isShow = true;
        },1000)

    }

}

function hideBottomPopup() {
    $('.content-bottom').css('bottom', '-200px');
    isShow = false;
}

