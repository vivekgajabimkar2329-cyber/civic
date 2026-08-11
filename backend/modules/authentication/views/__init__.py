from .login import RegisterView, LoginView, ChangePasswordView, ProfileView
from .logout import LogoutView
from .forgot_password import ForgotPasswordView
from .reset_password import ResetPasswordView
from .otp import VerifyOTPView, SendOTPView

__all__ = [
    "RegisterView",
    "LoginView",
    "ChangePasswordView",
    "ProfileView",
    "LogoutView",
    "ForgotPasswordView",
    "ResetPasswordView",
    "VerifyOTPView",
    "SendOTPView",
]
