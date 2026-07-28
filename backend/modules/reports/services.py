from .repositories import ReportRepository


class ReportService:

    @staticmethod
    def list_reports():
        return ReportRepository.get_all()

    @staticmethod
    def create_report(data):
        return ReportRepository.create(data)

    @staticmethod
    def get_report(id):
        return ReportRepository.get_by_id(id)

    @staticmethod
    def update_report(id, data):
        report = ReportRepository.get_by_id(id)
        return ReportRepository.update(report, data)

    @staticmethod
    def delete_report(id):
        report = ReportRepository.get_by_id(id)
        ReportRepository.delete(report)

    @staticmethod
    def statistics():
        reports = ReportRepository.get_all()

        return {
            "total_reports": reports.count(),
            "total_complaints": sum(r.total_complaints for r in reports),
            "resolved": sum(r.resolved for r in reports),
            "pending": sum(r.pending for r in reports),
        }