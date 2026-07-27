from rest_framework import serializers
from modules.users.models import User


class UserReadSerializer(serializers.ModelSerializer):
from .models import User, Role, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "is_active",
            "created_at",
        ]


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "phone_number",
        ]


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "phone_number", "is_active"]
            "email",
            "first_name",
            "last_name",
            "department",
            "is_active",
            "is_staff",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ["id", "name", "users", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["id", "user", "phone_number", "address", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
