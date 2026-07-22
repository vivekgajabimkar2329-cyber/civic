from django.db import models

from common.models import BaseModel


class Department(BaseModel):
    name = models.CharField(max_length=150, unique=True)
    code = models.CharField(max_length=30, unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "departments"
        ordering = ("name",)

    def __str__(self):
        return self.name
