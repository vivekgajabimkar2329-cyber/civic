import random
from datetime import timedelta
from django.utils import timezone
from ..repositories import OTPRepository


class OTPService:

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
