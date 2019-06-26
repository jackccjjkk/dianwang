/*
 * 判断可信任站�?可信任站点可以为IP地址也可以为域名)
 */
    function checkSite(){
        if(navigator.userAgent.indexOf("MSIE") == -1){  
            alert("只支持IE浏览器！");
            return;
        }
        var hostname = window.location.hostname;
        var WshShell = new ActiveXObject("WScript.Shell");
        //IP的正则表达式
        var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
        //根据域名判断是否存在可信站点
        if(hostname != "localhost" && !reg.test(hostname)){
            var domainSFlag = false,domainEFlag = false,domainSEFlag = false,domainSSEFlag = true;
            var hostnamePrefix = "",hostnameSuffix = "";
            var indexOf = hostname.indexOf(".");
            if(indexOf != -1){
                hostnamePrefix = hostname.substring(0, indexOf);
                hostnameSuffix = hostname.substring(indexOf+1, hostname.length);
                try{
                    WshShell.RegRead("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\" + hostname + "\\http");    
                }catch(e){
                    domainEFlag = true;
                }
                if(domainEFlag){
                    try{
                        WshShell.RegRead("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\" + hostnameSuffix + "\\" + hostnamePrefix + "\\http");    
                    }catch(e){
                        domainSFlag = true;
                    }
                }
                //判断其合法�?
                if(domainEFlag && domainSFlag){
                    try{
                        WshShell.RegRead("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\" + hostnameSuffix + "\\" + hostnamePrefix + "\\*");    
                        var tipInfo = "<div>您加入的可信站点不是合法的可信站点，请以<span style='color:red;'>http://</span>开头！</div>";
                        alert(tipInfo);
                        return;
                    }catch(e){}
                }
            }else{
                try{
                    WshShell.RegRead("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\" + hostname + "\\http");    
                }catch(e){
                    domainSEFlag = true;
                }
                //判断其合法�?
                if(domainSEFlag){
                    try{
                        WshShell.RegRead("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\" + hostname + "\\*");    
                        var tipInfo = "<div>您加入的可信站点不是合法的可信站点，请以<span style='color:red;'>http://</span>开头！</div>";
                        alert(tipInfo);
                        return;
                    }catch(e){}
                }
            }
            if((domainSFlag && domainEFlag) || domainSEFlag){
               // var tipInfo = "域名(" + hostname + "),不是可信任站�?请手动加入可信任站点�?;
                var tipInfo = "本站点不是可信任站点,请手动加入可信任站点";
                alert(tipInfo);
                return;
            }
        }else{
            //获取可信任站点IP,数字2000没法解释，主要涉及到注册表的问题
            var str = [];  
            for(var i = 1;i < 2000;i++){ 
                try{
                    str[i] = WshShell.RegRead("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range" + i + "\\:Range");
                }catch(e){
                }
            }
            var count = true;
            for(var i = 1;i < str.length;i++){ 
                if(str[i] == undefined){
                    continue;
                }else{
                    if(str[i] == hostname){
                        count = false;
                        break;
                    }
                }
            }
            if(count){
                //var tipInfo = "IP " + hostname +  "不是可信任站�?请手动加入可信任站点�?;
                var tipInfo = "本站点不是可信任站点,请手动加入可信任站点";
                alert(tipInfo);   
                return
            }
        }
        //alert("存在可信任站点！");
    }



