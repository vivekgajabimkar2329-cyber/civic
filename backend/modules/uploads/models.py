from django.db import models
from django.conf import settings
from common.models import BaseModel

class UploadedFile(BaseModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="uploaded_files"
    )
    file = models.FileField(upload_to="uploads/%Y/%m/%d/")
    original_name = models.CharField(max_length=255)
    file_type = models.CharField(max_length=100)
    file_size = models.PositiveIntegerField(help_text="Size in bytes")

    def __str__(self):
        return f"{self.original_name} - {self.user.username}"