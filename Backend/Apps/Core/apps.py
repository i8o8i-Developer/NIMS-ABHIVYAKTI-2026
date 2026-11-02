"""Core Django App Configuration."""

from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Apps.Core"
    label = "core"
    verbose_name = "Core Operations"
