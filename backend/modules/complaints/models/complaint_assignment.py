from django.conf import settings
from django.db import models

from common.models import BaseModel


class ComplaintAssignment(BaseModel):

    complaint = models.ForeignKey(
        "complaints.Complaint",
        on_delete=models.CASCADE,
        related_name="assignments",
    )

    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="complaint_assignments",
    )

    assigned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_complaint_assignments",
    )

    reason = models.TextField(
        blank=True,
        null=True,
    )

    class Meta:
        db_table = "complaint_assignments"
        ordering = ["-created_at"]

    def __str__(self):
        return (
            f"Complaint #{self.complaint_id} "
            f"assigned to User #{self.assigned_to_id}"
        )
