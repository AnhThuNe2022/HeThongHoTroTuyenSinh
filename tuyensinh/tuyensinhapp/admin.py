from django import forms
from django.contrib import admin
from .models import User,AdmissionType,AdmissionInfo,AccountType,Notification,Department,Score,Major,School,Banner
from ckeditor_uploader.widgets import CKEditorUploadingWidget

class AdmissionInfoForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)
    class Meta:
        model = AdmissionInfo
        fields = '__all__'


class SchoolForm(forms.ModelForm):
    class Meta:
        model = School
        fields = ['name', 'description', 'address']

class BannerForm(forms.ModelForm):
    class Meta:
        model = Banner
        fields = ['caption', 'image']
        widgets = {
            'image': forms.ClearableFileInput(attrs={'multiple': True}),
        }

class AdminSchool(admin.ModelAdmin):
    list_display = ['name','address']
    forms = SchoolForm
class AdminBanner(admin.ModelAdmin):
    list_display = ['caption', 'image']
    forms = BannerForm

class AdminAdmissionInfo(admin.ModelAdmin):
    list_display = ['id', 'title','type', 'create_date',"active"]
    forms = AdmissionInfoForm

class AdminAccountType(admin.ModelAdmin):
    list_display = ['id', 'name', 'active']

class AdminNotification(admin.ModelAdmin):
    list_display = ['id', 'title', 'from_date', 'to_date']


class AdminDepartment(admin.ModelAdmin):
    list_display = ['id','name']

class AdminScore(admin.ModelAdmin):
    list_display = ['id','year','minimum_score']

class AdminMajor(admin.ModelAdmin):
    list_display = ['id','name']


class UserAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        if 'password' in form.changed_data:
            obj.set_password(form.cleaned_data['password'])

        super().save_model(request, obj, form, change)

admin.site.register(User,UserAdmin)
admin.site.register(AdmissionType)
admin.site.register(AdmissionInfo,AdminAdmissionInfo)
admin.site.register(AccountType,AdminAccountType)
admin.site.register(Notification,AdminNotification)
admin.site.register(Department,AdminDepartment)
admin.site.register(Major,AdminMajor)
admin.site.register(Score,AdminScore)
admin.site.register(School,AdminSchool)
admin.site.register(Banner,AdminBanner)


