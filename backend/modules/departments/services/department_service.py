from ..repositories import DepartmentRepository


class DepartmentService:

    @staticmethod
    def create_department(data):
        return DepartmentRepository.create(data)

    @staticmethod
    def list_departments():
        return DepartmentRepository.get_all()

    @staticmethod
    def get_department(pk):
        return DepartmentRepository.get_by_id(pk)

    @staticmethod
    def update_department(instance, data):
        return DepartmentRepository.update(instance, data)

    @staticmethod
    def delete_department(instance):
        DepartmentRepository.delete(instance)
