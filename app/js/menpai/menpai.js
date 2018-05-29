import './modal';
import Order from '../tools/order';
const tpl = require('./menpai.html');
require('./custom.scss');
require('./menpai.scss');


/**验证邮箱格式
 * @param  {string} str 邮箱地址
 * @return {[type]}
 */
function testMail(str) {
	var mailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
	if (!mailreg.test(str)) {
		$("label.email").text("格式错误");
		return false;
	}
	$("label.email").text("");
	return true;
}

/**获取验证码按钮 设置倒计时显示
 * @param  {obj} $btn  显示按钮
 * @param  {int} count 倒计时
 * @return {[type]}
 */
function setTime($btn, count) {
	if (count === 0) {
		$btn.removeAttr("disabled");
		$btn.text("获取验证码");
		count = 60;
		return;
	} else {
		$btn.attr("disabled", "disabled");
		$btn.text("重新发送(" + count + "s)");
		count--;
	}
	window.setTimeout(function() {
		setTime($btn, count);
	}, 1000);
}
const App = function() {
	var btn = $(".content2 button"); //打开modal按钮
	var mps = $(".mplist"); //门派list
	var okBtn = $(".confirm"); //确认按钮
	var closeBtn = $(".close"); //一级关闭按钮
	var count = 60; // 倒计时
	var xsNum = 1000; //玄水宗预约人数
	var qyNum = 1000; //齐云派预约人数
	var clNum = 1000; //赤龙山预约人数
	var twNum = 1000; //天威府预约人数
	var type = 0; //门派类别
	//加载图片资源
	let imgArr = [];
	imgArr.push(require("../../images/mitem1red.png"));
	imgArr.push(require("../../images/mitem2red.png"));
	imgArr.push(require("../../images/mitem3red.png"));
	imgArr.push(require("../../images/mitem4red.png"));
	imgArr.push(require("../../images/msword1.png"));
	imgArr.push(require("../../images/msword2.png"));
	imgArr.push(require("../../images/msword3.png"));
	imgArr.push(require("../../images/msword4.png"));
	//打开门派模态框
	btn.click(function() {
		$("#myModal").modal({
			backdrop: 'static'
		});
	});
	//选择门派
	mps.click(function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if (target.nodeName.toLocaleLowerCase() == 'img') {
			switch (target.className) {
				case "xuanshui":
					if (target.getAttribute("src") == "./img/mitem1.png") {
						target.setAttribute("src", "./img/mitem1red.png");
						$(".qiyun").attr("src", "./img/mitem2.png");
						$(".chilong").attr("src", "./img/mitem3.png");
						$(".tianwei").attr("src", "./img/mitem4.png");
						type = 100;
					} else {
						target.setAttribute("src", "./img/mitem1.png");
						type = 0;
					}
					break;
				case "qiyun":
					if (target.getAttribute("src") == "./img/mitem2.png") {
						target.setAttribute("src", "./img/mitem2red.png");
						$(".xuanshui").attr("src", "./img/mitem1.png");
						$(".chilong").attr("src", "./img/mitem3.png");
						$(".tianwei").attr("src", "./img/mitem4.png");
						type = 200;
					} else {
						target.setAttribute("src", "./img/mitem2.png");
						type = 0;
					}
					break;
				case "chilong":
					if (target.getAttribute("src") == "./img/mitem3.png") {
						target.setAttribute("src", "./img/mitem3red.png");
						$(".xuanshui").attr("src", "./img/mitem1.png");
						$(".qiyun").attr("src", "./img/mitem2.png");
						$(".tianwei").attr("src", "./img/mitem4.png");
						type = 300;
					} else {
						target.setAttribute("src", "./img/mitem3.png");
						type = 0;
					}
					break;
				case "tianwei":
					if (target.getAttribute("src") == "./img/mitem4.png") {
						target.setAttribute("src", "./img/mitem4red.png");
						$(".xuanshui").attr("src", "./img/mitem1.png");
						$(".qiyun").attr("src", "./img/mitem2.png");
						$(".chilong").attr("src", "./img/mitem3.png");
						type = 400;
					} else {
						target.setAttribute("src", "./img/mitem4.png");
						type = 0;
					}
					break;
			}
		}

		//更改描述文字
		var $li = $(target).parents("li");
		var index = $li.index();
		$("div.descbox>p").eq(index).show().siblings().hide();
	});

	//确认提交门派
	okBtn.click(function() {
		//4个图片的名字中没有red时，alert提示
		var name1 = $(".xuanshui").attr("src");
		var name2 = $(".qiyun").attr("src");
		var name3 = $(".chilong").attr("src");
		var name4 = $(".tianwei").attr("src");
		var names = name1 + name2 + name3 + name4;
		var patt = new RegExp("red");
		if (!patt.test(names)) {
			alert("少俠不要著急，请先挑選門派");
			return;
		}
		closeBtn.click();
		$("#email").modal({
			backdrop: 'static'
		});
	});

	//发送验证码、预约
	(function() {
		var $email = $("input[name='emailbox']"); //邮箱输入框
		var $code = $("input[name='code']"); //验证码输入框
		var $getcode = $(".getcode"); //验证码按钮
		var $submit = $(".submit"); //提交按钮
		var order = new Order(11203, true); //order实例	
		var $close = $(".close_email"); //验证页面关闭按钮
		$email.focus(function() { //输入框聚焦失焦判断邮箱格式
			$("label.email").text("");
		}).blur(function() {
			if ($email.val()) {
				testMail($email.val());
			}
		});
		$code.focus(function() { //验证码框聚焦失焦判断
			$("label.code").text("");
		}).blur(function() {
			$("label.code").text("");
		});
		$getcode.click(function() {
			var content = $email.val(); //输入的邮箱地址
			if (!testMail(content)) { //验证邮箱
				return false;
			}

			order.sendVcode(2, content, function(res) {
				//发送成功
				setTime($getcode, count);
			}, function(res) {
				//发送失败
				switch (res.errcode) {
					case -2:
						$("label.email").text("格式错误");
						break;
					case -3:
						$("label.email").text("该邮箱已预约");
						break;
				}
			});
		});
		$submit.click(function() { //提交预约
			var content = $email.val(); //输入的邮箱地址
			var codecontent = $code.val(); //输入的验证码
			if (!content) { //邮箱为空，返回
				$("label.email").text("请输入邮箱");
				return;
			}
			if (!testMail(content)) { //邮箱格式不正确
				$("label.email").text("格式错误");
				return;
			}
			if (!codecontent) { //验证码为空，返回
				$("label.code").text("请输入验证码");
				return;
			}

			order.gameOrder(content, codecontent, 2, 0, type, function(res) { //预约
				alert("恭喜您,预约成功！");
				$close.click();
				$email.val("");
				$code.val("");
			}, function(res) {
				switch (res.errcode) {
					case -4:
						// 验证码错误
						$("label.code").text("验证码错误");
						break;
					case -3:
						//账号已预约
						$("label.email").text("该邮箱已预约");
						break;
				}
			});
		});
	})();

	//获取预约人数
	(function() {
		var xs = 0, //玄水宗人数
			qy = 0, //齐云派人数
			cl = 0, //赤龙山人数
			tw = 0, //天威府人数
			xs_percent = 0,
			qy_percent = 0,
			cl_percent = 0,
			tw_percent = 0;
		var order = new Order(11203, true);
		var $xsoverlay = $(".xs");
		var $qyoverlay = $(".qy");
		var $cloverlay = $(".cl");
		var $twoverlay = $(".tw");
		order.getOrderPerson(function(res) { //获取预约人数
			xs = res.person[100];
			qy = res.person[200];
			cl = res.person[300];
			tw = res.person[400];
			if (xs === undefined) {
				xs = 0;
			} else if (xs > xsNum) {
				xs = xsNum;
			}
			if (qy === undefined) {
				qy = 0;
			} else if (qy > qyNum) {
				qy = qyNum;
			}
			if (cl === undefined) {
				cl = 0;
			} else if (cl > clNum) {
				cl = clNum;
			}
			if (tw === undefined) {
				tw = 0;
			} else if (tw > twNum) {
				tw = twNum;
			}
			var sum = xs + qy + cl + tw;
			xs_percent = xs / xsNum;
			qy_percent = qy / qyNum;
			cl_percent = cl / clNum;
			tw_percent = tw / twNum;
			$xsoverlay.css("top", 83 * (1 - xs_percent) + "px");
			$qyoverlay.css("top", 83 * (1 - qy_percent) + "px");
			$cloverlay.css("top", 83 * (1 - cl_percent) + "px");
			$twoverlay.css("top", 83 * (1 - tw_percent) + "px");
			if (sum >= 1000 && sum < 2000) {
				$(".sword").css("background-image", "url(../img/msword1.png)");
			}
			if (sum >= 2000 && sum < 3000) {
				$(".sword").css("background-image", "url(../img/msword2.png)");
			}
			if (sum >= 3000 && sum < 4000) {
				$(".sword").css("background-image", "url(../img/msword3.png)");
			}
			if (sum >= 4000) {
				$(".sword").css("background-image", "url(../img/msword4.png)");
			}
		}, function(res) {

		});
	})();
};

export default {
	tpl,
	App
}