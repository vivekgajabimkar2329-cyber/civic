from django.urls import path
from .views import ComplaintListCreateAPIView, ComplaintDetailAPIView

urlpatterns = [
    path("", ComplaintListCreateAPIView.as_view(), name="complaint-list"),
    path("<uuid:pk>/", ComplaintDetailAPIView.as_view(), name="complaint-detail"),
]
