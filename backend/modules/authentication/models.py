from django.conf import settings
from django.db import models
from common.models import BaseModel


class LoginHistory(BaseModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="login_history"
    )
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    login_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "auth_login_history"
        ordering = ["-login_time"]

    def __str__(self):
        return f"{self.user} - {self.login_time}"


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