from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_spectacular.utils import extend_schema, inline_serializer

from common.permissions import IsCitizen

from modules.complaints.serializers import (
    ComplaintCreateSerializer,
    ComplaintReadSerializer,
)
from modules.complaints.services import ComplaintService


class ComplaintCreateView(APIView):
    """
    Create a new complaint.
    """

    permission_classes = [IsCitizen]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.service = ComplaintService()

    @extend_schema(
        summary="Create a new complaint",
        description=(
            "Submit a new complaint on behalf of "
            "the authenticated citizen."
        ),
        operation_id="create_complaint",
        request=ComplaintCreateSerializer,
        responses={
            201: inline_serializer(
                name="ComplaintCreateResponse",
                fields={
                    "success": serializers.BooleanField(
                        default=True
                    ),
                    "data": ComplaintReadSerializer(),
                },
            )
        },
    )
    def post(self, request):

        serializer = ComplaintCreateSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        complaint = self.service.create_complaint(
            request.user,
            serializer.validated_data,
        )

        return Response(
            {
                "success": True,
                "data": ComplaintReadSerializer(
                    complaint
                ).data,
            },
            status=status.HTTP_201_CREATED,
        )
