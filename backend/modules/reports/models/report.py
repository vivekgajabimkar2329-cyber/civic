from django.db import models


class Report(models.Model):
    title = models.CharField(max_length=200)
    department = models.CharField(max_length=100)
    total_complaints = models.IntegerField(default=0)
    resolved = models.IntegerField(default=0)
    pending = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
