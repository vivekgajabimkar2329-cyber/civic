from django.urls import path
from modules.complaints.views import (
    ComplaintDetailView,
    ComplaintListCreateView,
    ComplaintAssignView,
    ComplaintStatusView,
)

urlpatterns = [
    path("", ComplaintListCreateView.as_view(), name="complaint-list-create"),
    path(
        "<uuid:pk>/", ComplaintDetailView.as_view(), name="complaint-detail"
    ),
    path(
        "<uuid:pk>/assign/",
        ComplaintAssignView.as_view(),
        name="complaint-assign",
    ),
    path(
        "<uuid:pk>/status/",
        ComplaintStatusView.as_view(),
        name="complaint-status",
    ),
]
