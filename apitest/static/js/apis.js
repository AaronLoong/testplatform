//界面toast提示
/*使用方法 Toast('这是一个弹框',2000)*/
function Toast(msg, duration) {
	duration = isNaN(duration) ? 3000 : duration;
	let m = document.createElement('div');
	m.innerHTML = msg;
	m.style.cssText = "font-family:yuan;max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
	document.body.appendChild(m);
	setTimeout(function() {
		let d = 0.5;
		m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
		m.style.opacity = '0';
		setTimeout(function() {
			document.body.removeChild(m)
		}, d * 1000);
	}, duration);
}


function open_comment(id) {   //打开评论内容输入栏
	document.getElementById('comment_value').value = '';
	$.get('/get_comment/', {
		'api_id': id,
	}, function (ret){
		document.getElementById('comment').style.display = 'block';
		document.getElementById('which_api').value = id;
		document.getElementById('comment_value').value = ret;
	})
}


function cancel_comment() {  //取消评论
	document.getElementById('comment').style.display = 'none';
}


function save_comment() {  //保存评论
	let id = document.getElementById('which_api').value;
	let comment_value = document.getElementById('comment_value').value;
	$.get('/save_comment/', {
		'api_id': id,
		'comment_value': comment_value
	}, function (ret){
		document.getElementById('comment').style.display = 'none'
		console.log('此处返回的内容为---->' + ret)
	})
}


// 打开调试功能
function open_debug() {
	document.getElementById('debug').style.display = 'block';
}


// 调试的取消功能
function cancel_debug(){
	document.getElementById('debug').style.display = 'none';
}


function save_debug() {
	// 获取所有接口设置数据
	let debug_method = document.getElementById('debug_method').value;
	let debug_url = document.getElementById('debug_url').value;
	let debug_host = document.getElementById('debug_host').value;
	let debug_header = document.getElementById('debug_header').value;
	// console.log(
	// 	'当前请求方式为：' + debug_method,
	// 	'当前请求接口为：' + debug_url,
	// 	'当前请求服务器为：' + debug_host,
	// 	'当前请求头为：' + debug_header
	// )
	// Toast('提示：当前你调试的接口信息为->' + debug_method+debug_url+debug_host+debug_header, 10000)  // toast弹窗查看内容
	let debug_body_method = $('ul#myTab li[class="active"]')[0].innerText;
	console.log(debug_body_method)
}
