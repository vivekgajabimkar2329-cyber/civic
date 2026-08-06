from typing import Optional
from django.db.models import QuerySet
from modules.complaints.models import Complaint


class ComplaintRepository:

    @staticmethod
    def get_all() -> QuerySet[Complaint]:
        return Complaint.objects.select_related(
            "user", "department"
        ).order_by("-created_at")

    @staticmethod
    def get_by_user(user_id) -> QuerySet[Complaint]:
        return (
            Complaint.objects.filter(user_id=user_id)
            .select_related("department")
            .order_by("-created_at")
        )

    @staticmethod
    def get_by_department(department_id) -> QuerySet[Complaint]:
        return (
            Complaint.objects.filter(department_id=department_id)
            .select_related("user", "department")
            .order_by("-created_at")
        )

    @staticmethod
    def get_by_id(complaint_id: str) -> Optional[Complaint]:
        return (
            Complaint.objects.filter(id=complaint_id)
            .select_related("user", "department")
            .first()
        )

    @staticmethod
    def create(data: dict) -> Complaint:
        return Complaint.objects.create(**data)

    @staticmethod
    def update(complaint: Complaint, data: dict) -> Complaint:
        for attr, value in data.items():
            setattr(complaint, attr, value)
        complaint.save()
        return complaint

    @staticmethod
    def delete(complaint: Complaint) -> None:
        complaint.delete()