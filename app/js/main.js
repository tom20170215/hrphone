import 'jquery';
import banner from './banner/banner';
import menpai from './menpai/menpai';
import swiper from './swiper/swiper';
import video from './video/video';
import news from './news/new'; 
require("../css/reset.scss");

$(function(){
	$("#wrap").append($(banner.tpl));
	$("#wrap").append($(menpai.tpl));
	menpai.App();
	$("#wrap").append($(swiper.tpl));
	swiper.init();
	$("#wrap").append($(video.tpl));
	$("#wrap").append($(news.tpl));
});