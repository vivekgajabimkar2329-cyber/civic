from rest_framework import serializers
from .models import User, Role, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
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
