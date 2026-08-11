from django.urls import path, include

urlpatterns = [
    path("", include("modules.reports.urls.report_urls")),
]
