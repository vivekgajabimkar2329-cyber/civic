from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/users/", include("modules.users.urls")),
    path("api/v1/complaints/", include("modules.complaints.urls")),

    path(
        "api/auth/",
        include("modules.authentication.urls")
    ),
    path(
        "api/departments/",
        include("modules.departments.urls")
    ),
    path(
        "api/users/",
        include("modules.users.urls")
    ),
    path(
        "api/complaints/",
        include("modules.complaints.urls")
    ),
    path(
        "api/dashboard/",
        include("modules.dashboard.urls")
    ),
    path(
        "api/reports/",
        include("modules.reports.urls")
    ),
    path(
        "api/uploads/",
        include("modules.uploads.urls")
    ),
    path("api/reports/", include("modules.reports.urls")),

    # OpenAPI schema and documentation
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]
