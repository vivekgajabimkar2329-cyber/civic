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
