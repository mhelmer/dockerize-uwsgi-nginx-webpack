from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.viewsets import ReadOnlyModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from project.celery import app
from users.serializers import UserSerializer, AddTaskSerializer


class UserViewSet(ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class AddTaskViewSet(ViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = AddTaskSerializer

    def create(self, request, format=None):
        serializer = AddTaskSerializer(
            data=request.data,
            context={'request': request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

    def retrieve(self, request, pk=None):
        res = app.AsyncResult(pk)
        return Response(res.get())
