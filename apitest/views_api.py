# !/usr/bin/python3.7
# -*- coding: utf-8 -*-

"""
@Author: Longmin
@Time: 2020/11/9 10:58 上午
"""
from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect

from apitest.models import *


def project_api_add(request, Pid):
	""" 添加项目接口 """
	project_id = Pid
	Apis.objects.create(project_id=project_id)   # 未指定字段默认为空或None
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
