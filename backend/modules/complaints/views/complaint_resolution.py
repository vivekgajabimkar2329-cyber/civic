from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_spectacular.utils import extend_schema, inline_serializer

from modules.complaints.serializers import ComplaintReadSerializer
from modules.complaints.services import ComplaintService


class ComplaintResolutionView(APIView):
    """
    Handle complaint resolution confirmation.
    """

    permission_classes = [IsAuthenticated]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.service = ComplaintService()

    @extend_schema(
        summary="Confirm complaint resolution",
        description=(
            "Allows the citizen who created the complaint "
            "to confirm the resolution."
        ),
        operation_id="confirm_complaint_resolution",
        request=inline_serializer(
            name="ComplaintResolutionRequest",
            fields={
                "confirmed": serializers.BooleanField(),
                "comment": serializers.CharField(
                    required=False
                ),
            },
        ),
        responses={
            200: inline_serializer(
                name="ComplaintResolutionResponse",
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

        confirmed = request.data.get(
            "confirmed"
        )

        if confirmed is None:
            return Response(
                {
                    "success": False,
                    "message": "confirmed is required.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        complaint = self.service.confirm_resolution(
            complaint_id=pk,
            user=request.user,
            confirmed=confirmed,
            comment=request.data.get("comment"),
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
