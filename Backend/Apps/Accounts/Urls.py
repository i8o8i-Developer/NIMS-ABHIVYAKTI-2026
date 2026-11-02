"""Accounts URL Routing."""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Apps.Accounts.Views import LoginView, LogoutView, CookieTokenRefreshView, MeView, UserViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="admin-users")

urlpatterns = [
    path("login/", LoginView.as_view(), name="auth-login"),
    path("logout/", LogoutView.as_view(), name="auth-logout"),
    path("refresh/", CookieTokenRefreshView.as_view(), name="token-refresh"),
    path("me/", MeView.as_view(), name="auth-me"),
    path("", include(router.urls)),
]

