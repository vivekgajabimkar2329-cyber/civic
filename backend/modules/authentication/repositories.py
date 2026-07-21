from django.utils import timezone

from .models import LoginHistory, OTP, PasswordResetToken


class LoginHistoryRepository:

    @staticmethod
    def create(**kwargs):
        return LoginHistory.objects.create(**kwargs)

    @staticmethod
    def get_user_history(user):
        return LoginHistory.objects.filter(user=user)


class OTPRepository:

    @staticmethod
    def create(**kwargs):
        return OTP.objects.create(**kwargs)

    @staticmethod
    def get_valid_otp(user, code, purpose):
        return OTP.objects.filter(
            user=user,
            code=code,
            purpose=purpose,
            is_verified=False,
            expires_at__gt=timezone.now(),
        ).order_by("-created_at").first()

    @staticmethod
    def invalidate_active_otps(user, purpose):
        return OTP.objects.filter(
            user=user,
            purpose=purpose,
            is_verified=False,
        ).update(is_verified=True)

    @staticmethod
    def verify(otp):
        otp.is_verified = True
        otp.save()
        return otp


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
