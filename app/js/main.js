import 'jquery';
import banner from './banner/banner';
import menpai from './menpai/menpai';
import swiper from './swiper/swiper';
import video from './video/video';
import news from './news/new';
import back from './backbtn/back';
import footer from './footer/footer';
require("../css/reset.scss");

$(function() {
	$("#wrap").append($(back.tpl));
	back.init();
	$("#wrap").append($(banner.tpl));
	$("#wrap").append($(menpai.tpl));
	menpai.App();
	$("#wrap").append($(swiper.tpl));
	swiper.init();
	$("#wrap").append($(video.tpl));
	$("#wrap").append($(news.tpl));
	news.init();
	$("#wrap").append($(footer.tpl));
});