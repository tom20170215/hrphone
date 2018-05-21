const tpl = require('./new.html');

require('./new.scss');

export default {
	tpl,
	init: function() {
		var $newbox = $(".newbox");
		var iwidth = parseInt($newbox.width());
		var iheight = parseInt($newbox.height());
		var $iframe = $("<iframe/>");
		$iframe.attr("src", "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=" + iwidth + "&height=" + iheight + "&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId");
		$iframe.attr("width", iwidth).attr("height", iheight).attr("style", "border:none;overflow:hidden").attr("scrolling", "no").attr("frameborder", "no").attr("allowTransparency", "true").attr("allow", "encrypted-media");
		$newbox.append($iframe);
	}
};