
$(document).ready(function(){
	var tgprotocol="https:";
	if(window.location.protocol.toLowerCase()!=tgprotocol){
		window.location.href=tgprotocol+window.location.href.substring(window.location.protocol.length)
	}else{
		chkClient();
	}
});

function pushBaidu(){
	var bp = document.createElement('script');
	bp.src = 'http://push.zhanzhang.baidu.com/push.js';
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(bp, s);
}

function getUrlParam(name) {
	// 取得url中?后面的字符
	var query = window.location.search.substring(1);
	// 把参数按&拆分成数组
	var param_arr = query.split("&");
	for (var i = 0; i < param_arr.length; i++) {
		var pair = param_arr[i].split("=");
		if (pair[0] == name) {
			return pair[1];
		}
	}
	return '';
}

function chkClient(){
	var strs = window.location.pathname.split("/"); //字符分割
	var urlstr = '';
	var ctype = 'pc';
	if(strs.length > 2){
		for (i=2; i<strs.length; i++ ){
			urlstr += "/" + strs[i]; //分割后的字符输出
		};
		ctype = strs[1].toLowerCase();
		if(IsWap()){
			if(ctype != 'wap'){
				window.location.href = '/wap' + urlstr;
				return;
			}
		}else if(IsApp()){
			if(ctype != 'app'){
				window.location.href = '/app' + urlstr;
				return;
			}
		}else if(ctype != 'pc'){
			window.location.href = '/pc' + urlstr;
			return;
		}
	}else{
		urlstr = '/main/index.html';
		ctype = 'pc';
		if(IsWap()){
			ctype = 'wap';
		}else if(IsApp()){
			ctype = 'app';
		}
	}

	var param = getUrlParam("p");


	$.ajax({
		type : "GET",
		dataType: "json",
		url : "/cache/" + ctype + urlstr + '?v=' + client_Version + '&p=' + param,
		success : function(result) {
			if(result.status){
				window.location.href = window.location.pathname + '?p=' + result.version;
			}
		}
	});
}

function getLocation(){
    var arr = document.domain.split('.');
    if(arr.length === 2){
        return document.domain;
    }
    if(arr.length > 2 && arr[0] !== 'www'){
      return arr.slice(1).join('.')
    } 
    return arr.slice(1).join('.') 
}

function IsWap(){
	var str = /(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|iphone|ipad|ipod|android|xoom|miui|avapp)/i;
	if(str.test(navigator.userAgent)){
		return true;
	}
	return false;
}

function IsApp(){
	var str = /(avapp)/i;
	if(str.test(navigator.userAgent)){
		return true;
	}
	return false;
}

function IsPc(){
	if(IsApp() || IsWap()){
		return false;
	}else{
		return true;
	}
}