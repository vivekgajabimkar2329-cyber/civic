from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema, inline_serializer
# pyrefly: ignore [missing-import]
from rest_framework_simplejwt.tokens import RefreshToken
# pyrefly: ignore [missing-import]
from rest_framework_simplejwt.exceptions import TokenError 


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
