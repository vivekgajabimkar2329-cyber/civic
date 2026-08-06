from rest_framework.permissions import BasePermission


class IsSuperAdminOrCityAdmin(BasePermission):
    """
    Permission class allowing access only to Super Admins and City Admins.
    """

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        return (
            user.is_superuser
            or user.is_staff
            or user.role in ["SUPER_ADMIN", "CITY_ADMIN"]
        )


class IsDepartmentHead(BasePermission):
    """
    Permission class allowing access only to Department Heads.
    """

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        return user.role == "DEPARTMENT_HEAD" or user.is_superuser or user.is_staff


class IsOfficer(BasePermission):
    """
    Permission class allowing access only to Officers.
    """

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        return user.role == "OFFICER" or user.is_superuser or user.is_staff


class IsCitizen(BasePermission):
    """
    Permission class allowing access only to Citizens.
    """

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        return user.role == "CITIZEN"


class IsAdminOrDepartmentHead(BasePermission):
    """
    Permission class allowing access to Admins and Department Heads.
    """

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        return (
            user.is_superuser
            or user.is_staff
            or user.role in ["SUPER_ADMIN", "CITY_ADMIN", "DEPARTMENT_HEAD"]
        )
