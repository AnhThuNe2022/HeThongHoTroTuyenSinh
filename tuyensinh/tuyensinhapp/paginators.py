from rest_framework import pagination

class AdmissionInfoPaginator(pagination.PageNumberPagination):
    page_size =10
    def __init__(self, *args, **kwargs):
        self.page_size = kwargs.pop('page_size', self.page_size)
        super().__init__(*args, **kwargs)

class CommentRepPaginator(pagination.PageNumberPagination):
    page_size = 4
    def __init__(self, *args, **kwargs):
        self.page_size = kwargs.pop('page_size', self.page_size)
        super().__init__(*args, **kwargs)

class QuestionPaginator(pagination.PageNumberPagination):
    page_size = 25

    def __init__(self, *args, **kwargs):
        self.page_size = kwargs.pop('page_size', self.page_size)
        super().__init__(*args, **kwargs)


