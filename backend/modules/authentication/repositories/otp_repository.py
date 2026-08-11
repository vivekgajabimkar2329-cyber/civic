from django.utils import timezone
from ..models import OTP


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
