from django.urls import path
from .views import DepartmentAPIView, DepartmentDetailAPIView

urlpatterns = [

    path(
        "",
        DepartmentAPIView.as_view(),
        name="department-list-create"
    ),

    path(
        "<uuid:pk>/",
        DepartmentDetailAPIView.as_view(),
        name="department-detail"
    ),
]
