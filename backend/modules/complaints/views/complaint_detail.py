from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied

from drf_spectacular.utils import extend_schema, inline_serializer

from modules.complaints.serializers import (
    ComplaintReadSerializer,
    ComplaintUpdateSerializer,
)
from modules.complaints.services import ComplaintService


class ComplaintDetailView(APIView):
    """
    Retrieve, update, or delete a complaint.
    """

    permission_classes = [IsAuthenticated]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.service = ComplaintService()

    def _is_admin(self, user):
        return (
            user.is_superuser
            or user.is_staff
            or user.role in [
                "SUPER_ADMIN",
                "CITY_ADMIN",
            ]
        )

    def _check_view_permission(self, user, complaint):

        if self._is_admin(user):
            return

        if user.role == "CITIZEN":

            if complaint.user != user:
                raise PermissionDenied(
                    "You do not have permission to view "
                    "this complaint."
                )

        elif user.role in [
            "DEPARTMENT_HEAD",
            "OFFICER",
        ]:

            if complaint.department != user.department:
                raise PermissionDenied(
                    "You do not have permission to view "
                    "complaints outside your department."
                )

    def _check_modify_permission(self, user, complaint):

        if self._is_admin(user):
            return

        if complaint.user != user:
            raise PermissionDenied(
                "You do not have permission to modify "
                "this complaint."
            )

    @extend_schema(
        summary="Retrieve complaint details",
        description="Get full details of a complaint by ID.",
        operation_id="retrieve_complaint",
        responses={
            200: inline_serializer(
                name="ComplaintDetailResponse",
                fields={
                    "success": serializers.BooleanField(
                        default=True
                    ),
                    "data": ComplaintReadSerializer(),
                },
            )
        },
    )
    def get(self, request, pk):

        complaint = self.service.get_complaint_by_id(pk)

        self._check_view_permission(
            request.user,
            complaint,
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

    @extend_schema(
        summary="Update a complaint",
        description=(
            "Modify an existing complaint. "
            "Partial updates are supported."
        ),
        operation_id="update_complaint",
        request=ComplaintUpdateSerializer,
        responses={
            200: inline_serializer(
                name="ComplaintUpdateResponse",
                fields={
                    "success": serializers.BooleanField(
                        default=True
                    ),
                    "data": ComplaintReadSerializer(),
                },
            )
        },
    )
    def put(self, request, pk):

        complaint = self.service.get_complaint_by_id(pk)

        self._check_modify_permission(
            request.user,
            complaint,
        )

        serializer = ComplaintUpdateSerializer(
            data=request.data,
            partial=True,
        )

        serializer.is_valid(
            raise_exception=True
        )

        complaint = self.service.update_complaint(
            pk,
            serializer.validated_data,
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

    @extend_schema(
        summary="Delete a complaint",
        description="Delete a complaint by ID.",
        operation_id="delete_complaint",
    )
    def delete(self, request, pk):

        complaint = self.service.get_complaint_by_id(pk)

        self._check_modify_permission(
            request.user,
            complaint,
        )

        self.service.delete_complaint(pk)

        return Response(
            {
                "success": True,
                "message": "Complaint deleted successfully.",
            },
            status=status.HTTP_204_NO_CONTENT,
        )
