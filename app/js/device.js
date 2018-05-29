if (/Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent)) { //检测移动端
	window.location.href = "https://www.hanren.com/";
} else { //否则是电脑端
	window.location.href = "https://hanren.com/m";
}



