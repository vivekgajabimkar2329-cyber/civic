# Civic AI Backend

REST API for the Civic AI application, built with Django and Django REST Framework. It provides JWT authentication, user management, and complaint management.

## Requirements

- Python 3.10 or later
- PostgreSQL 14 or later

## Setup

From the `backend` directory, create and activate a virtual environment:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install the dependencies:

```powershell
pip install -r requirements.txt
```

Create a PostgreSQL database, then create `backend/.env` using the following values as a template. Do not commit this file.

```env
DJANGO_SECRET_KEY=replace-with-a-long-random-value
DJANGO_DEBUG=true
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

POSTGRES_DB=civic_ai
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-postgres-password
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432

# Comma-separated frontend origins allowed to call this API
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Apply migrations and start the server:

```powershell
python manage.py migrate
python manage.py runserver
```

The server listens at `http://127.0.0.1:8000/`; use one of the API routes below (there is no page at the root URL).

## API base URL

All API endpoints use:

```text
http://127.0.0.1:8000/api/v1/
```

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `auth/register/` | Register a user |
| POST | `auth/login/` | Get JWT access and refresh tokens |
| POST | `auth/refresh/` | Refresh an access token |
| POST | `auth/logout/` | Log out and blacklist a refresh token |
| GET | `auth/profile/` | Get the authenticated user's profile |
| POST | `auth/change-password/` | Change the authenticated user's password |
| POST | `auth/forgot-password/` | Request a password-reset OTP |
| POST | `auth/reset-password/` | Reset a password |
| POST | `auth/send-otp/` | Send an OTP |
| POST | `auth/verify-otp/` | Verify an OTP |

### Users

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `users/` | List users (authentication required) |
| POST | `users/` | Create a user (public) |
| GET | `users/<uuid>/` | Get a user |
| PATCH | `users/<uuid>/` | Update a user |
| DELETE | `users/<uuid>/` | Delete a user |

### Complaints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `complaints/` | List complaints |
| POST | `complaints/` | Create a complaint |
| GET | `complaints/<uuid>/` | Get a complaint |
| PUT | `complaints/<uuid>/` | Update a complaint |
| DELETE | `complaints/<uuid>/` | Delete a complaint |

## Authentication

Most endpoints require a JWT access token. Include it in the request header:

```http
Authorization: Bearer <access_token>
```

Access tokens expire after 15 minutes. Refresh tokens expire after 7 days.

## Useful commands

```powershell
# Check Django configuration
python manage.py check

# Create migrations after model changes
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create an administrator account
python manage.py createsuperuser
```

The Django administration site is available at `http://127.0.0.1:8000/admin/` after creating a superuser.
