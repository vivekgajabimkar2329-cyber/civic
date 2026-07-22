import re

from rest_framework.exceptions import ValidationError


def validate_password(password):

    if len(password) < 8:
        raise ValidationError("Password must contain at least 8 characters.")

    if not re.search(r"[A-Z]", password):
        raise ValidationError("Password must contain one uppercase letter.")

    if not re.search(r"[a-z]", password):
        raise ValidationError("Password must contain one lowercase letter.")

    if not re.search(r"[0-9]", password):
        raise ValidationError("Password must contain one digit.")

    return password