from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class ReportListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Return a list of mock reports
        reports = [
            {
                "id": "1",
                "name": "Monthly Complaints Summary - June 2026",
                "type": "PDF",
                "status": "COMPLETED",
                "url": "/media/reports/june_2026.pdf",
            },
            {
                "id": "2",
                "name": "Department Performance Analysis Q2",
                "type": "CSV",
                "status": "COMPLETED",
                "url": "/media/reports/q2_performance.csv",
            },
        ]
        return Response(reports, status=status.HTTP_200_OK)

    def post(self, request):
        # Trigger generation of a new report
        report_type = request.data.get("type", "PDF")
        name = request.data.get("name", "Generated Report")

        new_report = {
            "id": "3",
            "name": name,
            "type": report_type,
            "status": "PROCESSING",
            "url": None,
        }
        return Response(new_report, status=status.HTTP_201_CREATED)
