from django.core.mail.backends import console
from rest_framework import viewsets, generics, parsers, permissions, status
from .models import AdmissionType,AdmissionInfo,User,Comment,Comment_replie,Notification,Question_Notification,Department,Score,Banner,School
from .serializers import (AdminssionTypeSerializer,
    AdmissionInfoSerializer,AdmissionInfolDetailSerializer,
    UserSerializer,CommentSerializer,
    Comment_replySerializer,
    NotificationSerializer,
    Question_NotificationSerializer,
    DepartmentSerializer,
ScoreSerializer,
BannerSerializer,
SchoolSerializer
,Notification_QuestionSerializer,
NotificationUserSerializer,
Question_Notification2Serializer
      )
from .paginators import  AdmissionInfoPaginator,CommentRepPaginator,QuestionPaginator
from rest_framework.decorators import action
from rest_framework.views import Response
from rest_framework.pagination import PageNumberPagination
from .perm import CommentOwner,QuestionAdmin,NotiQuestionAdmin
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view
from datetime import datetime


class AdmissionTypeViewSet(viewsets.ViewSet,generics.ListAPIView,generics.RetrieveAPIView):
    queryset =  AdmissionType.objects.all()
    serializer_class = AdminssionTypeSerializer

    @action(methods=['get'], detail=True, url_path='admissionInfo')
    def admissionInfo(self, request, pk):
        c = self.get_object()
        adInfo = c.adinfo.all()
        paginator = AdmissionInfoPaginator(page_size=request.GET.get('page_size', AdmissionInfoPaginator.page_size))
        page = paginator.paginate_queryset(adInfo, request)
        serializer = AdmissionInfoSerializer(page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)


"""class AdmissionInfoViewSet(viewsets.ViewSet,generics.ListAPIView):
        queryset =  AdmissionInfo.objects.filter(active=True)
        serializer_class = AdmissionInfoSerializer
        pagination_class = AdmissionInfoPaginator
        def filter_queryset(self, queryset):
            q = self.request.query_params.get("q")
            if q:
                queryset = queryset.filter(title__icontains =q)
            adtype_id = self.request.query_params.get('adtype_id')
            if adtype_id:
                queryset = queryset.filter(type_id = adtype_id)
            return queryset"""

class AdmissionInfoViewSet(viewsets.ViewSet,generics.RetrieveAPIView):
    queryset =  AdmissionInfo.objects.filter(active=True)
    serializer_class = AdmissionInfolDetailSerializer

    def get_permissions(self):
        if self.action in ['comments'] and self.request.method == 'POST':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get','post'], detail=True, url_path='comments')
    def comments(self, request, pk):
        if request.method.__eq__('POST'):
            c = Comment(content=request.data['content'], adInfo=self.get_object(), user=request.user)
            c.save()
            return Response(CommentSerializer(c, context={'request': request}).data, status=status.HTTP_201_CREATED)
        elif request.method == 'GET':
            c = self.get_object()
            comments = c.comment.filter(active =True).order_by('-create_date')
            paginator = AdmissionInfoPaginator(page_size=request.GET.get('page_size', AdmissionInfoPaginator.page_size))
            page = paginator.paginate_queryset(comments, request)
            serializer = CommentSerializer(page, many=True, context={'request': request})
            return paginator.get_paginated_response(serializer.data)
        else:
            return Response({'error': 'Invalid request method.'}, status=status.HTTP_400_BAD_REQUEST)




class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [parsers.MultiPartParser, ]


    def get_permissions(self):
        if self.action in ['current_user']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get','put'], detail=False, url_path='current-user')
    def current_user(self, request):
        u = request.user
        if request.method.__eq__('PUT'):
            for k, v in request.data.items():
                if k.__eq__('password'):
                    u.set_password(k)
                else:
                    setattr(u, k, v)
            u.save()
        return Response(UserSerializer(u, context={'request': request}).data)
    
    @action(methods=['get'], detail=True, url_path='question')
    def question(self, request,pk):
        u = request.user
        c = self.get_object()
        question = c.noti.filter(active=True)
        paginator = QuestionPaginator(page_size=request.GET.get('page_size', QuestionPaginator.page_size))
        page = paginator.paginate_queryset(question, request)
        serializer = Notification_QuestionSerializer(page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)

    @action(methods=['get'], detail=True, url_path='notification')
    def noti(self, request, pk):
        u = self.get_object();
        n = u.noti.filter(active = True)
        return Response(NotificationUserSerializer(n,many=True, context={'request': request}).data)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.filter(active=True)
    serializer_class = CommentSerializer


    def get_permissions(self):
        if self.action in ['destroy', 'update']:
            return [CommentOwner()]
        elif self.action == 'Comment_replies' and self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['post','get'], detail=True, url_path='Comment_replies')
    def Comment_replies(self, request,pk):
        com = self.get_object()
        if request.method.__eq__('POST'):
            c = Comment_replie(content=request.data['content'], user=request.user, comment_id = com)
            c.save()
            return Response(Comment_replySerializer(c, context={'request': request}).data, status=status.HTTP_201_CREATED)
        elif request.method.__eq__('GET'):
            comment_replies = Comment_replie.objects.filter(comment_id = com).order_by('-create_date')
            paginator = CommentRepPaginator(page_size=request.GET.get('page_size', CommentRepPaginator.page_size))
            page = paginator.paginate_queryset(comment_replies, request)
            serializer = Comment_replySerializer(page, many=True, context={'request': request})
            return paginator.get_paginated_response(serializer.data)


class CommentRepViewSet(viewsets.ViewSet, generics.DestroyAPIView):
    queryset = Comment_replie.objects.filter(active=True)
    serializer_class = Comment_replySerializer
    permission_classes = [CommentOwner, ]


class NotificationViewSet(viewsets.ViewSet,generics.ListAPIView,generics.RetrieveAPIView):
    queryset = Notification.objects.filter(active=True)
    serializer_class = NotificationSerializer

    def get_permissions(self):
        if self.action in ['Question'] and self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        elif self.action in ['Question'] and self.request.method == 'GET':
            return [NotiQuestionAdmin()]
        elif self.action in ['send_email']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['post','get'], detail=True, url_path='Question')
    def Question(self, request, pk):
        if request.method == 'POST':
            q = Question_Notification(question=request.data['question'], noti=self.get_object(), user=request.user)
            q.save()
            return Response(Question_NotificationSerializer(q, context={'request': request}).data, status=status.HTTP_201_CREATED)
        elif request.method == 'GET':
            c = self.get_object()
            question = c.question.order_by('-create_date')
            paginator = QuestionPaginator(page_size=request.GET.get('page_size', QuestionPaginator.page_size))
            page = paginator.paginate_queryset(question, request)
            serializer = Question_Notification2Serializer(page, many=True, context={'request': request})
            return paginator.get_paginated_response(serializer.data)
    @action(methods=['post'], detail=True, url_path='send_email')
    def send_email(self,request,pk):
        subject = request.data['subject']
        message = request.data['message']
        email_from = settings.EMAIL_HOST_USER
        users = self.get_object().user.all()
        recipient_list =[user.email for user in users]
        send_mail(subject, message, email_from, recipient_list)
        return Response(status=status.HTTP_200_OK)

class DepartmentViewSet(viewsets.ViewSet,generics.ListAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    @action(methods=['get'], detail=True, url_path='Score')
    def score(self, request, pk):
        current_year = datetime.now().year - 5
        d = self.get_object()
        major_scores = []
        for major in d.major.all():
            scores = Score.objects.filter(major=major, year__gte=current_year).order_by('-year')
            major_scores.append({'major': major.name, 'scores': ScoreSerializer(scores, many=True).data})

        serializer = DepartmentSerializer(d)
        data = serializer.data
        data['major_scores'] = major_scores
        return Response( data)

class BannersViewSet(viewsets.ViewSet,generics.ListAPIView):
    queryset = Banner.objects.filter(active=True)
    serializer_class = BannerSerializer

class SchoolViewSet(viewsets.ViewSet,generics.ListAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
class QuestionViewSet(viewsets.ViewSet,generics.RetrieveAPIView,generics.UpdateAPIView,generics.DestroyAPIView):
    queryset =  Question_Notification.objects.all()
    serializer_class = Question_NotificationSerializer
    def get_permissions(self):
        if self.action in ['retrieve','update','destroy']:
            return [QuestionAdmin()]    
        else:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]



