"""Colleges App Configuration."""

from django.apps import AppConfig


class CollegesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Apps.Colleges"
    label = "colleges"
    verbose_name = "Colleges & Contingents"

