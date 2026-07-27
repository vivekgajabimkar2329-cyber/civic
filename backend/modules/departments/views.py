from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import DepartmentSerializer
from .services import DepartmentService
from .permissions import DepartmentPermission


class DepartmentAPIView(APIView):
    permission_classes = [DepartmentPermission]

    def get(self, request):

        departments = DepartmentService.list_departments()

        serializer = DepartmentSerializer(
            departments,
            many=True
        )

        return Response(serializer.data)

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

    def get(self, request, pk):

        department = DepartmentService.get_department(pk)

        if not department:
            return Response(
                {"message": "Department not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = DepartmentSerializer(department)

        return Response(serializer.data)

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
