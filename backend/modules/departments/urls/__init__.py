from django.urls import path, include

urlpatterns = [
    path("", include("modules.departments.urls.department_urls")),
]
