from django.utils import timezone
from ..models import PasswordResetToken


class PasswordResetTokenRepository:

    @staticmethod
    def create(**kwargs):
        return PasswordResetToken.objects.create(**kwargs)

    @staticmethod
    def get_token(token):
        return PasswordResetToken.objects.filter(
            token=token,
            is_used=False,
            expires_at__gt=timezone.now(),
        ).first()

    @staticmethod
    def invalidate_active_tokens(user):
        return PasswordResetToken.objects.filter(
            user=user,
            is_used=False,
        ).update(is_used=True)

    @staticmethod
    def mark_used(reset_token):
        reset_token.is_used = True
        reset_token.save(update_fields=["is_used", "updated_at"])
