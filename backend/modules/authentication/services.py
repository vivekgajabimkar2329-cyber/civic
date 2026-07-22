import random
import uuid
from datetime import timedelta

from django.utils import timezone

from .repositories import (
    LoginHistoryRepository,
    OTPRepository,
    PasswordResetTokenRepository,
)


class AuthenticationService:

    @staticmethod
    def generate_otp(user, purpose):
        otp = str(random.randint(100000, 999999))
        OTPRepository.invalidate_active_otps(user, purpose)

        return OTPRepository.create(
            user=user,
            code=otp,
            purpose=purpose,
            expires_at=timezone.now() + timedelta(minutes=10),
        )

    @staticmethod
    def verify_otp(user, code, purpose="LOGIN"):
        otp = OTPRepository.get_valid_otp(user, code, purpose)

        if not otp:
            return None

        OTPRepository.verify(otp)

        return otp

    @staticmethod
    def create_password_reset_token(user):
        token = str(uuid.uuid4())
        PasswordResetTokenRepository.invalidate_active_tokens(user)

        return PasswordResetTokenRepository.create(
            user=user,
            token=token,
            expires_at=timezone.now() + timedelta(hours=1),
        )

    @staticmethod
    def save_login_history(user, ip, user_agent):
        return LoginHistoryRepository.create(
            user=user,
            ip_address=ip,
            user_agent=user_agent,
        )
