from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from common.responses import success_response
from modules.notifications.models import Notification
from modules.notifications.serializers import NotificationSerializer
from modules.notifications.services import NotificationService


class NotificationListView(ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by("-created_at")


class MarkNotificationReadView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        notification = NotificationService.mark_notification_read(pk, request.user)

        if not notification:
            return success_response(
                message="Notification not found",
                status_code=404
            )

        return success_response(
            message="Notification marked as read"
        )


class MarkAllNotificationsReadView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        NotificationService.mark_all_read(request.user)

        return success_response(
            message="All notifications marked as read"
        )