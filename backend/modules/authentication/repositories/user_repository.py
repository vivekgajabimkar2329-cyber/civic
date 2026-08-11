from ..models import LoginHistory


class LoginHistoryRepository:

    @staticmethod
    def create(**kwargs):
        return LoginHistory.objects.create(**kwargs)

    @staticmethod
    def get_user_history(user):
        return LoginHistory.objects.filter(user=user)
