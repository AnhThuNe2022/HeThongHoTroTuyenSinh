from rest_framework import permissions


class CommentOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, comment):
        return request.user and (request.user == comment.user or request.user.type_id == 3)

class QuestionAdmin(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, question):
        return request.user and (request.user in question.noti.user.all())
class  NotiQuestionAdmin(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, noti):
        return request.user and (request.user in noti.user.all())