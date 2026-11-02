"""Participants URL Routing."""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Apps.Participants.Views import ParticipantViewSet

router = DefaultRouter()
router.register(r"", ParticipantViewSet, basename="participants")

urlpatterns = [
    path("", include(router.urls)),
]
