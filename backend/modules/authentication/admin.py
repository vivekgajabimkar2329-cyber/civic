from django.contrib import admin

from .models import (
    LoginHistory,
    OTP,
    PasswordResetToken,
)


admin.site.register(LoginHistory)
admin.site.register(OTP)
admin.site.register(PasswordResetToken)