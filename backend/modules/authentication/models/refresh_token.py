from django.conf import settings
from django.db import models
from common.models import BaseModel


class PasswordResetToken(BaseModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="password_reset_tokens"
    )
    token = models.CharField(max_length=255, unique=True)
    is_used = models.BooleanField(default=False)
    expires_at = models.DateTimeField()

    class Meta:
        db_table = "auth_password_reset_tokens"

    def __str__(self):
        return self.user.email
