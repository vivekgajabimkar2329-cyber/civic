import uuid
from datetime import timedelta
from django.utils import timezone
from ..repositories import PasswordResetTokenRepository


class PasswordService:

    @staticmethod
    def create_password_reset_token(user):
        token = str(uuid.uuid4())
        PasswordResetTokenRepository.invalidate_active_tokens(user)

        return PasswordResetTokenRepository.create(
            user=user,
            token=token,
            expires_at=timezone.now() + timedelta(hours=1),
        )
