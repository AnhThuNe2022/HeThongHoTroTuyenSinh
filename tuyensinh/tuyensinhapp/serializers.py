from rest_framework import  serializers
from .models import AdmissionType,AdmissionInfo,User,Comment,Comment_replie,Notification,Question_Notification,Department,Score,Major,School,Banner

class ImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')
    def get_image(self, obj):
        if obj.image:
            return 'https://res.cloudinary.com/dcpbdkeam/image/upload/v1682959389/%s' % obj.image.name

class AdminssionTypeSerializer(serializers.ModelSerializer):
    class Meta :
        model = AdmissionType
        fields = ['id','name']

class AdmissionInfoSerializer(ImageSerializer):
    type = AdminssionTypeSerializer()
    class Meta :
        model = AdmissionInfo
        fields = ['id','title','image','type']



class AdmissionInfolDetailSerializer(AdmissionInfoSerializer):
    class Meta:
        model = AdmissionInfoSerializer.Meta.model
        fields = AdmissionInfoSerializer.Meta.fields + ['content']

class UserSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='avatar')

    def get_image(self, obj):
        if obj.avatar:
            return 'https://res.cloudinary.com/dcpbdkeam/image/upload/v1682959389/%s' % obj.avatar.name

    def create(self, validated_data):
        data = validated_data.copy()
        u = User(**data)
        u.set_password(u.password)
        u.save()
        return u
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'password', 'avatar','type','email','image']
        extra_kwargs = {
            'avatar': {'write_only': 'True'},
            'password': {'write_only': 'True'}
        }
class Comment_replySerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Comment_replie
        fields = ['id', 'content', 'create_date', 'user']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    comment_rep = Comment_replySerializer(many=True)
    class Meta:
        model = Comment
        fields = ['id', 'content', 'create_date', 'user','comment_rep']


class Question_NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question_Notification
        fields = ['id','question','answer','isAnswer','active','noti','update_by']

class Question_Notification2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Question_Notification
        fields = ['id','question','isAnswer','active',]
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id','title','content','from_date','to_date']

class NotificationUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id','title']
class Notification_QuestionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    question = Question_NotificationSerializer(many=True)
    class Meta:
        model = Notification
        fields = ['id','user','question']


class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ['year', 'minimum_score']

class MajorSerializer(serializers.ModelSerializer):
    score = ScoreSerializer(many=True, read_only=True)

    class Meta:
        model = Major
        fields = ['id', 'name', 'score']
class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = ['id', 'name', 'introduce', 'description', 'website', 'intro_video']

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['id','name', 'description', 'address','mail','hotline']

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ['id','image','caption']

