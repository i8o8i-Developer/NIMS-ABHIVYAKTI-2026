"""Serializers For Live Scoring And Championship Leaderboard."""

from rest_framework import serializers
from Apps.Scores.models import Score
from Apps.Colleges.models import College
from Apps.Competitions.models import Competition


class ScoreSerializer(serializers.ModelSerializer):
    """Full Score Representation."""

    competition_title = serializers.CharField(source="competition.title", read_only=True)
    competition_category = serializers.CharField(source="competition.category", read_only=True)
    competition_venue = serializers.CharField(source="competition.venue", read_only=True)
    college_name = serializers.CharField(source="college.name", read_only=True)
    college_code = serializers.CharField(source="college.code", read_only=True)
    college_avatar_color = serializers.CharField(source="college.avatar_color", read_only=True)
    participant_name = serializers.CharField(source="participant.name", read_only=True, default="")
    participant_student_id = serializers.CharField(source="participant.student_id", read_only=True, default="")

    class Meta:
        model = Score
        fields = [
            "id",
            "competition",
            "competition_title",
            "competition_category",
            "competition_venue",
            "college",
            "college_name",
            "college_code",
            "college_avatar_color",
            "participant",
            "participant_name",
            "participant_student_id",
            "rank",
            "raw_score",
            "points_awarded",
            "remarks",
            "is_verified",
            "created_at",
            "updated_at",
        ]


class LeaderboardEntrySerializer(serializers.Serializer):
    """Calculated College Championship Rank Entry."""

    rank = serializers.IntegerField()
    college_id = serializers.IntegerField()
    college_name = serializers.CharField()
    college_code = serializers.CharField()
    city = serializers.CharField()
    avatar_color = serializers.CharField()
    total_points = serializers.FloatField()
    gold_medals = serializers.IntegerField()
    silver_medals = serializers.IntegerField()
    bronze_medals = serializers.IntegerField()
    events_participated = serializers.IntegerField()
