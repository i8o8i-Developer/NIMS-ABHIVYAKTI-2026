"""Django Admin Interface For Core Models."""

from django.contrib import admin
from Apps.Core.models import EventSetting, AuditLog


@admin.register(EventSetting)
class EventSettingAdmin(admin.ModelAdmin):
    list_display = ("event_name", "edition", "date_range_display", "venue", "updated_at")


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ("action", "actor", "target_type", "target_id", "created_at")
    list_filter = ("action", "target_type", "created_at")
    search_fields = ("action", "target_id", "metadata")
