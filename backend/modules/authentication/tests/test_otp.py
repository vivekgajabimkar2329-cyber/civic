from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

from ..services import AuthenticationService

User = get_user_model()


class OTPAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="sumanth",
            email="sumanth@gmail.com",
            password="pass123",
        )

    def test_verify_otp(self):
        otp = AuthenticationService.generate_otp(
            self.user,
            "LOGIN"
        )

        response = self.client.post(
            reverse("auth_verify_otp"),
            {
                "email": "sumanth@gmail.com",
                "otp": otp.code
            },
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
