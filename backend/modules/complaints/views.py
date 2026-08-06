from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema, inline_serializer

from modules.complaints.models import Complaint
from modules.complaints.serializers import (
    ComplaintCreateSerializer,
    ComplaintReadSerializer,
    ComplaintUpdateSerializer,
)
from modules.complaints.services import ComplaintService


class ComplaintListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == "POST":
            from common.permissions import IsCitizen
            return [IsCitizen()]
        return [IsAuthenticated()]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.service = ComplaintService()

    @extend_schema(
        summary="List user complaints",
        description="Retrieve a list of complaints submitted by or assigned to the authenticated user.",
        operation_id="list_complaints",
        responses={
            200: inline_serializer(
                name="ComplaintListResponse",
                fields={
                    "success": serializers.BooleanField(default=True),
                    "data": ComplaintReadSerializer(many=True),
                },
            )
        },
    )
    def get(self, request):
        complaints = self.service.list_user_complaints(request.user)
        serializer = ComplaintReadSerializer(complaints, many=True)
        return Response(
            {"success": True, "data": serializer.data}, status=status.HTTP_200_OK
        )

    @extend_schema(
        summary="Create a new complaint",
        description="Submit a new complaint on behalf of the authenticated user.",
        request=ComplaintCreateSerializer,
        responses={
            201: inline_serializer(
                name="ComplaintCreateResponse",
                fields={
                    "success": serializers.BooleanField(default=True),
                    "data": ComplaintReadSerializer(),
                },
            )
        },
    )
    def post(self, request):
        serializer = ComplaintCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        complaint = self.service.create_complaint(
            request.user, serializer.validated_data
        )
        return Response(
            {"success": True, "data": ComplaintReadSerializer(complaint).data},
            status=status.HTTP_201_CREATED,
        )


class ComplaintDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.service = ComplaintService()

    @extend_schema(
        summary="Retrieve complaint details",
        description="Get full details of a specific complaint by ID.",
        operation_id="retrieve_complaint",
        responses={
            200: inline_serializer(
                name="ComplaintDetailResponse",
                fields={
                    "success": serializers.BooleanField(default=True),
                    "data": ComplaintReadSerializer(),
                },
            )
        },
    )
    def get(self, request, pk):
        complaint = self.service.get_complaint_by_id(pk)
        
        from rest_framework.exceptions import PermissionDenied
        user = request.user
        is_admin = user.is_superuser or user.is_staff or user.role in ["SUPER_ADMIN", "CITY_ADMIN"]
        if not is_admin:
            if user.role == "CITIZEN" and complaint.user != user:
                raise PermissionDenied("You do not have permission to view this complaint.")
            elif user.role in ["DEPARTMENT_HEAD", "OFFICER"] and complaint.department != user.department:
                raise PermissionDenied("You do not have permission to view complaints outside your department.")

        return Response(
            {"success": True, "data": ComplaintReadSerializer(complaint).data},
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        summary="Update a complaint",
        description="Modify an existing complaint. Partial updates are supported.",
        request=ComplaintUpdateSerializer,
        responses={
            200: inline_serializer(
                name="ComplaintUpdateResponse",
                fields={
                    "success": serializers.BooleanField(default=True),
                    "data": ComplaintReadSerializer(),
                },
            )
        },
    )
    def put(self, request, pk):
        complaint = self.service.get_complaint_by_id(pk)

        from rest_framework.exceptions import PermissionDenied
        user = request.user
        is_admin = user.is_superuser or user.is_staff or user.role in ["SUPER_ADMIN", "CITY_ADMIN"]
        if not is_admin and complaint.user != user:
            raise PermissionDenied("You do not have permission to update this complaint.")

        serializer = ComplaintUpdateSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        complaint = self.service.update_complaint(pk, serializer.validated_data)
        return Response(
            {"success": True, "data": ComplaintReadSerializer(complaint).data},
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        summary="Delete a complaint",
        description="Permanently delete a complaint by its ID.",
        responses={
            204: inline_serializer(
                name="ComplaintDeleteResponse",
                fields={
                    "success": serializers.BooleanField(default=True),
                    "message": serializers.CharField(),
                },
            )
        },
    )
    def delete(self, request, pk):
        complaint = self.service.get_complaint_by_id(pk)

        from rest_framework.exceptions import PermissionDenied
        user = request.user
        is_admin = user.is_superuser or user.is_staff or user.role in ["SUPER_ADMIN", "CITY_ADMIN"]
        if not is_admin and complaint.user != user:
            raise PermissionDenied("You do not have permission to delete this complaint.")

        self.service.delete_complaint(pk)
        return Response(
            {"success": True, "message": "Complaint deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )


class ComplaintAssignView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        summary="Assign a complaint to an officer",
        description="Allows a Department Head (or Admin) to assign a complaint to an officer in their department.",
        request=inline_serializer(
            name="ComplaintAssignRequest",
            fields={
                "officer_id": serializers.UUIDField()
            }
        ),
        responses={
            200: inline_serializer(
                name="ComplaintAssignResponse",
                fields={
                    "success": serializers.BooleanField(default=True),
                    "data": ComplaintReadSerializer(),
                }
            )
        }
    )
    def patch(self, request, pk):
        officer_id = request.data.get("officer_id")
        if not officer_id:
            return Response(
                {"success": False, "message": "officer_id is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        service = ComplaintService()
        complaint = service.assign_complaint(pk, officer_id, request.user)
        return Response(
            {"success": True, "data": ComplaintReadSerializer(complaint).data},
            status=status.HTTP_200_OK
        )


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


