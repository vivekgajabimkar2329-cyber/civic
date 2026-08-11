from django.conf import settings
from django.db import models
from common.models import BaseModel


class OTP(BaseModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="otps"
    )
    code = models.CharField(max_length=6)
    purpose = models.CharField(max_length=50)
    is_verified = models.BooleanField(default=False)
    expires_at = models.DateTimeField()

    class Meta:
        db_table = "auth_otps"

    def __str__(self):
        return f"{self.user} - {self.code}"
