"""Serializers For Participating Colleges."""

from rest_framework import serializers
from Apps.Colleges.models import College
from Apps.Core.TitleCase import to_title_case


class CollegeSerializer(serializers.ModelSerializer):
    """Full College Representation Including Computed Medals And Points."""

    total_points = serializers.FloatField(read_only=True)
    gold_medals = serializers.IntegerField(read_only=True)
    silver_medals = serializers.IntegerField(read_only=True)
    bronze_medals = serializers.IntegerField(read_only=True)
    events_participated = serializers.IntegerField(read_only=True)

    class Meta:
        model = College
        fields = [
            "id",
            "name",
            "code",
            "city",
            "state",
            "contact_person",
            "contact_email",
            "contact_phone",
            "avatar_color",
            "logo_url",
            "is_active",
            "total_points",
            "gold_medals",
            "silver_medals",
            "bronze_medals",
            "events_participated",
            "created_at",
            "updated_at",
        ]

    def validate_name(self, value):
        return to_title_case(str(value or "").strip())

    def validate_contact_person(self, value):
        return to_title_case(str(value or "").strip()) if value else ""
