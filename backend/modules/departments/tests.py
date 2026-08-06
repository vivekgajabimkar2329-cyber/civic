from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

from .models import Department

User = get_user_model()


class DepartmentAPITestCase(APITestCase):

    def setUp(self):
        self.admin_user = User.objects.create_user(
            email="admin@gmail.com",
            password="adminpassword",
            is_staff=True
        )
        self.department = Department.objects.create(
            name="Water Department",
            description="Handles water complaints"
        )

    def test_create_department(self):
        self.client.force_authenticate(user=self.admin_user)
        data = {
            "name": "Electricity Department",
            "description": "Handles electricity complaints"
        }

        response = self.client.post(
            "/api/departments/",
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )

    def test_get_all_departments(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(
            "/api/departments/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    def test_get_department_by_id(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(
            f"/api/departments/{self.department.id}/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    def test_update_department(self):
        self.client.force_authenticate(user=self.admin_user)

        data = {
            "name": "Updated Department",
            "description": "Updated description"
        }

        response = self.client.put(
            f"/api/departments/{self.department.id}/",
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    def test_delete_department(self):
        self.client.force_authenticate(user=self.admin_user)

        response = self.client.delete(
            f"/api/departments/{self.department.id}/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT
        )
