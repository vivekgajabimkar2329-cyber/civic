from rest_framework import serializers
from .models import Complaint

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = [
            "id",
            "title",
            "description",
            "status",
            "reporter",
            "department",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
