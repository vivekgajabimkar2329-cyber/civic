from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()


class LoginAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="sumanth",
            email="sumanth@gmail.com",
            password="pass123",
        )

    def test_login_success(self):
        response = self.client.post(
            reverse("auth_login"),
            {
                "email": "sumanth@gmail.com",
                "password": "pass123"
            },
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_invalid_password(self):
        response = self.client.post(
            reverse("auth_login"),
            {
                "email": "sumanth@gmail.com",
                "password": "wrongpassword"
            },
            format="json"
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED
        )
