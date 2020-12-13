# !/usr/bin/python3.7
# -*- coding: utf-8 -*-

"""
@Author: Longmin
@Time: 2020/11/9 10:58 上午
"""
import json

from django.db.utils import OperationalError
from django.http import HttpResponse
from django.http import HttpResponseRedirect

from apitest.models import *


def project_api_add(request, Pid):
	""" 添加项目接口 """
	project_id = Pid
	Apis.objects.create(project_id=project_id)  # 未指定字段默认为空或None
	return HttpResponseRedirect('/apis/%s' % project_id)


def project_api_del(request, id):
	""" 删除项目接口 """
	project_id = Apis.objects.filter(id=id)[0].project_id
	Apis.objects.filter(id=id).delete()
	return HttpResponseRedirect('/apis/%s' % project_id)


def save_comment(request):
	""" 保存备注内容 """
	api_id = request.GET['api_id']
	comment_value = request.GET['comment_value']
	Apis.objects.filter(id=api_id).update(api_description=comment_value)
	return HttpResponse('')


def get_comment(request):
	""" 获取备注内容 """
	api_id = request.GET['api_id']
	comment_value = Apis.objects.filter(id=api_id)[0].api_description
	return HttpResponse(comment_value)


def save_api(request):
	""" 保存接口调试内容"""
	api_id = request.GET['api_id']
	api_name = request.GET['debug_api_name']
	debug_api_body_method = request.GET['debug_body_method']
	debug_url = request.GET['debug_url']
	debug_host = request.GET['debug_host']
	debug_header = request.GET['debug_header']
	debug_method = request.GET['debug_method']
	debug_api_body = request.GET['debug_api_body']
	if debug_api_body_method == '返回体':
		api = Apis.objects.filter(id=api_id)[0]
		debug_api_body_method = api.last_body_method
		debug_api_body = api.last_api_body
	else:
		debug_api_body = request.GET['debug_api_body']
	# TODO: 需补充接口请求信息内容校验
	# 保存数据
	try:
		Apis.objects.filter(id=api_id).update(
			api_name=api_name,
			api_method=debug_method,
			api_body_method=debug_api_body_method,  # 请求体编码方式
			api_host=debug_host,
			api_url=debug_url,
			api_header=debug_header,
			api_body=debug_api_body,
		)
	except OperationalError:
		raise OperationalError('保存调试信息失败')
	finally:
		return HttpResponse('success')


def get_api_data(request):
	""" 获取接口数据 """
	api_id = request.GET['debug_api_id']
	api = Apis.objects.filter(id=api_id).values()[0]
	print(api)
	return HttpResponse(json.dumps(api), content_type='application/json')


def send_api(request):
	""" 调试层发送的请求 """
	api_id = request.GET['api_id']
	api_name = request.GET['debug_api_name']
	debug_api_body_method = request.GET['debug_body_method']
	print(debug_api_body_method)
	debug_url = request.GET['debug_url']
	debug_host = request.GET['debug_host']
	debug_header = request.GET['debug_header']
	debug_method = request.GET['debug_method']
	debug_api_body = request.GET['debug_api_body']
	if debug_api_body_method == '返回体':
		api = Apis.objects.filter(id=api_id)[0]
		debug_api_method = api.last_body_method
		debug_api_body = api.last_api_body
		if debug_api_method in ['', None]:
			return HttpResponse('请先选择好请求体编码方式和请求体，再点击Send按钮发送请求！')
	else:
		debug_api_body = request.GET['debug_api_body']
		api = Apis.objects.filter(id=api_id)
		api.update(last_body_method=debug_api_body_method, last_api_body=debug_api_body)
	# 发送请求获取返回值

	# 将返回值传递给前端页面
	return HttpResponse('{"code":200}')
