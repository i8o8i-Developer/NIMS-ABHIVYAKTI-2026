"""Participants App Configuration."""

from django.apps import AppConfig


class ParticipantsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Apps.Participants"
    label = "participants"
    verbose_name = "Student Participants"

