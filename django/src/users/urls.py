from rest_framework import routers

from users.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
