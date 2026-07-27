from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Complaint
from .serializers import ComplaintSerializer

class ComplaintListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        complaints = Complaint.objects.all()
        serializer = ComplaintSerializer(complaints, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ComplaintSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(reporter=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ComplaintDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Complaint.objects.get(pk=pk)
        except Complaint.DoesNotExist:
            return None

    def get(self, request, pk):
        complaint = self.get_object(pk)
        if not complaint:
            return Response({"error": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ComplaintSerializer(complaint)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        complaint = self.get_object(pk)
        if not complaint:
            return Response({"error": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ComplaintSerializer(complaint, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        complaint = self.get_object(pk)
        if not complaint:
            return Response({"error": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND)
        complaint.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
