from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from common.models import BaseModel


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        extra_fields.setdefault("username", email)

        if extra_fields.get("is_superuser"):
            extra_fields.setdefault("role", "SUPER_ADMIN")
        elif extra_fields.get("is_staff"):
            extra_fields.setdefault("role", "CITY_ADMIN")
        else:
            extra_fields.setdefault("role", "CITIZEN")

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser, BaseModel):
    ROLE_CHOICES = (
        ("CITIZEN", "Citizen"),
        ("OFFICER", "Officer"),
        ("DEPARTMENT_HEAD", "Department Head"),
        ("CITY_ADMIN", "City Admin"),
        ("SUPER_ADMIN", "Super Admin"),
    )

    username = models.CharField(max_length=150, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="CITIZEN")
    department = models.ForeignKey(
        "departments.Department",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users"
    )
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return f"{self.email} ({self.role})"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.role:
            from django.contrib.auth.models import Group
            group_name = self.get_role_display()
            group, _ = Group.objects.get_or_create(name=group_name)
            self.groups.set([group])