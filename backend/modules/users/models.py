from django.contrib.auth.models import AbstractUser
from django.db import models
from common.models import BaseModel


class User(AbstractUser, BaseModel):
    # Set username with default or unique/blank rules properly
    username = models.CharField(max_length=150, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return f"{self.email}"