from django.urls import path
from .views import ReportListCreateAPIView

urlpatterns = [
    path("", ReportListCreateAPIView.as_view(), name="report-list"),
]
from django.urls import path

from .views import (
    ReportListCreateView,
    ReportDetailView,
    ReportStatisticsView,
)

urlpatterns = [

    path("", ReportListCreateView.as_view()),

    path("<int:id>/", ReportDetailView.as_view()),

    path("statistics/", ReportStatisticsView.as_view()),
]