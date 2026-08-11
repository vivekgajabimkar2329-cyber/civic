from django.conf import settings
from django.db import models

from common.models import BaseModel


class ComplaintStatusHistory(BaseModel):

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("IN_PROGRESS", "In Progress"),
        ("RESOLVED", "Resolved"),
        ("REJECTED", "Rejected"),
        ("CLOSED", "Closed"),
    ]

    complaint = models.ForeignKey(
        "complaints.Complaint",
        on_delete=models.CASCADE,
        related_name="status_history",
    )

    old_status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        null=True,
        blank=True,
    )

    new_status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
    )

    changed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="complaint_status_changes",
    )

    comment = models.TextField(
        blank=True,
        null=True,
    )

    class Meta:
        db_table = "complaint_status_history"
        ordering = ["-created_at"]

    def __str__(self):
        return (
            f"Complaint #{self.complaint_id}: "
            f"{self.old_status} → {self.new_status}"
        )
