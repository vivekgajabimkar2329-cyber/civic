from modules.notifications.models import Notification

class NotificationRepository:
    @staticmethod
    def get_user_notifications(user):
        return Notification.objects.filter(user=user)

    @staticmethod
    def create_notification(user, title, message, notification_type):
        return Notification.objects.create(
            user=user,
            title=title,
            message=message,
            notification_type=notification_type
        )

    @staticmethod
    def mark_as_read(notification_id, user):
        notification = Notification.objects.filter(id=notification_id, user=user).first()
        if notification:
            notification.is_read = True
            notification.save()
        return notification

    @staticmethod
    def mark_all_as_read(user):
        return Notification.objects.filter(user=user, is_read=False).update(is_read=True)