from django.db import models

# Create your models here.


class User(models.Model):

	gender = (
		('male', '男'),
		('female', '女')
	)

	name = models.CharField(max_length=16, unique=True)
	password = models.CharField(max_length=256)
	email = models.EmailField(unique=True)
	sex = models.CharField(max_length=16, choices=gender, default='男')
	ctime = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.name

	class Meta:
		ordering = ["-ctime"]
		verbose_name = '用户'
		verbose_name_plural = '用户'


class Tucao(models.Model):
	user = models.CharField(max_length=16, null=True)
	text = models.CharField(max_length=1024, null=True)
	ctime = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.text + str(self.ctime)


class Home_link(models.Model):
	link_name = models.CharField(max_length=50, null=True, help_text='超链接名称')
	link_content = models.CharField(max_length=1024, null=True, help_text='超链接内容')

	def __str__(self):
		return self.link_name


class Project(models.Model):
	project_name = models.CharField(max_length=1000, null=True, verbose_name='项目名称')
	project_remark = models.CharField(max_length=1000, null=True, verbose_name='项目备注')
	project_build_user = models.CharField(max_length=256, null=True, verbose_name='项目创建者名称')
	project_build_other_user = models.CharField(max_length=256, null=True, verbose_name='项目其他创建者的名称')

	def __str__(self):
		return self.project_name


class Apis(models.Model):
	""" 接口请求的相关内容 """
	project_id = models.CharField(max_length=10, null=True, help_text='项目id')
	api_name = models.CharField(max_length=100, null=True, help_text='接口名称')
	api_method = models.CharField(max_length=100, null=True, help_text='接口请求方式')
	api_url = models.CharField(max_length=1000, null=True, help_text='接口url')
	api_header = models.CharField(max_length=1000, null=True, help_text='请求头')
	api_login = models.CharField(max_length=100, null=True, help_text='接口请求是否带登录状态')
	api_host = models.CharField(max_length=100, null=True, help_text='域名')
	api_description = models.CharField(max_length=100, help_text='接口描述', null=True)
	api_body_method = models.CharField(max_length=20, null=True, help_text='请求体编码方式')
	api_body = models.CharField(max_length=1000, null=True, help_text='请求体')
	api_result = models.TextField(null=True, help_text='返回内容')
	api_sign = models.CharField(max_length=10, null=True, help_text='是否需要验证签名')
	file_key = models.CharField(max_length=50, null=True, help_text='文件key')
	file_name = models.CharField(max_length=50, null=True, help_text='文件名')
	public_header = models.CharField(max_length=1000, null=True, help_text='全局公共请求头')

	def __str__(self):
		return self.api_name
