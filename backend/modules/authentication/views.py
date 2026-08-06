from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import status, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema, inline_serializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .repositories import PasswordResetTokenRepository
from .serializers import (
    ChangePasswordSerializer,
    ForgotPasswordSerializer,
    LoginSerializer,
    OTPSerializer,
    RegisterSerializer,
    ResetPasswordSerializer,
    SendOTPSerializer,
)
from .services import AuthenticationService

User = get_user_model()


class RegisterView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        summary="Register a new user",
        description="Create a new user account and return access/refresh tokens.",
        request=RegisterSerializer,
        responses={
            201: inline_serializer(
                name="RegisterResponse",
                fields={
                    "message": serializers.CharField(default="User registered successfully"),
                    "user": inline_serializer(
                        name="RegisterResponseUser",
                        fields={
                            "id": serializers.CharField(),
                            "email": serializers.EmailField(),
                            "first_name": serializers.CharField(),
                            "last_name": serializers.CharField(),
                        }
                    ),
                    "tokens": inline_serializer(
                        name="RegisterResponseTokens",
                        fields={
                            "access": serializers.CharField(),
                            "refresh": serializers.CharField(),
                        }
                    )
                }
            )
        }
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "message": "User registered successfully",
                "user": {
                    "id": str(user.id),
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        summary="Login user",
        description="Authenticate user with email and password and return access/refresh tokens.",
        request=LoginSerializer,
        responses={
            200: inline_serializer(
                name="LoginSuccessResponse",
                fields={
                    "access": serializers.CharField(),
                    "refresh": serializers.CharField(),
                }
            ),
            401: inline_serializer(
                name="LoginErrorResponse",
                fields={
                    "message": serializers.CharField(default="Invalid credentials")
                }
            )
        }
    )
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


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        summary="Change password",
        description="Change password for the authenticated user.",
        request=ChangePasswordSerializer,
        responses={
            200: inline_serializer(
                name="ChangePasswordSuccessResponse",
                fields={"message": serializers.CharField(default="Password changed successfully")}
            ),
            400: inline_serializer(
                name="ChangePasswordErrorResponse",
                fields={"message": serializers.CharField(default="Incorrect old password")}
            )
        }
    )
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        old_password = serializer.validated_data["old_password"]
        new_password = serializer.validated_data["new_password"]

        if not user.check_password(old_password):
            return Response(
                {"message": "Incorrect old password"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save(update_fields=["password"])

        return Response({"message": "Password changed successfully"})


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        summary="Forgot password",
        description="Generate a password reset token and send it via email (mocked).",
        request=ForgotPasswordSerializer,
        responses={
            200: inline_serializer(
                name="ForgotPasswordSuccessResponse",
                fields={
                    "message": serializers.CharField(default="Reset token generated"),
                    "token": serializers.CharField()
                }
            ),
            404: inline_serializer(
                name="ForgotPasswordErrorResponse",
                fields={"message": serializers.CharField(default="User not found")}
            )
        }
    )
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.filter(
            email__iexact=serializer.validated_data["email"]
        ).first()

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

    @extend_schema(
        summary="Reset password",
        description="Reset user password using a password reset token.",
        request=ResetPasswordSerializer,
        responses={
            200: inline_serializer(
                name="ResetPasswordSuccessResponse",
                fields={"message": serializers.CharField(default="Password updated successfully")}
            ),
            400: inline_serializer(
                name="ResetPasswordErrorResponse",
                fields={"message": serializers.CharField(default="Invalid token")}
            )
        }
    )
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

    @extend_schema(
        summary="Verify OTP",
        description="Verify an OTP code sent to the user's email.",
        request=OTPSerializer,
        responses={
            200: inline_serializer(
                name="VerifyOTPSuccessResponse",
                fields={"message": serializers.CharField(default="OTP verified successfully")}
            ),
            400: inline_serializer(
                name="VerifyOTPErrorResponse",
                fields={"message": serializers.CharField(default="Invalid OTP")}
            ),
            404: inline_serializer(
                name="VerifyOTPUserNotFound",
                fields={"message": serializers.CharField(default="User not found")}
            )
        }
    )
    def post(self, request):
        serializer = OTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.filter(
            email__iexact=serializer.validated_data["email"]
        ).first()

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

    @extend_schema(
        summary="Send OTP",
        description="Generate and send a new OTP to the user's email.",
        request=SendOTPSerializer,
        responses={
            201: inline_serializer(
                name="SendOTPSuccessResponse",
                fields={
                    "message": serializers.CharField(default="OTP generated"),
                    "otp": serializers.CharField()
                }
            ),
            404: inline_serializer(
                name="SendOTPErrorResponse",
                fields={"message": serializers.CharField(default="User not found")}
            )
        }
    )
    def post(self, request):
        serializer = SendOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.filter(
            email__iexact=serializer.validated_data["email"]
        ).first()
        if not user:
            return Response(
                {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        otp = AuthenticationService.generate_otp(
            user, serializer.validated_data["purpose"]
        )
        return Response(
            {"message": "OTP generated", "otp": otp.code},
            status=status.HTTP_201_CREATED,
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        summary="Logout user",
        description="Blacklist the refresh token and log out the user.",
        request=inline_serializer(
            name="LogoutRequest",
            fields={"refresh": serializers.CharField()}
        ),
        responses={
            200: inline_serializer(
                name="LogoutSuccessResponse",
                fields={"message": serializers.CharField(default="Logged out successfully")}
            ),
            400: inline_serializer(
                name="LogoutErrorResponse",
                fields={"message": serializers.CharField(default="Invalid token")}
            )
        }
    )
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")

            if not refresh_token:
                return Response(
                    {"message": "Refresh token is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"message": "Logged out successfully"})

        except TokenError:
            return Response(
                {"message": "Invalid token"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        summary="Retrieve user profile",
        description="Get profile details of the authenticated user.",
        responses={
            200: inline_serializer(
                name="UserProfileResponse",
                fields={
                    "id": serializers.CharField(),
                    "email": serializers.EmailField(),
                    "first_name": serializers.CharField(),
                    "last_name": serializers.CharField(),
                    "role": serializers.CharField(),
                    "department": inline_serializer(
                        name="UserProfileDepartment",
                        fields={
                            "id": serializers.IntegerField(),
                            "name": serializers.CharField(),
                        },
                        required=False,
                        allow_null=True,
                    )
                }
            )
        }
    )
    def get(self, request):
        user = request.user

        return Response(
            {
                "id": str(user.id),
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "role": user.role,
                "department": {
                    "id": user.department.id,
                    "name": user.department.name,
                } if user.department else None,
            }
        )

