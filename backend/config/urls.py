from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/users/", include("modules.users.urls")),
    path("api/v1/complaints/", include("modules.complaints.urls")),

    path(
        "api/v1/auth/",
        include("modules.authentication.urls")
    ),
]
