from rest_framework.permissions import BasePermission


class IsAuthenticatedUser(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated


class IsAdminUser(BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.is_staff
        )


class IsSuperUser(BasePermission):
    """
    Allows access only to superusers.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.is_superuser
        )


class ReadOnlyPermission(BasePermission):
    """
    Allows only GET, HEAD and OPTIONS requests.
    """

    def has_permission(self, request, view):
        return request.method in ["GET", "HEAD", "OPTIONS"]


class DepartmentPermission(BasePermission):
    """
    Authenticated users can view departments.
    Only admins (Super Admin, City Admin) can create, update and delete.
    """

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True

        return (
            request.user.is_superuser
            or request.user.is_staff
            or request.user.role in ["SUPER_ADMIN", "CITY_ADMIN"]
        )
