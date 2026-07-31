from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from drf_spectacular.utils import extend_schema, inline_serializer

from .serializers import DepartmentSerializer
from .services import DepartmentService
from .permissions import DepartmentPermission


class DepartmentAPIView(APIView):
    permission_classes = [DepartmentPermission]

    @extend_schema(
        summary="List departments",
        description="Retrieve a list of all departments.",
        responses={200: DepartmentSerializer(many=True)},
    )
    def get(self, request):

        departments = DepartmentService.list_departments()

        serializer = DepartmentSerializer(
            departments,
            many=True
        )

        return Response(serializer.data)

    @extend_schema(
        summary="Create department",
        description="Add a new department.",
        request=DepartmentSerializer,
        responses={
            201: DepartmentSerializer,
            400: inline_serializer(
                name="DepartmentValidationError",
                fields={
                    "errors": serializers.DictField(child=serializers.ListField(child=serializers.CharField()))
                }
            )
        },
    )
    def post(self, request):

        serializer = DepartmentSerializer(data=request.data)

        if serializer.is_valid():

            DepartmentService.create_department(
                serializer.validated_data
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class DepartmentDetailAPIView(APIView):
    permission_classes = [DepartmentPermission]

    @extend_schema(
        summary="Retrieve department details",
        description="Get details of a specific department by ID.",
        responses={
            200: DepartmentSerializer,
            404: inline_serializer(
                name="DepartmentNotFoundResponse",
                fields={"message": serializers.CharField(default="Department not found")}
            )
        },
    )
    def get(self, request, pk):

        department = DepartmentService.get_department(pk)

        if not department:
            return Response(
                {"message": "Department not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = DepartmentSerializer(department)

        return Response(serializer.data)

    @extend_schema(
        summary="Update department",
        description="Modify an existing department's details.",
        request=DepartmentSerializer,
        responses={
            200: DepartmentSerializer,
            404: inline_serializer(
                name="DepartmentUpdateNotFoundResponse",
                fields={"message": serializers.CharField(default="Department not found")}
            )
        },
    )
    def put(self, request, pk):

        department = DepartmentService.get_department(pk)

        if not department:
            return Response(
                {"message": "Department not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = DepartmentSerializer(
            department,
            data=request.data
        )

        if serializer.is_valid():

            DepartmentService.update_department(
                department,
                serializer.validated_data
            )

            return Response(serializer.data)

        return Response(serializer.errors)

    @extend_schema(
        summary="Delete department",
        description="Delete a department by ID.",
        responses={
            204: inline_serializer(
                name="DepartmentDeleteResponse",
                fields={"message": serializers.CharField(default="Department deleted successfully")}
            ),
            404: inline_serializer(
                name="DepartmentDeleteNotFoundResponse",
                fields={"message": serializers.CharField(default="Department not found")}
            )
        },
    )
    def delete(self, request, pk):

        department = DepartmentService.get_department(pk)

        if not department:
            return Response(
                {"message": "Department not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        DepartmentService.delete_department(department)

        return Response(
            {"message": "Department deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )

