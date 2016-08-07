from rest_framework import routers

from users.views import UserViewSet, AddTaskViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'add', AddTaskViewSet, base_name='add')


urlpatterns = [
]
