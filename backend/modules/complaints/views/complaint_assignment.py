from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_spectacular.utils import extend_schema, inline_serializer

from modules.complaints.serializers import ComplaintReadSerializer
from modules.complaints.services import ComplaintService


class ComplaintAssignView(APIView):
    """
    Assign a complaint to an officer.
    """

    permission_classes = [IsAuthenticated]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.service = ComplaintService()

    @extend_schema(
        summary="Assign a complaint to an officer",
        description=(
            "Allows a Department Head or Admin "
            "to assign a complaint to an officer "
            "in their department."
        ),
        operation_id="assign_complaint",
        request=inline_serializer(
            name="ComplaintAssignRequest",
            fields={
                "officer_id": serializers.UUIDField()
            },
        ),
        responses={
            200: inline_serializer(
                name="ComplaintAssignResponse",
                fields={
                    "success": serializers.BooleanField(
                        default=True
                    ),
                    "data": ComplaintReadSerializer(),
                },
            )
        },
    )
    def patch(self, request, pk):

        officer_id = request.data.get(
            "officer_id"
        )

        if not officer_id:
            return Response(
                {
                    "success": False,
                    "message": "officer_id is required.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        complaint = self.service.assign_complaint(
            pk,
            officer_id,
            request.user,
        )

        return Response(
            {
                "success": True,
                "data": ComplaintReadSerializer(
                    complaint
                ).data,
            },
            status=status.HTTP_200_OK,
        )
