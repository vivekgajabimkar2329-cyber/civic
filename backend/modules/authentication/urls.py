from django.urls import path

from .views import (
    LoginView,
    LogoutView,
    ForgotPasswordView,
    ResetPasswordView,
    VerifyOTPView,
    SendOTPView,
    ProfileView,
    RegisterView,
)

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot_password"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset_password"),
    path("verify-otp/", VerifyOTPView.as_view(), name="verify_otp"),
    path("send-otp/", SendOTPView.as_view(), name="send_otp"),
    path("profile/", ProfileView.as_view(), name="profile"),
]
