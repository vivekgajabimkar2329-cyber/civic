from rest_framework import serializers

def validate_file(file):
    max_size = 10 * 1024 * 1024  # 10 MB

    if file.size > max_size:
        raise serializers.ValidationError(
            "File size should not exceed 10 MB."
        )

    allowed_extensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".pdf",
        ".doc",
        ".docx"
    ]

    filename = file.name.lower()

    if not any(filename.endswith(ext) for ext in allowed_extensions):
        raise serializers.ValidationError(
            "Unsupported file type."
        )

    return file