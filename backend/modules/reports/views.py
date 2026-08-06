from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from common.permissions import IsAdminOrDepartmentHead
from .serializers import ReportSerializer
from .services import ReportService


class ReportListCreateView(APIView):
    permission_classes = [IsAdminOrDepartmentHead]

    def get(self, request):
        reports = ReportService.list_reports()
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ReportSerializer(data=request.data)

        if serializer.is_valid():
            report = ReportService.create_report(serializer.validated_data)
            return Response(
                ReportSerializer(report).data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReportDetailView(APIView):
    permission_classes = [IsAdminOrDepartmentHead]

    def get(self, request, id):
        report = ReportService.get_report(id)
        serializer = ReportSerializer(report)
        return Response(serializer.data)

    def put(self, request, id):
        report = ReportService.get_report(id)
        serializer = ReportSerializer(report, data=request.data)

        if serializer.is_valid():
            updated = ReportService.update_report(id, serializer.validated_data)
            return Response(ReportSerializer(updated).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        ReportService.delete_report(id)
        return Response(
            {"message": "Deleted Successfully"},
            status=status.HTTP_204_NO_CONTENT
        )


class ReportStatisticsView(APIView):
    permission_classes = [IsAdminOrDepartmentHead]

    def get(self, request):
        return Response(ReportService.statistics())