from .login_service import LoginService
from .logout_service import LogoutService
from .token_service import TokenService
from .password_service import PasswordService
from .otp_service import OTPService


class AuthenticationService(LoginService, PasswordService, OTPService):
    pass


__all__ = [
    "LoginService",
    "LogoutService",
    "TokenService",
    "PasswordService",
    "OTPService",
    "AuthenticationService",
]
