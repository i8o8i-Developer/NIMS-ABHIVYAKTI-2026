"""Scores And Leaderboard URL Routing."""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Apps.Scores.Views import ScoreViewSet, LeaderboardView, LiveFeedView, StatsView

router = DefaultRouter()
router.register(r"records", ScoreViewSet, basename="scores")

urlpatterns = [
    path("leaderboard/", LeaderboardView.as_view(), name="leaderboard"),
    path("live-feed/", LiveFeedView.as_view(), name="live-feed"),
    path("stats/", StatsView.as_view(), name="fest-stats"),
    path("", include(router.urls)),
]
