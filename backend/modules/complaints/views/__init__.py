from rest_framework.permissions import IsAuthenticated

from .complaint_list import ComplaintListView
from .complaint_create import ComplaintCreateView
from .complaint_detail import ComplaintDetailView
from .complaint_assignment import ComplaintAssignView
from .complaint_status import ComplaintStatusView
from .complaint_resolution import ComplaintResolutionView


class ComplaintListCreateView(ComplaintListView, ComplaintCreateView):
    def get_permissions(self):
        if self.request.method == "POST":
            from common.permissions import IsCitizen
            return [IsCitizen()]
        return [IsAuthenticated()]


__all__ = [
    "ComplaintListView",
    "ComplaintCreateView",
    "ComplaintDetailView",
    "ComplaintAssignView",
    "ComplaintStatusView",
    "ComplaintResolutionView",
    "ComplaintListCreateView",
]
