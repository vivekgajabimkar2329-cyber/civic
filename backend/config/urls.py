from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/auth/", include("modules.authentication.urls")),
    path("api/users/", include("modules.users.urls")),
    path("api/departments/", include("modules.departments.urls")),
    path("api/complaints/", include("modules.complaints.urls")),
    path("api/uploads/", include("modules.uploads.urls")),
    path("api/reports/", include("modules.reports.urls")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )