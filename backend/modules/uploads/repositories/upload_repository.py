from ..models import UploadedFile


class UploadRepository:
    @staticmethod
    def create_file(user, file_obj):
        return UploadedFile.objects.create(
            user=user,
            file=file_obj,
            original_name=file_obj.name,
            file_type=file_obj.content_type,
            file_size=file_obj.size
        )

    @staticmethod
    def get_by_id(file_id):
        return UploadedFile.objects.filter(id=file_id).first()
