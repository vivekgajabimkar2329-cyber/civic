from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_spectacular.utils import extend_schema, inline_serializer

from modules.complaints.serializers import ComplaintReadSerializer
from modules.complaints.services import ComplaintService


class ComplaintListView(APIView):
    """
    List complaints available to the authenticated user.
    """

    permission_classes = [IsAuthenticated]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.service = ComplaintService()

    @extend_schema(
        summary="List user complaints",
        description=(
            "Retrieve complaints submitted by or assigned "
            "to the authenticated user."
        ),
        operation_id="list_complaints",
        responses={
            200: inline_serializer(
                name="ComplaintListResponse",
                fields={
                    "success": serializers.BooleanField(
                        default=True
                    ),
                    "data": ComplaintReadSerializer(
                        many=True
                    ),
                },
            )
        },
    )
    def get(self, request):
        complaints = self.service.list_user_complaints(
            request.user
        )

        serializer = ComplaintReadSerializer(
            complaints,
            many=True
        )

        return Response(
            {
                "success": True,
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )
