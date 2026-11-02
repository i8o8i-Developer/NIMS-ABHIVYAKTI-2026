"""Competitions URL Routing."""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Apps.Competitions.Views import CompetitionViewSet

router = DefaultRouter()
router.register(r"", CompetitionViewSet, basename="competitions")

urlpatterns = [
    path("", include(router.urls)),
]
