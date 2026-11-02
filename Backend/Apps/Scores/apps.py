"""Scores App Configuration."""

from django.apps import AppConfig


class ScoresConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Apps.Scores"
    label = "scores"
    verbose_name = "Scoring & Leaderboard Engine"
