from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated

class FileUploadAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

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
