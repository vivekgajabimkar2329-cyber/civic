from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, inline_serializer

from common.responses import success_response
from ..serializers import (
    FileUploadInputSerializer,
    UploadedFileSerializer,
)
from ..services import UploadService


class FileUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @extend_schema(
        summary="Upload a file",
        description="Upload a media file (image, document, etc.) to the platform.",
        request=inline_serializer(
            name="FileUploadRequest",
            fields={
                "file": serializers.FileField(),
            }
        ),
        responses={
            201: inline_serializer(
                name="FileUploadSuccessResponse",
                fields={
                    "message": serializers.CharField(default="File uploaded successfully"),
                    "filename": serializers.CharField(),
                    "size": serializers.IntegerField(),
                    "url": serializers.CharField(),
                }
            ),
            400: inline_serializer(
                name="FileUploadErrorResponse",
                fields={
                    "error": serializers.CharField(default="No file uploaded")
                }
            )
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = FileUploadInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        file_instance = UploadService.handle_upload(
            user=request.user,
            file_obj=serializer.validated_data["file"],
        )

        output_serializer = UploadedFileSerializer(file_instance)

        return success_response(
            data=output_serializer.data,
            message="File uploaded successfully",
            status_code=201,
        )
