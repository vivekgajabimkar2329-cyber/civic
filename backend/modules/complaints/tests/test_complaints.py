from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

from modules.departments.models import Department
from modules.complaints.models import Complaint

User = get_user_model()


class ComplaintRBACTestCase(APITestCase):

    def setUp(self):
        # 1. Create Departments
        self.transport_dept = Department.objects.create(
            name="Transport",
            description="Handles transport issues"
        )
        self.water_dept = Department.objects.create(
            name="Water",
            description="Handles water issues"
        )

        # 2. Create Users
        self.citizen_ali = User.objects.create_user(
            email="ali@gmail.com",
            password="password123",
            role="CITIZEN"
        )
        self.citizen_bob = User.objects.create_user(
            email="bob@gmail.com",
            password="password123",
            role="CITIZEN"
        )
        self.officer_ravi = User.objects.create_user(
            email="ravi@gmail.com",
            password="password123",
            role="OFFICER",
            department=self.transport_dept
        )
        self.officer_mahesh = User.objects.create_user(
            email="mahesh@gmail.com",
            password="password123",
            role="OFFICER",
            department=self.water_dept
        )
        self.head_priya = User.objects.create_user(
            email="priya@gmail.com",
            password="password123",
            role="DEPARTMENT_HEAD",
            department=self.transport_dept
        )
        self.super_admin = User.objects.create_user(
            email="admin@gmail.com",
            password="password123",
            role="SUPER_ADMIN"
        )

        # 3. Create a Complaint (Transport)
        self.transport_complaint = Complaint.objects.create(
            title="Traffic Signal broken",
            description="The traffic signal at the junction is broken",
            category="Roads",
            user=self.citizen_ali,
            department=self.transport_dept
        )

    def test_citizen_can_create_complaint(self):
        self.client.force_authenticate(user=self.citizen_ali)
        data = {
            "title": "Pothole on main road",
            "description": "Large pothole causing traffic",
            "category": "Roads",
            "priority": "HIGH",
            "department": str(self.transport_dept.id)
        }
        response = self.client.post("/api/complaints/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["success"], True)

    def test_officer_cannot_create_complaint(self):
        self.client.force_authenticate(user=self.officer_ravi)
        data = {
            "title": "Officer complaint",
            "description": "Should fail",
            "category": "General",
        }
        response = self.client.post("/api/complaints/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_citizen_can_only_view_own_complaints(self):
        # Ali can view their own complaint
        self.client.force_authenticate(user=self.citizen_ali)
        response = self.client.get(f"/api/complaints/{self.transport_complaint.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Bob cannot view Ali's complaint
        self.client.force_authenticate(user=self.citizen_bob)
        response = self.client.get(f"/api/complaints/{self.transport_complaint.id}/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_officer_can_view_department_complaints(self):
        # Ravi is in Transport, can view the Transport complaint
        self.client.force_authenticate(user=self.officer_ravi)
        response = self.client.get(f"/api/complaints/{self.transport_complaint.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Mahesh is in Water, cannot view the Transport complaint
        self.client.force_authenticate(user=self.officer_mahesh)
        response = self.client.get(f"/api/complaints/{self.transport_complaint.id}/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_department_head_can_assign_complaint(self):
        self.client.force_authenticate(user=self.head_priya)
        data = {"officer_id": str(self.officer_ravi.id)}
        response = self.client.patch(
            f"/api/complaints/{self.transport_complaint.id}/assign/",
            data,
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.transport_complaint.refresh_from_db()
        self.assertEqual(self.transport_complaint.assigned_to, self.officer_ravi)
        self.assertEqual(self.transport_complaint.status, "IN_PROGRESS")

    def test_department_head_cannot_assign_officer_from_different_department(self):
        self.client.force_authenticate(user=self.head_priya)
        # Mahesh is Water officer, complaint is Transport
        data = {"officer_id": str(self.officer_mahesh.id)}
        response = self.client.patch(
            f"/api/complaints/{self.transport_complaint.id}/assign/",
            data,
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_officer_cannot_assign_complaint(self):
        self.client.force_authenticate(user=self.officer_ravi)
        data = {"officer_id": str(self.officer_ravi.id)}
        response = self.client.patch(
            f"/api/complaints/{self.transport_complaint.id}/assign/",
            data,
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_assigned_officer_can_update_status(self):
        # First assign it to Ravi
        self.transport_complaint.assigned_to = self.officer_ravi
        self.transport_complaint.save()

        self.client.force_authenticate(user=self.officer_ravi)
        data = {"status": "RESOLVED"}
        response = self.client.patch(
            f"/api/complaints/{self.transport_complaint.id}/status/",
            data,
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.transport_complaint.refresh_from_db()
        self.assertEqual(self.transport_complaint.status, "RESOLVED")

    def test_unassigned_officer_cannot_update_status(self):
        self.client.force_authenticate(user=self.officer_mahesh)
        data = {"status": "RESOLVED"}
        response = self.client.patch(
            f"/api/complaints/{self.transport_complaint.id}/status/",
            data,
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
