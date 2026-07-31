"""Django admin registrations for report models."""
from django.contrib import admin
from .models import Report


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "department",
        "total_complaints",
        "resolved",
        "pending",
        "created_at",
    )

    search_fields = (
        "title",
        "department",
    )

    list_filter = (
        "department",
        "created_at",
    )

    ordering = ("-created_at",)