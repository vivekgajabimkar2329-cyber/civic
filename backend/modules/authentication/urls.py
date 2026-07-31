from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    ChangePasswordView,
    ForgotPasswordView,
    LoginView,
    LogoutView,
    ProfileView,
    RegisterView,
    ResetPasswordView,
    SendOTPView,
    VerifyOTPView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="auth_register"),
    path("login/", LoginView.as_view(), name="auth_login"),
    path("refresh/", TokenRefreshView.as_view(), name="auth_token_refresh"),
    path("logout/", LogoutView.as_view(), name="auth_logout"),
    path("profile/", ProfileView.as_view(), name="auth_profile"),

    path(
        "change-password/",
        ChangePasswordView.as_view(),
        name="auth_change_password",
    ),

    path(
        "forgot-password/",
        ForgotPasswordView.as_view(),
        name="auth_forgot_password",
    ),

    path(
        "reset-password/",
        ResetPasswordView.as_view(),
        name="auth_reset_password",
    ),

    path(
        "send-otp/",
        SendOTPView.as_view(),
        name="auth_send_otp",
    ),

    path(
        "verify-otp/",
        VerifyOTPView.as_view(),
        name="auth_verify_otp",
    ),
]