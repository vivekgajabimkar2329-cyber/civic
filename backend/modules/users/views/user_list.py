from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema

from common.permissions import IsSuperAdminOrCityAdmin
from modules.users.serializers import UserCreateSerializer, UserReadSerializer
from modules.users.services import UserService


class UserListCreateView(APIView):
    permission_classes = [IsSuperAdminOrCityAdmin]

    @extend_schema(
        summary="List users",
        description="Retrieve a list of all users. Requires authentication.",
        responses={200: UserReadSerializer(many=True)},
    )
    def get(self, request):
        users = UserService().list_users()
        serializer = UserReadSerializer(users, many=True)
        return Response(serializer.data)

    @extend_schema(
        summary="Create a user",
        description="Register a new user in the system.",
        request=UserCreateSerializer,
        responses={201: UserReadSerializer()},
    )
    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = UserService().create_user(serializer.validated_data)

        return Response(
            UserReadSerializer(user).data,
            status=status.HTTP_201_CREATED,
        )
