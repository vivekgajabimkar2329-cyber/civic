"""
Django Settings for Civic AI Backend
=====================================
Sections:
  1. Imports & Environment
  2. Core Settings
  3. Installed Apps
  4. Middleware
  5. URL / Templates / WSGI / ASGI
  6. Database
  7. Authentication
  8. Internationalization
  9. Static & Media Files
  10. Third-Party: REST Framework, JWT, CORS, Swagger
"""

# ---------------------------------------------------------------------------
# 1. Imports & Environment
# ---------------------------------------------------------------------------
import os
from datetime import timedelta
from pathlib import Path

import dj_database_url
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

# Load local overrides first (civic/backend/.env)
load_dotenv(BASE_DIR / ".env")

# Then load the main project .env (civic/.env) — values here take precedence
# This is where DATABASE_URL, SECRET_KEY, CORS etc. live
load_dotenv(BASE_DIR.parent / ".env", override=True)

# ---------------------------------------------------------------------------
# 2. Core Settings
# ---------------------------------------------------------------------------
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "unsafe-development-key-change-me")

DEBUG = os.getenv("DJANGO_DEBUG", "true").lower() == "true"

ALLOWED_HOSTS = [
    host.strip()
    for host in os.getenv(
        "DJANGO_ALLOWED_HOSTS",
        "localhost,127.0.0.1,.onrender.com",
    ).split(",")
    if host.strip()
]
if ".onrender.com" not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append(".onrender.com")
if "civic-ozor.onrender.com" not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append("civic-ozor.onrender.com")


# ---------------------------------------------------------------------------
# 3. Installed Apps
# ---------------------------------------------------------------------------
INSTALLED_APPS = [
    # Django built-ins
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party
    "corsheaders",
    "rest_framework",
    "drf_spectacular",
    "rest_framework_simplejwt.token_blacklist",
    # Local — shared kernel
    "common",
    # Local — feature modules
    "modules.authentication.apps.AuthenticationConfig",
    "modules.users",
    "modules.departments",
    "modules.complaints",
    "modules.notifications.apps.NotificationsConfig",
    "modules.uploads.apps.UploadsConfig",
    "modules.reports.apps.ReportsConfig",
]

# ---------------------------------------------------------------------------
# 4. Middleware
# ---------------------------------------------------------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",          # Must be first
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",      # Right after SecurityMiddleware
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ---------------------------------------------------------------------------
# 5. URL / Templates / WSGI / ASGI
# ---------------------------------------------------------------------------
ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

# ---------------------------------------------------------------------------
# 6. Database
# ---------------------------------------------------------------------------
_db_url = os.getenv("DATABASE_URL")

if _db_url:
    # Neon / cloud PostgreSQL via DATABASE_URL
    DATABASES = {
        "default": dj_database_url.parse(
            _db_url,
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
else:
    # Local PostgreSQL via individual env vars
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.getenv("POSTGRES_DB", "civic_ai"),
            "USER": os.getenv("POSTGRES_USER", "postgres"),
            "PASSWORD": os.getenv("POSTGRES_PASSWORD", ""),
            "HOST": os.getenv("POSTGRES_HOST", "127.0.0.1"),
            "PORT": os.getenv("POSTGRES_PORT", "5432"),
        }
    }

# ---------------------------------------------------------------------------
# 7. Authentication
# ---------------------------------------------------------------------------
AUTH_USER_MODEL = "users.User"
AUTH_PASSWORD_VALIDATORS = []  # Add validators when going to production

# ---------------------------------------------------------------------------
# 8. Internationalization
# ---------------------------------------------------------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ---------------------------------------------------------------------------
# 9. Static & Media Files
# ---------------------------------------------------------------------------
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

# WhiteNoise: compressed + cache-busted static files for production
STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# ---------------------------------------------------------------------------
# 10. Third-Party Settings
# ---------------------------------------------------------------------------

# — Django REST Framework —
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

# — Simple JWT —
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
}

# — CORS (Vite dev server: 5173, React: 3000) —
CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000",
    ).split(",")
    if origin.strip()
]

# — drf-spectacular (Swagger / ReDoc) —
SPECTACULAR_SETTINGS = {
    "TITLE": "Civic AI API",
    "DESCRIPTION": "API documentation for the Civic AI platform",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "PREPROCESSING_HOOKS": ["common.openapi.preprocessing_filter_spec"],
}

# Use local SQLite database during test runs
import sys
if "test" in sys.argv:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

