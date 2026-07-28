from rest_framework import serializers
from modules.complaints.models import Complaint
from modules.users.serializers import UserReadSerializer


class ComplaintReadSerializer(serializers.ModelSerializer):
    user = UserReadSerializer(read_only=True)
    department = serializers.StringRelatedField()

    class Meta:
        model = Complaint
        fields = [
            "id",
            "title",
            "description",
            "category",
            "status",
            "priority",
            "user",
            "department",
            "created_at",
            "updated_at",
        ]


class ComplaintCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = ["title", "description", "category", "priority", "department"]


class ComplaintUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = [
            "title",
            "description",
            "category",
            "status",
            "priority",
            "department",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
