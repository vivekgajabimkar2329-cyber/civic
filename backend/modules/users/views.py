from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema

from common.exceptions import NotFoundException
from common.permissions import IsSuperAdminOrCityAdmin
from modules.users.serializers import (
    UserCreateSerializer,
    UserReadSerializer,
    UserUpdateSerializer,
)
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


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, request, pk):
        try:
            obj = UserService().get_user_by_id(pk)
            # Allow access if the user is an Admin OR is retrieving/updating their own account
            is_admin = (
                request.user.is_superuser
                or request.user.is_staff
                or request.user.role in ["SUPER_ADMIN", "CITY_ADMIN"]
            )
            is_self = str(obj.id) == str(request.user.id)

            if not (is_admin or is_self):
                self.permission_denied(
                    request,
                    message="You do not have permission to perform this action."
                )
            return obj
        except NotFoundException as e:
            raise NotFound(str(e))

    @extend_schema(
        summary="Retrieve user details",
        description="Get detailed profile of a specific user by ID.",
        responses={200: UserReadSerializer()},
    )
    def get(self, request, pk):
        user = self.get_object(request, pk)
        return Response(UserReadSerializer(user).data)

    @extend_schema(
        summary="Update user details",
        description="Modify a user's details. Partial updates are supported.",
        request=UserUpdateSerializer,
        responses={200: UserReadSerializer()},
    )
    def patch(self, request, pk):
        user = self.get_object(request, pk)

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

    @extend_schema(
        summary="Delete user",
        description="Permanently delete a user account by ID.",
        responses={204: None},
    )
    def delete(self, request, pk):
        # Delete should only be allowed for Admins
        is_admin = (
            request.user.is_superuser
            or request.user.is_staff
            or request.user.role in ["SUPER_ADMIN", "CITY_ADMIN"]
        )
        if not is_admin:
            self.permission_denied(
                request,
                message="Only administrators can delete user accounts."
            )
        self.get_object(request, pk)
        UserService().delete_user(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)
