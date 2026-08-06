from rest_framework import serializers
from modules.uploads.models import UploadedFile
from modules.uploads.validators import validate_file


class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = [
            'id',
            'user',
            'file',
            'original_name',
            'file_type',
            'file_size',
            'created_at'
        ]
        read_only_fields = [
            'id',
            'user',
            'original_name',
            'file_type',
            'file_size',
            'created_at'
        ]


class FileUploadInputSerializer(serializers.Serializer):
    file = serializers.FileField(validators=[validate_file])