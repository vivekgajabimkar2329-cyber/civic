from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

from ..services import AuthenticationService

User = get_user_model()


class PasswordAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="sumanth",
            email="sumanth@gmail.com",
            password="pass123",
        )

    def test_forgot_password(self):
        response = self.client.post(
            reverse("auth_forgot_password"),
            {
                "email": "sumanth@gmail.com"
            },
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)

    def test_reset_password(self):
        token = AuthenticationService.create_password_reset_token(
            self.user
        )

        response = self.client.post(
            reverse("auth_reset_password"),
            {
                "token": token.token,
                "password": "newpassword123"
            },
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.user.refresh_from_db()
        self.assertTrue(
            self.user.check_password("newpassword123")
        )
