from django.contrib.auth.models import User
from rest_framework.reverse import reverse
from rest_framework.viewsets import ReadOnlyModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from project.celery import app
from users.serializers import UserSerializer
from users.tasks import add


class UserViewSet(ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class AddTaskViewSet(ViewSet):
    permission_classes = (IsAuthenticated,)

    def create(self, request, format=None):
        task = add.delay(request.data['a'], request.data['b'])

        return Response({
            'id': task.id,
            'url': reverse(
                'add-detail',
                kwargs={'pk': task.id},
                request=request
            )
        })

    def retrieve(self, request, pk=None):
        res = app.AsyncResult(pk)
        return Response(res.get(timeout=2))
