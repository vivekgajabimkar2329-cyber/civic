from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework.test import APITestCase
from rest_framework import status

from .services import AuthenticationService

User = get_user_model()


class AuthenticationAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="sumanth@gmail.com",
            password="pass123",
        )

    def test_login_success(self):

        response = self.client.post(
            reverse("login"),
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
            reverse("login"),
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

    def test_forgot_password(self):

        response = self.client.post(
            reverse("forgot_password"),
            {
                "email": "sumanth@gmail.com"
            },
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)

    def test_verify_otp(self):

        otp = AuthenticationService.generate_otp(
            self.user,
            "LOGIN"
        )

        response = self.client.post(
            reverse("verify_otp"),
            {
                "email": "sumanth@gmail.com",
                "otp": otp.code
            },
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_reset_password(self):

        token = AuthenticationService.create_password_reset_token(
            self.user
        )

        response = self.client.post(
            reverse("reset_password"),
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

    def test_logout(self):

        login = self.client.post(
            reverse("login"),
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
            reverse("logout"),
            {"refresh": refresh},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
