from django.contrib import admin
from .models import Complaint


@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "category",
        "status",
        "priority",
        "user",
        "assigned_to",
        "created_at",
    )

    list_filter = (
        "status",
        "priority",
        "category",
        "created_at",
    )

    search_fields = (
        "title",
        "description",
        "user__email",
        "assigned_to__email",
    )

    ordering = ("-created_at",)
