from django.db import models
from django.conf import settings
from common.models import BaseModel

class Notification(BaseModel):
    class NotificationType(models.TextChoices):
        INFO = 'INFO', 'Information'
        COMPLAINT_UPDATE = 'COMPLAINT_UPDATE', 'Complaint Update'
        SYSTEM = 'SYSTEM', 'System Alert'

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="notifications"
    )
    title = models.CharField(max_length=255)
    message = models.TextField()
    notification_type = models.CharField(
        max_length=50, 
        choices=NotificationType.choices, 
        default=NotificationType.INFO
    )
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.title}"