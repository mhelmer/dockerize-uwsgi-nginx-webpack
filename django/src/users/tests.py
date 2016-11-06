from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class AccountTests(APITestCase):
    def test_user_list(self):
        """
        Ensure that user-list contains a list of users
        """
        user = User.objects.create_user(
            username='jacob', email='jacob@…', password='top_secret')

        self.client.login(username='jacob', password='top_secret')

        url = reverse('user-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data, [{
            "id": user.pk,
            "url": 'http://testserver' + reverse(
                'user-detail',
                kwargs={'pk': 1},
            ),
            "username": "jacob",
            "email": "jacob@…",
        }])
