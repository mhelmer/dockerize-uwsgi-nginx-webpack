from django.contrib.auth.models import User
from rest_framework import serializers

from users.tasks import add


class AddTask:
    def __init__(self, a, b):
        task = add.delay(a, b)
        self.id = task.id


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')


class AddTaskSerializer(serializers.Serializer):
    id = serializers.CharField(label='ID', read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='add-detail',
        lookup_field='id',
        lookup_url_kwarg='pk',
    )
    a = serializers.IntegerField(write_only=True)
    b = serializers.IntegerField(write_only=True)

    def create(self, validated_data):
        return AddTask(a=validated_data['a'], b=validated_data['b'])
