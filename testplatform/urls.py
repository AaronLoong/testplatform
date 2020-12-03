"""testplatform URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import re_path

from apitest.views import *
from apitest.views_api import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('welcome/', welcome),
    path('', default),  # 直接访问ip:port显示内容
    re_path(r"^child/(?P<eid>.+)/(?P<oid>.*)/$", child),  # 返回子页面
    re_path(r'^home/$', home),
    path('login/', login),
    path('register/', register),
    re_path(r'^login_action/$', login_action),
    re_path(r'^register_action/$', register_action),
    re_path(r'^accounts/login/$', login),
    re_path(r'^logout/$', logout),
    re_path(r'^tucao/$', tucao),
    path('help/', p_help),
    path('project_list/', project_list),
    path('delete_project/', delete_project),
    path('add_project/', add_project),
    re_path(r'^apis/(?P<id>.*)$', to_apis_library),
    re_path(r'^cases/(?P<id>.*)$', to_cases_library),
    re_path(r'^project_set/(?P<id>.*)$', to_project_set),
    re_path(r'^save_project_set/(?P<id>.*)/$', save_project_set),
    re_path(r'^project_api_add/(?P<Pid>.*)/$', project_api_add),
    re_path(r'^project_api_del/(?P<id>.*)/$', project_api_del),
    path('save_comment/', save_comment),   # 保存备注comment内容
    path('get_comment/', get_comment),  # 获取备注comment内容
    path('save_api/', save_api),  # 保存api接口调试内容
    path('get_api_data/', get_api_data),  # 获取接口数据
    path('send_api/', send_api),  # 调试层发送请求
]
