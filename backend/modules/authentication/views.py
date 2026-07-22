from django.contrib.auth import get_user_model
from django.db import transaction

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework import status



from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .repositories import PasswordResetTokenRepository
from .serializers import (
    LoginSerializer,
    OTPSerializer,
    SendOTPSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
)
from .services import AuthenticationService

User = get_user_model()


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = User.objects.filter(email__iexact=email).first()

        if not user or not user.is_active or not user.check_password(password):
            return Response(
                {"message": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken.for_user(user)

        AuthenticationService.save_login_history(
            user=user,
            ip=request.META.get("REMOTE_ADDR"),
            user_agent=request.META.get("HTTP_USER_AGENT", ""),
        )

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }
        )


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.filter(email__iexact=serializer.validated_data["email"]).first()

        if not user:
            return Response({"message": "User not found"}, status=404)

        token = AuthenticationService.create_password_reset_token(user)

        return Response(
            {
                "message": "Reset token generated",
                "token": token.token,
            }
        )


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        token = PasswordResetTokenRepository.get_token(
            serializer.validated_data["token"]
        )

        if not token:
            return Response({"message": "Invalid token"}, status=400)

        with transaction.atomic():
            token.user.set_password(serializer.validated_data["password"])
            token.user.save(update_fields=["password"])
            PasswordResetTokenRepository.mark_used(token)

        return Response({"message": "Password updated successfully"})


class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = OTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.filter(email__iexact=serializer.validated_data["email"]).first()

        if not user:
            return Response({"message": "User not found"}, status=404)

        otp = AuthenticationService.verify_otp(
            user,
            serializer.validated_data["otp"],
            serializer.validated_data["purpose"],
        )

        if not otp:
            return Response({"message": "Invalid OTP"}, status=400)

        return Response({"message": "OTP verified successfully"})


class SendOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SendOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.filter(email__iexact=serializer.validated_data["email"]).first()
        if not user:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        otp = AuthenticationService.generate_otp(user, serializer.validated_data["purpose"])
        # Development-only: deliver this value by email/SMS in production.
        return Response(
            {"message": "OTP generated", "otp": otp.code},
            status=status.HTTP_201_CREATED,
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_value = request.data.get("refresh")
            if not refresh_value:
                return Response(
                    {"message": "Refresh token is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            refresh = RefreshToken(refresh_value)
            refresh.blacklist()

            return Response({"message": "Logged out successfully"})

        except TokenError:
            return Response(
                {"message": "Invalid token"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response(
            {
                "id": str(user.id),
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
        )
