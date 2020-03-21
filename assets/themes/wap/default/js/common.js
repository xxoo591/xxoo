var nav_show = false;	

$(document).ready(function(){
	$(".nav_toggle_button").click(function(){
		if(nav_show){
			nav_show = false;
			$(".m_hide").hide();
			$(".nav_toggle_button").html('<div>点击展开全部分类<span></span></div>');
		}else{
			nav_show = true;
			$(".m_hide").show();
			$(".nav_toggle_button").html('<div>点击收回全部分类<span class="unfolded"></span></div>');
		}
	});

	$("#wd").bind('search', function () {search();});

});

function openSearch(){
	$("#bar").removeClass('title_show');
	$("#bar").addClass('title_hide');
	$("#search").removeClass('title_hide');
	$("#search").addClass('title_show');
	$("#wd").focus();
}

function closeSearch(){
	$("#search").removeClass('title_show');
	$("#search").addClass('title_hide');
	$("#bar").removeClass('title_hide');
	$("#bar").addClass('title_show');
}

function search(){
	var value = $("#wd").val();
	if(value != ''){
		window.location.href = '/wap/search.html?wd=' + value;
	}
}