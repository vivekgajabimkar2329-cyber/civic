from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_spectacular.utils import extend_schema, inline_serializer

from modules.complaints.models import Complaint
from modules.complaints.serializers import ComplaintReadSerializer
from modules.complaints.services import ComplaintService


class ComplaintStatusView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        summary="Update complaint status",
        description="Allows the assigned officer (or Admin) to update the status of a complaint.",
        request=inline_serializer(
            name="ComplaintStatusRequest",
            fields={
                "status": serializers.ChoiceField(choices=Complaint.STATUS_CHOICES)
            }
        ),
        responses={
            200: inline_serializer(
                name="ComplaintStatusResponse",
                fields={
                    "success": serializers.BooleanField(default=True),
                    "data": ComplaintReadSerializer(),
                }
            )
        }
    )
    def patch(self, request, pk):
        new_status = request.data.get("status")
        if not new_status:
            return Response(
                {"success": False, "message": "status is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        service = ComplaintService()
        complaint = service.update_complaint_status(pk, new_status, request.user)
        return Response(
            {"success": True, "data": ComplaintReadSerializer(complaint).data},
            status=status.HTTP_200_OK
        )
