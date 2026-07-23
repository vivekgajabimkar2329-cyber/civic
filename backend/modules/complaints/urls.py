from django.urls import path
from modules.complaints.views import (
    ComplaintDetailView,
    ComplaintListCreateView,
)

urlpatterns = [
    path("", ComplaintListCreateView.as_view(), name="complaint-list-create"),
    path(
        "<uuid:pk>/", ComplaintDetailView.as_view(), name="complaint-detail"
    ),  # Using uuid:pk match
]