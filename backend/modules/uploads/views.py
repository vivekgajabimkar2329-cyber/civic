from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated

from common.responses import success_response
from modules.uploads.serializers import (
    FileUploadInputSerializer,
    UploadedFileSerializer,
)
from modules.uploads.services import UploadService


class FileUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

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