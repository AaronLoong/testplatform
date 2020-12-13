# !/usr/bin/python3.7
# -*- coding: utf-8 -*-

"""
@Author: Longmin
@Time: 2020/11/12 9:31 上午
"""
from functools import wraps


# 简单装饰器
def decorator(func):
	@wraps(func)
	def wrapper(*args, **kwargs):
		print('开始执行函数---> {}'.format(func.__name__))
		func(*args, **kwargs)
		print('函数执行结束---> {}'.format(func.__name__))
		return wrapper


# 带参数的装饰器
def say_hello(country):
	def wrapper(func):
		def deco(*args, **kwargs):
			if country == 'china':
				print('hello')
			elif country == 'america':
				print('dem')
			else:
				return
			func(*args, **kwargs)
		return deco
	return wrapper


# 高阶类装饰器
class logger(object):
	def __init__(self, func):
		self.func = func

	def __call__(self, *args, **kwargs):
		print('[INFO]: the function {func}() is running...'.format(func=self.func.__name__))
		return self.func(*args, **kwargs)


# 带参数的类装饰器
class log(object):
	def __init__(self, level='INFO'):  # 接收传入的参数
		self.level = level

	def __call__(self, func):
		def wrapper(*args, **kwargs):
			print('[{level}]: the function {func}() is running...'.format(level=self.level, func=func.__name__))
			func(*args, **kwargs)
		return wrapper  # 返回函数


@say_hello('china')
def xiaoming():
	pass


@logger
def test(something):
	print('say {}'.format(something))


@log('WARNING')
def test_1(something):
	print('say {}'.format(something))


class F:
	a = 'luffy'

	def __init__(self, name):
		self.name = name

	def A(self):
		print('%s666' % self.name)


obj = F('Ronan')

# 检查是否存在某属性，也能检查静态属性
print(hasattr(obj, 'name'))
print(hasattr(obj, 'A'))

# 获取属性,包含静态属性
print(getattr(obj, 'name'))
getattr(obj, 'A')()

# 设置属性，如果有就改，没有就增
setattr(obj, 'ACE', '999')
print(obj.__dict__)  # {'name': 'Ronan', 'ACE': '999'}

# 删除属性(如果不存在该属性则报错)，无法删除静态属性
delattr(obj, 'name')
print(obj.__dict__)  # {'ACE': '999'}　

if __name__ == '__main__':
	# xiaoming()
	# test(1)
	# test_1(2)
	pass
