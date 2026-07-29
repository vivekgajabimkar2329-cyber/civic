from django.urls import path

from .views import (
    ReportListCreateView,
    ReportDetailView,
    ReportStatisticsView,
)

urlpatterns = [
    path("", ReportListCreateView.as_view(), name="report-list"),
    path("<int:id>/", ReportDetailView.as_view(), name="report-detail"),
    path("statistics/", ReportStatisticsView.as_view(), name="report-statistics"),
]