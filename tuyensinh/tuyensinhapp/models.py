from django.contrib.auth.models import AbstractUser
from django.db import models
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField


class AccountType(models.Model):
    name = models.CharField(max_length=50)
    active = models.BooleanField(default = True)

    def __str__(self):
        return self.name

class User(AbstractUser):
    avatar = models.ImageField(upload_to='Users/%Y/%m',null= True)
    type = models.ForeignKey(AccountType,on_delete=models.PROTECT,null=True)

class BaseModel(models.Model):
    create_date = models.DateTimeField(auto_now_add= True)
    update_date = models.DateTimeField(auto_now= True)
    active = models.BooleanField(default = True)

    class Meta :
        abstract = True

class AdmissionType(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name


class AdmissionInfo (BaseModel):
    title = models.CharField(max_length=255)
    content = RichTextField()
    image = models.ImageField(upload_to='ThongTin/%Y/%m', null = True)
    type = models.ForeignKey(AdmissionType,on_delete=models.CASCADE,related_name='adinfo')

    def __str__(self):
        return self.title

class Comment(BaseModel):
    content = models.CharField(max_length=1000)
    adInfo = models.ForeignKey(AdmissionInfo,on_delete=models.CASCADE,related_name='comment')
    user = models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return self.content
class Comment_replie(BaseModel):
    content = models.CharField(max_length=1000)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_id = models.ForeignKey(Comment, on_delete=models.CASCADE,related_name='comment_rep')
    def __str__(self):
        return self.content

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    introduce = models.CharField(max_length=500)
    description = RichTextField()
    website = models.URLField(max_length=255)
    intro_video = models.TextField(max_length=200, null=True, blank=True)
    def __str__(self):
        return self.name

class Major(models.Model):
    name =models.CharField(max_length=100, unique=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE,related_name='major')

    def __str__(self):
        return self.name


class Score(models.Model):
    year = models.IntegerField()
    major = models.ForeignKey(Major, on_delete=models.CASCADE,related_name='score')
    minimum_score = models.FloatField()


class Notification(BaseModel):
    title = models.CharField(max_length=255)
    content = RichTextField()
    from_date = models.DateTimeField()
    to_date = models.DateTimeField()
    user = models.ManyToManyField(User,related_name='noti',limit_choices_to={'type__id__in': ['3'],})
class Question_Notification(BaseModel):
    question = models.CharField(max_length=255)
    noti = models.ForeignKey(Notification, on_delete=models.CASCADE,related_name='question')
    answer = models.CharField(max_length=500,null=True)
    isAnswer = models.BooleanField(default = False)
    user = models.ForeignKey(User,null=True,on_delete=models.CASCADE)
    update_by = models.ForeignKey(User,related_name='question',null=True,on_delete=models.CASCADE)

class School(models.Model):
    name = models.CharField(max_length=50)
    description = RichTextField()
    hotline = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    mail = models.CharField(max_length=100)
    update_date = models.DateTimeField(auto_now= True)
    def __str__(self):
        return self.name
class Banner(models.Model):
    caption = models.CharField(max_length=200)
    image = models.ImageField(upload_to='banners/%Y/%m', null = True)
    active = models.BooleanField(default = True)

    def __str__(self):
        return self.caption