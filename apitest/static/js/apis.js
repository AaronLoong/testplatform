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


function open_debug(id, api_name) {
	// 打开调试功能
	clear_debug_content();
	document.getElementById('debug').style.display = 'block';
	document.getElementById('debug_api_id').innerText = id;
	$.get('/get_api_data/', {
		'debug_api_id': id,
	}, function (ret){
		console.log(ret)
		// 接收返回值之后的操作
		document.getElementById('debug_api_name').value = ret.api_name;
		document.getElementById('debug_method').value = ret.api_method;
		document.getElementById('debug_url').value = ret.api_url;
		document.getElementById('debug_host').value = ret.api_host;
		document.getElementById('debug_header').value = ret.api_header;
		// 请求体编码格式
		// TODO: 此处存在bug，点击「调试」无法定位到对应的请求体编码方式，待修改
		let body_method = '#' + ret.api_body_method;
		console.log(body_method)
		$("li a[href=" + body_method + "]").click();
		// 请求体显示
		if (ret.api_body_method === 'Text'){
			document.getElementById('raw_Text').value = ret.api_body;
		}
		if (ret.api_body_method === 'JavaScript'){
			document.getElementById('raw_JavaScript').value = ret.api_body;
		}
		if (ret.api_body_method === 'Json'){
			document.getElementById('raw_Json').value = ret.api_body;
		}
		if (ret.api_body_method === 'Html'){
			document.getElementById('raw_Html').value = ret.api_body;
		}
		if (ret.api_body_method === 'Xml'){
			document.getElementById('raw_Xml').value = ret.api_body;
		}
		if (ret.api_body_method === 'form-data'){
			const tbody = document.getElementById('mytbody'); // 定位表格中的tbody部分
    		body = eval(ret.api_body); //把这个像列表的字符串请求体变成真正的列表
    		for(let i = 0; i < body.length; i++){ // 遍历这个请求体列表
				key = body[i][0]; //拿出每一个键值对的key
				value = body[i][1];//拿出每一个键值对的value
				const childs_tr = tbody.children;//获取到这个表格下面所有的tr组成的大列表
				// 每个tr下的children得到的是 td列表，只有俩个。
				childs_tr[i].children[0].innerText = key; //第一个td放key
				childs_tr[i].children[1].innerText = value;//第二个td放value
				//判断是否是最后一次遍历，来决定是否点击新增参数按钮
				if(i < body.length-1){
					document.getElementById('add').click()
        		}
    		}
		}
	})
}


function cancel_debug(){
	// 调试的取消功能
	// document.getElementById('debug').style.display = 'none';
	document.location.reload();
}

function clear_debug_content(){
	// 清除调试请求内容
	document.getElementById('debug_api_id').innerText = '';
	document.getElementById('debug_api_name').innerText = '';
	document.getElementById('debug_method').value = 'none';
	document.getElementById('debug_url').value = '';
	document.getElementById('debug_host').value = '';
	document.getElementById('debug_header').value = '{}';
	// 初始化请求体编码格式部分
	document.getElementById('click_none').click();
	document.getElementById('mytbody').innerHTML = '<tr><td></td><td></td></tr>';
	document.getElementById('mytbody2').innerHTML = '<tr><td></td><td></td></tr>';
	document.getElementById('raw_Text').value = '';
	document.getElementById('raw_Json').value = '';
	document.getElementById('raw_Html').value = '';
	document.getElementById('raw_JavaScript').value = '';
	document.getElementById('raw_Xml').value = '';
	// 清空返回体相关内容
	document.getElementById('debug_response_body').value = '';
	$('#mytable').SetEditable({
		$addButton: $('#add'),
		// $deleteButton: $('#add'),
	});
	$('#mytable_1').SetEditable({
		$addButton: $('#add_1'),
		// $deleteButton: $('#add'),
	});
}

function save_debug() {
	// 获取所有接口设置数据
	let debug_api_name = document.getElementById('debug_api_name').value;
	let debug_method = document.getElementById('debug_method').value;
	let debug_url = document.getElementById('debug_url').value;
	let debug_host = document.getElementById('debug_host').value;
	let debug_header = document.getElementById('debug_header').value;

	// 判断顶部的数据是否填写完善
	if(debug_api_name === ''){
		alert('请输入接口名称~');
		return
	}
	if(debug_method === ''){
		alert('请输入请求方式~');
		return
	}
	if(debug_url === ''){
		alert('请输入请求url~');
		return
	}
	if(debug_host === ''){
		alert('请输入请求host~');
		return
	}

	// 判断关键数据是否符合规则
	if(debug_url.slice(0,7) != 'http://' && debug_url.slice()){

	}
	console.log(
		'当前请求方式为：' + debug_method,
		'当前请求接口为：' + debug_url,
		'当前请求服务器为：' + debug_host,
		'当前请求头为：' + debug_header
	)
	let debug_body_method = $('ul#myTab li[class=active]')[0].innerText;
	// let debug_api_body = ''
	if (debug_body_method === 'none'){
		let debug_api_body = ''
	}
	if (debug_body_method === 'form-data'){
		let debug_api_body = [];
		let tbody_ = $('table#mytable tbody')[0];  // 获取表格的数据内容
		let tr_list = tbody_.children;  // 获取所有tr，每个tr就是一个键值对
		for (let i=0; i < tr_list.length; i++){
			let td_arr = tr_list[i].children;  // 获取tr下的两个td
			let key  = td_arr[0].innerText;  // 获取key
			let value = td_arr[1].innerText;  // 获取value
			debug_api_body.push([key, value]);  // 存放在更大的数组中
		}
		debug_api_body = JSON.stringify(debug_api_body);
		console.log(debug_api_body)
	}
	if (debug_body_method === 'x-www-form-urlencoded'){
		let debug_api_body = [];
		let tbody_ = $('table#mytable_1 tbody')[0];  // 获取表格的数据内容
		let tr_list_1 = tbody_.children;  // 获取所有tr，每个tr就是一个键值对
		for (let i=0; i < tr_list_1.length; i++){
			let td_arr = tr_list_1[i].children;  // 获取tr下的两个td
			let key  = td_arr[0].innerText;  // 获取key
			let value = td_arr[1].innerText;  // 获取value
			debug_api_body.push([key, value]);  // 存放在更大的数组中
		}
		debug_api_body = JSON.stringify(debug_api_body);  // 数组转换成字符串
		console.log(debug_api_body)
	}
	if (debug_body_method === 'Text'){
		let debug_api_body = document.getElementById('raw_Text').value;
	}
	if (debug_body_method === 'JavaScript'){
		let debug_api_body = document.getElementById('raw_JavaScript').value;
	}
	if (debug_body_method === 'Json'){
		let debug_api_body = document.getElementById('raw_Json').value;
	}
	if (debug_body_method === 'Html'){
		let debug_api_body = document.getElementById('raw_Html').value;
	}
	if (debug_body_method === 'Xml'){
		let debug_api_body = document.getElementById('raw_Xml').value;
	}
	let api_id = document.getElementById('debug_api_id').innerText;  // 获取接口id

	$.get('/save_api/',{
		'api_id': api_id,
		'debug_api_name': debug_api_name,
		'debug_body_method': debug_body_method,
		'debug_url': debug_url,
		'debug_host': debug_host,
		'debug_header': debug_header,
		'debug_method': debug_method,
		'debug_api_body': debug_api_body
		}, function (ret) {
			console.log(ret)
			document.location.reload();
			document.getElementById('debug').style.display = 'none';
		}
	)
}

function debug_send() {
	// 获取所有接口设置数据
	let debug_api_name = document.getElementById('debug_api_name').value;
	let debug_method = document.getElementById('debug_method').value;
	let debug_url = document.getElementById('debug_url').value;
	let debug_host = document.getElementById('debug_host').value;
	let debug_header = document.getElementById('debug_header').value;
	console.log(
		'当前请求方式为：' + debug_method,
		'当前请求接口为：' + debug_url,
		'当前请求服务器为：' + debug_host,
		'当前请求头为：' + debug_header
	)

	// 判断顶部的数据是否填充完
	if(debug_method === 'none'){
		alert('请选择请求方式~');
		return
	}
	if(debug_url === ''){
		alert('请输入请求url~');
		return
	}
	if(debug_host === ''){
		alert('请输入请求host~');
		return
	}
	let debug_body_method = $('ul#myTab li[class="active"]')[0].innerText;
	let debug_api_body = ''
	if (debug_body_method === 'none'){
		let debug_api_body = ''
	}
	if (debug_body_method === 'form-data'){
		let debug_api_body = [];
		let tbody_ = $('table#mytable tbody')[0];  // 获取表格的数据内容
		let tr_list = tbody_.children;  // 获取所有tr，每个tr就是一个键值对
		for (let i=0; i < tr_list.length; i++){
			let td_arr = tr_list[i].children;  // 获取tr下的两个td
			let key  = td_arr[0].innerText;  // 获取key
			let value = td_arr[1].innerText;  // 获取value
			debug_api_body.push([key, value]);  // 存放在更大的数组中
		}
		debug_api_body = JSON.stringify(debug_api_body);
		console.log(debug_api_body)
	}
	if (debug_body_method === 'x-www-form-urlencoded'){
		let debug_api_body = [];
		let tbody_ = $('table#mytable_1 tbody')[0];  // 获取表格的数据内容
		let tr_list_1 = tbody_.children;  // 获取所有tr，每个tr就是一个键值对
		for (let i=0; i < tr_list_1.length; i++){
			let td_arr = tr_list_1[i].children;  // 获取tr下的两个td
			let key  = td_arr[0].innerText;  // 获取key
			let value = td_arr[1].innerText;  // 获取value
			debug_api_body.push([key, value]);  // 存放在更大的数组中
		}
		debug_api_body = JSON.stringify(debug_api_body);  // 数组转换成字符串
		console.log(debug_api_body)
	}
	if (debug_body_method === 'Text'){
		let debug_api_body = document.getElementById('raw_Text').value;
	}
	if (debug_body_method === 'JavaScript'){
		let debug_api_body = document.getElementById('raw_JavaScript').value;
	}
	if (debug_body_method === 'Json'){
		let debug_api_body = document.getElementById('raw_Json').value;
	}
	if (debug_body_method === 'Html'){
		let debug_api_body = document.getElementById('raw_Html').value;
	}
	if (debug_body_method === 'Xml'){
		let debug_api_body = document.getElementById('raw_Xml').value;
	}
	let api_id = document.getElementById('debug_api_id').innerText;  // 获取接口id
	$.get('/send_api/',{
		'api_id': api_id,
		'debug_api_name': debug_api_name,
		'debug_body_method': debug_body_method,
		'debug_url': debug_url,
		'debug_host': debug_host,
		'debug_header': debug_header,
		'debug_method': debug_method,
		'debug_api_body': debug_api_body
		}, function (ret) {
			console.log(ret)
			// 点击一下返回体按钮
			// TODO: 此处自动点击跳转失效
			$("li a[href=#response]").click();
			// 消息体显示到返回体文本框中
			document.getElementById('response_body').value = ret;
		}
	)
}