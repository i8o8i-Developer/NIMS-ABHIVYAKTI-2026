"""Django Admin For Participants."""

from django.contrib import admin
from Apps.Participants.models import Participant


@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = ("name", "student_id", "college", "role", "registered_at")
    list_filter = ("college", "gender", "role")
    search_fields = ("name", "student_id", "college__name")
