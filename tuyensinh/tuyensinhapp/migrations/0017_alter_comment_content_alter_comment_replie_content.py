# Generated by Django 4.2 on 2023-05-12 03:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tuyensinhapp', '0016_question_notification_update_by_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='content',
            field=models.CharField(max_length=1000),
        ),
        migrations.AlterField(
            model_name='comment_replie',
            name='content',
            field=models.CharField(max_length=1000),
        ),
    ]
