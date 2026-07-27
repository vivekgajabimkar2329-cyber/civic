from common.exceptions import NotFoundException
from modules.complaints.models import Complaint
from modules.complaints.repositories import ComplaintRepository


class ComplaintService:

    def __init__(self):
        self.repository = ComplaintRepository()

    def list_all_complaints(self):
        return self.repository.get_all()

    def list_user_complaints(self, user):
        # Admins or staff see all, regular users see only their own complaints
        if user.is_staff or user.is_superuser:
            return self.repository.get_all()
        return self.repository.get_by_user(user.id)

    def get_complaint_by_id(self, complaint_id: str) -> Complaint:
        complaint = self.repository.get_by_id(complaint_id)
        if not complaint:
            raise NotFoundException("Complaint not found.")
        return complaint

    def create_complaint(self, user, data: dict) -> Complaint:
        data["user"] = user
        return self.repository.create(data)

    def update_complaint(self, complaint_id: str, data: dict) -> Complaint:
        complaint = self.get_complaint_by_id(complaint_id)
        return self.repository.update(complaint, data)

    def delete_complaint(self, complaint_id: str) -> None:
        complaint = self.get_complaint_by_id(complaint_id)
        self.repository.delete(complaint)