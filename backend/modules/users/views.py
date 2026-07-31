from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from common.exceptions import NotFoundException
from modules.users.serializers import (
    UserCreateSerializer,
    UserReadSerializer,
    UserUpdateSerializer,
)
from modules.users.services import UserService


class UserListCreateView(APIView):
    def get_permissions(self):
        # POST (registration) is public, GET requires login
        if self.request.method == "POST":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request):
        users = UserService().list_users()
        serializer = UserReadSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = UserService().create_user(serializer.validated_data)

        return Response(
            UserReadSerializer(user).data,
            status=status.HTTP_201_CREATED,
        )


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return UserService().get_user_by_id(pk)
        except NotFoundException as e:
            raise NotFound(str(e))

    def get(self, request, pk):
        user = self.get_object(pk)
        return Response(UserReadSerializer(user).data)

    def patch(self, request, pk):
        user = self.get_object(pk)

        serializer = UserUpdateSerializer(
            user,
            data=request.data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)

        user = UserService().update_user(
            pk,
            serializer.validated_data,
        )

        return Response(UserReadSerializer(user).data)

    def delete(self, request, pk):
        self.get_object(pk)
        UserService().delete_user(pk)

        return Response(
            {"message": "User deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )