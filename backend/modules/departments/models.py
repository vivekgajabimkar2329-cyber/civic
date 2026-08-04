from django.db import models
from common.models import BaseModel


class Department(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        db_table = "departments"

    def __str__(self):
        return self.name

