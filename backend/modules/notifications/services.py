from modules.notifications.repositories import NotificationRepository


class NotificationService:

    @staticmethod
    def create_notification(user, title, message, notification_type):
        return NotificationRepository.create_notification(
            user=user,
            title=title,
            message=message,
            notification_type=notification_type
        )

    @staticmethod
    def get_user_notifications(user):
        return NotificationRepository.get_user_notifications(user)

    @staticmethod
    def mark_notification_read(notification_id, user):
        return NotificationRepository.mark_as_read(notification_id, user)

    @staticmethod
    def mark_all_read(user):
        return NotificationRepository.mark_all_as_read(user)