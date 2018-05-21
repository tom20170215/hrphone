const tpl = require('./back.html');

require('./back.scss');

export default{
	tpl,
	init:function(){

		$(window).scroll(function(){
			//当滚动条距离顶部超过100像素，按钮显示，否则消失
			if ($(window).scrollTop() > 100) {
				$(".bg").fadeIn(1500);
			}else{
				$(".bg").fadeOut(1500);
			}
		});
		//当点击按钮后，回到页面顶部
		$(".back-to-top").click(function(){
			console.log('click');
			if ($('html').scrollTop()) {
				$('html').animate({
					scrollTop:0
				},1000);
				return false;
			}
			$('body').animate({
				scrollTop:0
			},1000);
			return false;
		});
	}
}