from ..repositories import LoginHistoryRepository


class LoginService:

    @staticmethod
    def save_login_history(user, ip, user_agent):
        return LoginHistoryRepository.create(
            user=user,
            ip_address=ip,
            user_agent=user_agent,
        )
