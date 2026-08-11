from django.contrib.auth import get_user_model
from rest_framework import status, serializers
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema, inline_serializer

from ..serializers import OTPSerializer, SendOTPSerializer
from ..services import AuthenticationService

User = get_user_model()


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
