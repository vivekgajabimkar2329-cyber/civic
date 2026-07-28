from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, inline_serializer

class FileUploadAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

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
        file_obj = request.FILES.get("file")
        if not file_obj:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        # Return mock uploaded file details
        return Response({
            "message": "File uploaded successfully",
            "filename": file_obj.name,
            "size": file_obj.size,
            "url": f"/media/uploads/{file_obj.name}"
        }, status=status.HTTP_201_CREATED)

