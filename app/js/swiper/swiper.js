import Swiper from 'swiper';
const tpl = require('./swiper.html');
require('./swiper.scss');

export default{
	tpl,
	init:function(){
		var myswiper = new Swiper('.swiper-container', {
			autoplay: true,
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				bulletClass:'black',
				bulletActiveClass:'red',
				clickable:true,
				clickableClass:'my-pagination-clickable'
			}
		});
	}
};