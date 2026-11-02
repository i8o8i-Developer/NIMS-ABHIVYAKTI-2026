"""Django Admin For Gallery."""

from django.contrib import admin
from Apps.Gallery.models import GalleryItem


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "event_year", "is_featured", "display_order", "created_at")
    list_filter = ("category", "event_year", "is_featured")
    search_fields = ("title", "caption")

