from common.exceptions import NotFoundException
from modules.complaints.models import Complaint
from modules.complaints.repositories import ComplaintRepository


class ComplaintService:

    def __init__(self):
        self.repository = ComplaintRepository()

    def list_all_complaints(self):
        return self.repository.get_all()

    def list_user_complaints(self, user):
        # Admins see all, department heads and officers see their department complaints, citizens see only their own
        if user.is_superuser or user.is_staff or user.role in ["SUPER_ADMIN", "CITY_ADMIN"]:
            return self.repository.get_all()
        elif user.role in ["DEPARTMENT_HEAD", "OFFICER"]:
            if user.department:
                return self.repository.get_by_department(user.department.id)
            return Complaint.objects.none()
        else:
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

    def assign_complaint(self, complaint_id: str, officer_id: str, assigner_user) -> Complaint:
        from modules.users.models import User
        from rest_framework.exceptions import PermissionDenied, ValidationError

        complaint = self.get_complaint_by_id(complaint_id)

        # Assigner must be Department Head or Admin
        if assigner_user.role == "DEPARTMENT_HEAD":
            if not assigner_user.department or complaint.department != assigner_user.department:
                raise PermissionDenied("You can only assign complaints within your own department.")
        elif assigner_user.role not in ["SUPER_ADMIN", "CITY_ADMIN"] and not assigner_user.is_superuser and not assigner_user.is_staff:
            raise PermissionDenied("You do not have permission to assign complaints.")

        # Find the officer
        try:
            officer = User.objects.get(id=officer_id, role="OFFICER")
        except User.DoesNotExist:
            raise ValidationError("Assigned user must be an Officer.")

        # Verify officer's department matches complaint's department
        if officer.department != complaint.department:
            raise ValidationError("The officer must belong to the same department as the complaint.")

        return self.repository.update(complaint, {"assigned_to": officer, "status": "IN_PROGRESS"})

    def update_complaint_status(self, complaint_id: str, status_value: str, officer_user) -> Complaint:
        from rest_framework.exceptions import PermissionDenied, ValidationError

        complaint = self.get_complaint_by_id(complaint_id)

        # Only assigned officer (or admins) can update the status
        is_admin = officer_user.is_superuser or officer_user.is_staff or officer_user.role in ["SUPER_ADMIN", "CITY_ADMIN"]
        if not is_admin and complaint.assigned_to != officer_user:
            raise PermissionDenied("You can only update status for complaints assigned to you.")

        if status_value not in [choice[0] for choice in Complaint.STATUS_CHOICES]:
            raise ValidationError(f"Invalid status choice: {status_value}")

        return self.repository.update(complaint, {"status": status_value})