from django.db import models

from common.models import BaseModel


class ComplaintImage(BaseModel):

    complaint = models.ForeignKey(
        "complaints.Complaint",
        on_delete=models.CASCADE,
        related_name="images",
    )

    image = models.ImageField(
        upload_to="complaints/images/"
    )

    description = models.CharField(
        max_length=255,
        blank=True,
        null=True,
    )

    class Meta:
        db_table = "complaint_images"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Image for Complaint #{self.complaint_id}"
