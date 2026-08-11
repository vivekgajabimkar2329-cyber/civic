from .department_permissions import (
    IsAuthenticatedUser,
    IsAdminUser,
    IsSuperUser,
    ReadOnlyPermission,
    DepartmentPermission,
)

__all__ = [
    "IsAuthenticatedUser",
    "IsAdminUser",
    "IsSuperUser",
    "ReadOnlyPermission",
    "DepartmentPermission",
]
