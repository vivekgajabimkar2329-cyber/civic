from django.urls import path
from ..views import SendOTPView, VerifyOTPView

urlpatterns = [
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
