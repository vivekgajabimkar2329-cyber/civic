from django.db import transaction
from rest_framework import serializers
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema, inline_serializer

from ..repositories import PasswordResetTokenRepository
from ..serializers import ResetPasswordSerializer


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
