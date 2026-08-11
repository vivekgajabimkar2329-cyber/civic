from ..models import Report


class ReportRepository:

    @staticmethod
    def get_all():
        return Report.objects.all()

    @staticmethod
    def get_by_id(id):
        return Report.objects.get(id=id)

    @staticmethod
    def create(data):
        return Report.objects.create(**data)

    @staticmethod
    def update(report, data):
        for key, value in data.items():
            setattr(report, key, value)
        report.save()
        return report

    @staticmethod
    def delete(report):
        report.delete()
