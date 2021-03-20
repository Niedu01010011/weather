
isweb();
function getdate() {
	var date = new Date();

	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var minute = date.getMinutes();
	minute = minute < 10 ? "0" + minute : minute;
	var s = date.getSeconds();
	s = s < 10 ? "0" + s : s;
	var str = y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + s;

	return str;
}
document.getElementById('datetime').innerHTML = getdate();
setInterval("document.getElementById('datetime').innerHTML=getdate();", 1000);

function showLocation(data) {
	//输出本地城市
	var city;
	city = data.content.address_detail.city;
	document.getElementById("city").innerHTML = city;

	//获取天气信息
	$.ajax({
		//天气api接口
		url: 'https://tianqiapi.com/api?version=v6&appid=78866994&appsecret=W7fgQ3RY' + city,
		data: 'version=v6&style=1001',
		dataType: 'JSON',
		success: function (data) {
			document.getElementById("wea").innerHTML = data.wea;
			// 给天气状况添加图片
			switch (data.wea) {
				case "多云":
					document.getElementById("image").setAttribute("src", "img/duoyun.png");
					break;
				case "晴":
					document.getElementById("image").setAttribute("src", "img/qing.png");
					break;
				case "雨":
					document.getElementById("image").setAttribute("src", "img/yu.png");
					break;
				case "雪":
					document.getElementById("image").setAttribute("src", "img/xue.png");
					break;
				case "阴":
					document.getElementById("image").setAttribute("src", "img/yin.png");
					break;
				case "雷":
					document.getElementById("image").setAttribute("src", "img/lei.png");
					break;
			}
			document.getElementById("temperature").innerHTML = data.tem + "℃";
			document.getElementById("wet").innerHTML = "湿度" + " " + data.humidity;
			document.getElementById("qiya").innerHTML = "气压" + " " + data.pressure;
			document.getElementById("wind").innerHTML = "风力" + " " + data.win_speed;
			document.getElementById("air_level").innerHTML = data.air_level;
			document.getElementById("htem").innerHTML = data.tem1 + "℃";
			document.getElementById("ltem").innerHTML = data.tem2 + "℃";
		}
	});
}

function isweb() {
	//判断是否联网
	if (window.navigator.onLine == true) {
		//地址api接口
		$.getScript("http://api.map.baidu.com/location/ip?ak=1lGne0FvPuUGsuzI3YZsC38iAKAMuuoK&callback=showLocation");
	} else {
		document.getElementById("city").innerHTML = "未连入网络!";
		document.getElementById("wea").innerHTML = "晴";
		document.getElementById("image").setAttribute("src", "img/qing.png");
		document.getElementById("temperature").innerHTML = "999℃";
	}
}



