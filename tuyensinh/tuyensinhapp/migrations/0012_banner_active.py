# Generated by Django 4.2 on 2023-05-05 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tuyensinhapp', '0011_school'),
    ]

    operations = [
        migrations.AddField(
            model_name='banner',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]