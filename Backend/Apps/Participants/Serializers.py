"""Serializers For Student Participants."""

from rest_framework import serializers
from Apps.Participants.models import Participant
from Apps.Colleges.Serializers import CollegeSerializer
from Apps.Competitions.Serializers import CompetitionSerializer
from Apps.Core.TitleCase import to_title_case


class ParticipantSerializer(serializers.ModelSerializer):
    """Full Participant Representation."""

    college_name = serializers.CharField(source="college.name", read_only=True)
    college_code = serializers.CharField(source="college.code", read_only=True)
    competitions_data = CompetitionSerializer(source="competitions", many=True, read_only=True)

    class Meta:
        model = Participant
        fields = [
            "id",
            "college",
            "college_name",
            "college_code",
            "name",
            "student_id",
            "email",
            "phone",
            "gender",
            "competitions",
            "competitions_data",
            "role",
            "notes",
            "registered_at",
            "updated_at",
        ]

    def validate_name(self, value):
        return to_title_case(str(value or "").strip())
