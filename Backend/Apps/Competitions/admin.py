"""Django Admin For Competitions."""

from django.contrib import admin
from Apps.Competitions.models import Competition


@admin.register(Competition)
class CompetitionAdmin(admin.ModelAdmin):
    list_display = ("title", "code", "category", "venue", "scheduled_at", "status", "first_place_points")
    list_filter = ("category", "status", "venue")
    search_fields = ("title", "code", "venue")

