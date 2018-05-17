import 'jquery';
import banner from './banner/banner';
import menpai from './menpai/menpai';
require("../css/reset.scss");

$(function(){
	$("#wrap").append($(banner.tpl));
	$("#wrap").append($(menpai.tpl));
});