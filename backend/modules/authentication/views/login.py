from django.contrib.auth import get_user_model
from rest_framework import status, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema, inline_serializer
# pyrefly: ignore [missing-import]
from rest_framework_simplejwt.tokens import RefreshToken 

from ..serializers import (
    RegisterSerializer,
    LoginSerializer,
    ChangePasswordSerializer,
)
from ..services import AuthenticationService

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
