from .models import Department


class DepartmentRepository:

    @staticmethod
    def create(data):
        return Department.objects.create(**data)

    @staticmethod
    def get_all():
        return Department.objects.all()

    @staticmethod
    def get_by_id(pk):
        return Department.objects.filter(id=pk).first()

    @staticmethod
    def update(instance, data):
        for key, value in data.items():
            setattr(instance, key, value)

        instance.save()
        return instance

    @staticmethod
    def delete(instance):
        instance.delete()
