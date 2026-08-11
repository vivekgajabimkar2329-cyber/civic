from django.urls import path, include

urlpatterns = [
    path("", include("modules.uploads.urls.upload_urls")),
]
