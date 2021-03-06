# Generated by Django 3.1.3 on 2020-12-03 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apitest', '0007_auto_20201103_2301'),
    ]

    operations = [
        migrations.AddField(
            model_name='apis',
            name='last_api_body',
            field=models.CharField(help_text='上次请求体', max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='apis',
            name='last_body_method',
            field=models.CharField(help_text='上次请求体编码方式', max_length=1000, null=True),
        ),
    ]
