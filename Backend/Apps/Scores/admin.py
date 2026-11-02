"""Django Admin For Scores."""

from django.contrib import admin
from Apps.Scores.models import Score


@admin.register(Score)
class ScoreAdmin(admin.ModelAdmin):
    list_display = ("competition", "college", "participant", "rank", "raw_score", "points_awarded", "is_verified")
    list_filter = ("rank", "is_verified", "competition__category")
    search_fields = ("competition__title", "college__name", "participant__name")
