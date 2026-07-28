from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, inline_serializer

from modules.users.models import User
from modules.departments.models import Department
from modules.complaints.models import Complaint

class DashboardStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        summary="Retrieve dashboard statistics",
        description="Get key performance indicators and metrics such as total users, departments, and complaints status breakdown.",
        responses={
            200: inline_serializer(
                name="DashboardStatsResponse",
                fields={
                    "summary": inline_serializer(
                        name="DashboardStatsSummary",
                        fields={
                            "total_users": serializers.IntegerField(),
                            "total_departments": serializers.IntegerField(),
                            "total_complaints": serializers.IntegerField(),
                        }
                    ),
                    "complaints_by_status": inline_serializer(
                        name="DashboardStatsStatusBreakdown",
                        fields={
                            "pending": serializers.IntegerField(),
                            "in_progress": serializers.IntegerField(),
                            "resolved": serializers.IntegerField(),
                            "rejected": serializers.IntegerField(),
                        }
                    )
                }
            )
        }
    )
    def get(self, request):
        total_users = User.objects.count()
        total_departments = Department.objects.count()
        total_complaints = Complaint.objects.count()

        pending_complaints = Complaint.objects.filter(status="PENDING").count()
        in_progress_complaints = Complaint.objects.filter(status="IN_PROGRESS").count()
        resolved_complaints = Complaint.objects.filter(status="RESOLVED").count()
        rejected_complaints = Complaint.objects.filter(status="REJECTED").count()

        data = {
            "summary": {
                "total_users": total_users,
                "total_departments": total_departments,
                "total_complaints": total_complaints,
            },
            "complaints_by_status": {
                "pending": pending_complaints,
                "in_progress": in_progress_complaints,
                "resolved": resolved_complaints,
                "rejected": rejected_complaints,
            }
        }
        return Response(data, status=status.HTTP_200_OK)

