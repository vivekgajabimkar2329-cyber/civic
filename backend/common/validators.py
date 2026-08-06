from rest_framework.exceptions import ValidationError

ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'pdf', 'docx']
MAX_FILE_SIZE_MB = 10

def validate_file(file_obj):
    ext = file_obj.name.split('.')[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise ValidationError(f"File format not supported. Allowed formats: {', '.join(ALLOWED_EXTENSIONS)}")
    
    if file_obj.size > MAX_FILE_SIZE_MB * 1024 * 1024:
        raise ValidationError(f"File size exceeds the {MAX_FILE_SIZE_MB}MB limit.")