"""Django Admin For Colleges."""

from django.contrib import admin
from Apps.Colleges.models import College


@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = ("name", "code", "city", "contact_person", "is_active", "total_points", "gold_medals")
    search_fields = ("name", "code", "contact_person", "contact_email")
    list_filter = ("is_active", "state")
