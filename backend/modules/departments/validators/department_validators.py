from rest_framework.exceptions import ValidationError
from ..models import Department


def validate_department_name(name):
    """
    Validate department name.
    """

    if not name:
        raise ValidationError("Department name is required.")

    name = name.strip()

    if len(name) < 3:
        raise ValidationError(
            "Department name must be at least 3 characters long."
        )

    if Department.objects.filter(name__iexact=name).exists():
        raise ValidationError(
            "Department already exists."
        )

    return name


def validate_description(description):
    """
    Validate department description.
    """

    if description and len(description.strip()) < 10:
        raise ValidationError(
            "Description must be at least 10 characters long."
        )

    return description
