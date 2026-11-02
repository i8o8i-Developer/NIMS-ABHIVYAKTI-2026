"""Serializers For Competitions And Cultural Events."""

from rest_framework import serializers
from Apps.Competitions.models import Competition
from Apps.Core.TitleCase import to_title_case


class CompetitionSerializer(serializers.ModelSerializer):
    """Full Competition Representation."""

    category_display = serializers.CharField(source="get_category_display", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    registered_participants_count = serializers.SerializerMethodField()

    class Meta:
        model = Competition
        fields = [
            "id",
            "title",
            "code",
            "category",
            "category_display",
            "description",
            "venue",
            "scheduled_at",
            "round_name",
            "max_participants_per_college",
            "rules",
            "status",
            "status_display",
            "first_place_points",
            "second_place_points",
            "third_place_points",
            "participation_points",
            "registered_participants_count",
            "created_at",
            "updated_at",
        ]

    def get_registered_participants_count(self, obj):
        return obj.participants.count()

    def validate_title(self, value):
        return to_title_case(str(value or "").strip())

    def validate_venue(self, value):
        return to_title_case(str(value or "").strip())
