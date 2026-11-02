"""Competitions App Configuration."""

from django.apps import AppConfig


class CompetitionsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Apps.Competitions"
    label = "competitions"
    verbose_name = "Competitions & Events"

