from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from ..models import Report

User = get_user_model()


class ReportAPITest(APITestCase):

    def setUp(self):
        self.admin_user = User.objects.create_user(
            email="report_admin@gmail.com",
            password="adminpassword",
            is_staff=True
        )
        self.client.force_authenticate(user=self.admin_user)
        self.report = Report.objects.create(
            title="Road Report",
            department="Roads",
            total_complaints=100,
            resolved=80,
            pending=20
        )

    def test_get_reports(self):
        response = self.client.get("/api/reports/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_report(self):
        data = {
            "title": "Water Report",
            "department": "Water",
            "total_complaints": 50,
            "resolved": 40,
            "pending": 10
        }

        response = self.client.post("/api/reports/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_single_report(self):
        response = self.client.get(f"/api/reports/{self.report.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_report(self):
        data = {
            "title": "Updated Road Report",
            "department": "Roads",
            "total_complaints": 120,
            "resolved": 100,
            "pending": 20
        }

        response = self.client.put(
            f"/api/reports/{self.report.id}/",
            data,
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_report(self):
        response = self.client.delete(
            f"/api/reports/{self.report.id}/"
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_statistics(self):
        response = self.client.get("/api/reports/statistics/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
