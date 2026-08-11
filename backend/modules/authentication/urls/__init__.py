from django.urls import path, include

urlpatterns = [
    path("", include("modules.authentication.urls.auth_urls")),
    path("", include("modules.authentication.urls.password_urls")),
    path("", include("modules.authentication.urls.otp_urls")),
]
