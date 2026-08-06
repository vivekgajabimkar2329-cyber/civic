from django.db import models
from common.models import BaseModel


class Department(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    #code = models.CharField(max_length=20, unique=True)
    code = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "departments"

    def __str__(self):
        return self.name