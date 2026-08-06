from modules.uploads.repositories import UploadRepository

class UploadService:
    @staticmethod
    def handle_upload(user, file_obj):
        return UploadRepository.create_file(user, file_obj)