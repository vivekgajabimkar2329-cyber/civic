from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()


class LogoutAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="sumanth",
            email="sumanth@gmail.com",
            password="pass123",
        )

    def test_logout(self):
        login = self.client.post(
            reverse("auth_login"),
            {
                "email": "sumanth@gmail.com",
                "password": "pass123"
            },
            format="json"
        )

        access = login.data["access"]
        refresh = login.data["refresh"]

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {access}",
        )

        response = self.client.post(
            reverse("auth_logout"),
            {"refresh": refresh},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
