$(document).ready(function() {


// 淘宝新闻 tab

	$(".right-tab>li").each(function(i) {
		$(this).mouseover(function() {
			$(".right-tab>li").each(function() {
				$(this).css({
					"border": "none"
				})
			})

			$(this).css({
				"borderBottom": "solid 2px #ff4400"
			})

			$(".right-tab ul li").each(function() {
				$(this).css({
					"display": "none"
				})
			})

			$($(".right-tab ul li")[i]).css({
				"display": "block"
			})
		})
	})


//搜索框 tab 点击与 hover 效果

	$(".search-tab>li").each(function(i){
		if(i!=0){
			this.flag=true	
		}else{
			this.flag=false
		}
		
		$(this).click(function(index){
			index=i
			$(".search-tab>li").each(function(){
				$(this).css({"backgroundColor":"#fff","color":"#f40"})
				$("#submit").css({"background-color":"#f40"})
				$("#text").css({"border-color":"#f40"})
				this.flag=true
			})

			if(index==1){
				$(this).css({"backgroundColor":"#c40000","color":"#fff"})
				$("#submit").css({"background-color":"#c40000"})
				$("#text").css({"border-color":"#c40000"})
				this.flag=false;
			}else{
				$(this).css({"backgroundColor":"#f40","color":"#fff"})
				this.flag=false;
			}

		})

		$(this).mouseover(function(index){
			index=i;
			if(index==1){
				if(this.flag){
					$(this).css({"background-color":"rgba(196,0,0,0.4)"})	
				}
			}else{
				if(this.flag){
					$(this).css({"background-color":"rgba(255,68,0,0.4)"})
				}
			}
		})
		$(this).mouseout(function(i){
				if(this.flag){
					$(this).css({"background-color":"#fff","color":"#f40"})	
				}
		})
	})




// 中部效果
	$(".componentan a").each(function(index) {
		$(this).mouseover(function() {
			$("span", this).css({
				"color": "#f40"
			});
		})
		$(this).mouseout(function() {
			$("span", this).css({
				"color": "gray"
			});
			$("span:eq(0)", this).css({
				"color": "#222"
			});
		})
	})


// 淘宝新闻轮播
	setInterval(function() {
		var ora = parseInt($(".hot-news ul").css("top"));
		if (ora <= -213) {
			$(".hot-news ul").animate({
				"top": 0 + "px"
			})
		} else {
			$(".hot-news ul").animate({
				"top": ora - 71
			})
		}

	}, 2000)

	$(".cover").each(function(i){
		$(this).mouseover(function(event){
			$(this).css({"opacity":"1"})
		})
	})
	$(".cover").each(function(i){
		$(this).mouseout(function(event){
			$(this).css({"opacity":"0"})
		})
	})


	//运动框架
	function domove(obj, json, fn) {
		clearInterval(obj.timer);
		obj.timer = setInterval(
			function() {
				var flag = true;
				for (var attr in json) {
					var iCur = parseInt(getStyle(obj, attr));
					var iSpeed = (json[attr] - iCur) / 3;
					iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
					if (iSpeed != 0) {
						flag = false
					}
					obj.style[attr] = (iCur + iSpeed) + "px";
				}
				if (flag) {
					clearInterval(obj.timer);
					if (fn) {
						fn()
					}
				}
			}, 20
		);
	}

	//获取元素样式
	function getStyle(obj, attr) {
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
	}

	// 焦点图
	var oPre = document.getElementById("pre"),
		oNext = document.getElementById("next"),
		oBox = document.getElementById("box"),
		oUl = document.querySelector("#box ul"),
		index = 1,
		flag = false,
		oSpans = document.getElementById("spans"),
		timer;


	for (var i = 0; i < oSpans.children.length; i++) {

		oSpans.children[i].onclick = function() {
			if (flag) {
				return
			}

			flag = true;

			for (var i = 0; i < oSpans.children.length; i++) {
				oSpans.children[i].removeAttribute("class");
			}

			this.className = "on";

			var distance = (parseInt(this.getAttribute("index")) - index) * 520;
			//alert(this.getAttribute("index"))
			domove(oUl, {
				"marginLeft": parseInt(getStyle(oUl, "marginLeft")) - distance
			}, function() {
				flag = false;
			})

			index = this.getAttribute("index");
		}
	}



	oNext.onclick = function() {

		if (flag) {
			return;
		} else {

			index++;

			if (index > 5) {
				index = 1;
			}

			for (var i = 0; i < oSpans.children.length; i++) {
				oSpans.children[i].removeAttribute("class");
				oSpans.children[index - 1].className = "on";
			}

			forward();
		}

		function forward() {
			flag = true;

			var distance = parseInt(getStyle(oUl, "marginLeft"));

			if (distance <= -3120) {
				oUl.style.marginLeft = -520 + "px";
				flag = false
			} else {
				domove(oUl, {
					"marginLeft": distance - 520
				}, function() {
					var distance = parseInt(getStyle(oUl, "marginLeft"));
					if (distance <= -3120) {
						oUl.style.marginLeft = -520 + "px";
						flag = false
					}

					flag = false;
				});
			}
		}
	}



	oPre.onclick = function() {
		if (flag) {
			return;
		} else {
			index--;
			if (index < 1) {
				index = 5
			}

			for (var i = 0; i < oSpans.children.length; i++) {
				oSpans.children[i].removeAttribute("class");
				oSpans.children[index - 1].className = "on";
			}

			backward();
		}

		function backward() {
			flag = true;
			var distance = parseInt(getStyle(oUl, "marginLeft"));
			if (distance >= 0) {
				oUl.style.marginLeft = -2600 + "px";
				flag = false
			} else {

				domove(oUl, {
					"marginLeft": distance + 520
				}, function() {
					var distance = parseInt(getStyle(oUl, "marginLeft"));
					if (distance >= 0) {
						oUl.style.marginLeft = -2600 + "px";
						flag = false
					}
					flag = false;
				});
			}
		}
	}

	oBox.onmouseout = function() {
		timer = setInterval(function() {
			oNext.onclick();
		}, 4000)
	}

	oBox.onmouseover = function() {
		clearInterval(timer);

	}

	oBox.onmouseout();


// 焦点图 end


// 小焦点图


	$(".banner2 li").each(function(i) {
		$(this).css({
			"left": i * 520 + "px"
		})
	})

	setInterval(function() {
		var newLi = $(".banner2 li")[0].cloneNode(true); //复制第一个li元素

		$(".banner2")[0].removeChild($(".banner2")[0].children[0]);
		$(".banner2")[0].appendChild(newLi);
		$(".banner2 li:eq(4)").css({
			"left": 2600 + "px"
		});
		$(".banner2 li").each(function() {
			var distance = parseInt($(this).css("left")) - 520;
			$(this).animate({
				"left": distance + "px"
			}, 500)
		})


	}, 5000)

})