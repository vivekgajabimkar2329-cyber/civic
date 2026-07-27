from django.urls import path
from .views import UserListCreateAPIView, UserDetailAPIView

urlpatterns = [
    path("", UserListCreateAPIView.as_view(), name="user-list"),
    path("<uuid:pk>/", UserDetailAPIView.as_view(), name="user-detail"),
]
