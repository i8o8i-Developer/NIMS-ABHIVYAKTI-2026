"""Granular DRF Permission Classes For Staff RBAC."""

from rest_framework.permissions import BasePermission


class IsSuperAdmin(BasePermission):
    """Allows Access Only To Super Administrators."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_super_admin)


class IsCoordinatorOrAbove(BasePermission):
    """Allows Access To Coordinators And Super Administrators."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_coordinator)


class IsJudgeOrAbove(BasePermission):
    """Allows Access To Judges, Coordinators, And Super Administrators."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_judge)


class IsOperatorOrAbove(BasePermission):
    """Allows Access To Any Active Authenticated Staff Operator."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_active)

