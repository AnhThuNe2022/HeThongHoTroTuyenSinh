from django.urls import path, include
from rest_framework import routers
from . import views

r = routers.DefaultRouter()
r.register('admissionTypes', views.AdmissionTypeViewSet)
r.register('admissionInfo', views.AdmissionInfoViewSet)
r.register('users', views.UserViewSet)
r.register('comments', views.CommentViewSet)
r.register('comment_rep', views.CommentRepViewSet)

r.register('notification', views.NotificationViewSet)
r.register('department', views.DepartmentViewSet)
r.register('banner', views.BannersViewSet)
r.register('school', views.SchoolViewSet)
r.register('question', views.QuestionViewSet)

urlpatterns = [
    path('', include(r.urls))
]