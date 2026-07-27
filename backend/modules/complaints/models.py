from django.conf import settings
from django.db import models
from common.models import BaseModel
from modules.departments.models import Department


class Complaint(BaseModel):
    STATUS_CHOICES = (
from django.db import models
from django.conf import settings
from common.models import BaseModel

class Complaint(BaseModel):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("IN_PROGRESS", "In Progress"),
        ("RESOLVED", "Resolved"),
        ("REJECTED", "Rejected"),
    )

    PRIORITY_CHOICES = (
        ("LOW", "Low"),
        ("MEDIUM", "Medium"),
        ("HIGH", "High"),
        ("URGENT", "Urgent"),
    )

    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100, blank=True, null=True)

    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="PENDING"
    )
    priority = models.CharField(
        max_length=20, choices=PRIORITY_CHOICES, default="MEDIUM"
    )

    # Foreign Keys
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="complaints",
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="complaints",
    )

    def __str__(self):
        return f"{self.title} - {self.status}"
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="PENDING")
    reporter = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="complaints"
    )
    department = models.ForeignKey(
        "departments.Department",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="complaints"
    )

    class Meta:
        db_table = "complaints"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
