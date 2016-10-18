window.onload = function() {
	//容器对象
	var box = document.getElementById("box");
	var imgs = box.getElementsByTagName("img");
	//单张图片的宽度
	var imageWidth = imgs[0].offsetWidth;
	//设置掩盖门体露出的宽度
	var exposeWidth = 160;
	//设置容器总宽度
	var boxWidth = imageWidth + exposeWidth * (imgs.length - 1);
	box.style.width = boxWidth + "px";
	//设置每道门 的初始位置
	function setImgsPos() {
		for(var i=1,len=imgs.length; i<len; i++) {
			imgs[i].style.left = imageWidth + exposeWidth * (i - 1) + "px";  
		}
	}
	setImgsPos();
	//缓冲
	function startMove(obj, iTarget) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			var speed = (iTarget - obj.offsetLeft)/10;
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			if(obj.offsetLeft == iTarget) {
				clearInterval(obj.timer);
			} else {
				obj.style.left = obj.offsetLeft + speed +"px";	
			}
		} ,30);
	}
	//计算每道门打开时应移动的距离
	var translate = (imageWidth - exposeWidth);
	//为每道门邦定事件
	for(var i=0,len=imgs.length; i<len; i++) {
		//匿名函数获取不同的i值
		(function(i) {
			imgs[i].timer = null;
			imgs[i].onmouseover = function() {
				for(var j=1; j<=i; j++) {
					var iTarget = (imageWidth + exposeWidth * (j - 1) - translate); 
					startMove(imgs[j], iTarget);
					//如果想只是单张移动，如下：
//					startMove(this, iTarget);
				}
			}
			imgs[i].onmouseout = function() {
				for(var j=1; j<=i; j++) {
					var iTarget = (imageWidth + exposeWidth * (j - 1)); 
					startMove(imgs[j], iTarget);
					//如上，单张：
//					startMove(this, iTarget);
				}
			}
		})(i)
	}
}
