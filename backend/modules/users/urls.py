from django.urls import path
from modules.users.views import UserDetailView, UserListCreateView

urlpatterns = [
    path("", UserListCreateView.as_view(), name="user-list-create"),
    path(
        "<uuid:pk>/", UserDetailView.as_view(), name="user-detail"
    ),  # Use uuid:pk or str:pk
]
from .views import UserListCreateAPIView, UserDetailAPIView

urlpatterns = [
    path("", UserListCreateAPIView.as_view(), name="user-list"),
    path("<uuid:pk>/", UserDetailAPIView.as_view(), name="user-detail"),
]
