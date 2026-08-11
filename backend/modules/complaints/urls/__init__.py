from django.urls import path, include

urlpatterns = [
    path("", include("modules.complaints.urls.complaint_urls")),
]
