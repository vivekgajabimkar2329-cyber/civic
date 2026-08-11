from django.urls import path, include

urlpatterns = [
    path("", include("modules.users.urls.user_urls")),
]
