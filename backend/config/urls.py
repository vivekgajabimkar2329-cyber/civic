from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path("", RedirectView.as_view(url="api/docs/swagger-docs/", permanent=False)),
    path("admin/", admin.site.urls),

    path("api/auth/", include("modules.authentication.urls")),
    path("api/users/", include("modules.users.urls")),
    path("api/departments/", include("modules.departments.urls")),
    path("api/complaints/", include("modules.complaints.urls")),
    path("api/dashboard/", include("modules.dashboard.urls")),
    path("api/uploads/", include("modules.uploads.urls")),
    path("api/reports/", include("modules.reports.urls")),
    path("api/notifications/", include("modules.notifications.urls")),

    # OpenAPI schema and documentation
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/schema/swagger-docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-docs",
    ),
    path(
        "api/docs/swagger-docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-docs",
    ),
    path(
        "api/docs/redoc-docs/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc-docs",
    ),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )