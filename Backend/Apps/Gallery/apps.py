"""Gallery App Configuration."""

from django.apps import AppConfig


class GalleryConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Apps.Gallery"
    label = "gallery"
    verbose_name = "Fest Gallery"

