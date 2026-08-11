from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema, inline_serializer

from ..serializers import ForgotPasswordSerializer
from ..services import AuthenticationService

User = get_user_model()


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
