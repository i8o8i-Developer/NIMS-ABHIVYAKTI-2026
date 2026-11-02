"""Scoring Engine And Championship Leaderboard API Views."""

from rest_framework import viewsets, filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Sum, Count, Q

from Apps.Scores.models import Score
from Apps.Scores.Serializers import ScoreSerializer, LeaderboardEntrySerializer
from Apps.Colleges.models import College
from Apps.Competitions.models import Competition
from Apps.Participants.models import Participant
from Apps.Core.models import EventSetting, AuditLog
from Apps.Accounts.Permissions import IsJudgeOrAbove


class ScoreViewSet(viewsets.ModelViewSet):
    """CRUD For Scores; Only Judges And Above Can Record Or Modify."""

    serializer_class = ScoreSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["competition__title", "college__name", "college__code", "participant__name"]
    ordering_fields = ["created_at", "rank", "points_awarded", "raw_score"]

    def get_queryset(self):
        qs = Score.objects.select_related("competition", "college", "participant").all()
        comp = self.request.query_params.get("competition")
        if comp:
            qs = qs.filter(competition_id=comp)
        col = self.request.query_params.get("college")
        if col:
            qs = qs.filter(college_id=col)
        rank = self.request.query_params.get("rank")
        if rank:
            qs = qs.filter(rank=rank)
        verified = self.request.query_params.get("is_verified")
        if verified is not None:
            qs = qs.filter(is_verified=verified.lower() in ("true", "1"))
        return qs

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsJudgeOrAbove()]

    def perform_create(self, serializer):
        score = serializer.save()
        AuditLog.objects.create(
            actor=self.request.user if hasattr(self.request.user, "id") else None,
            action="Score Recorded By Jury",
            target_type="Score",
            target_id=str(score.id),
            metadata={
                "competition": score.competition.title,
                "college": score.college.code,
                "points": float(score.points_awarded),
            },
        )


class LeaderboardView(APIView):
    """Real-Time Calculated College Championship Standings."""

    permission_classes = [AllowAny]

    def get(self, request):
        colleges = College.objects.filter(is_active=True).prefetch_related("scores")

        results = []
        for col in colleges:
            pts = col.total_points
            golds = col.gold_medals
            silvers = col.silver_medals
            bronzes = col.bronze_medals
            events = col.events_participated

            results.append({
                "college_id": col.id,
                "college_name": col.name,
                "college_code": col.code,
                "city": col.city,
                "avatar_color": col.avatar_color,
                "total_points": pts,
                "gold_medals": golds,
                "silver_medals": silvers,
                "bronze_medals": bronzes,
                "events_participated": events,
            })

        # Rank Order: 1. Total Points desc, 2. Gold desc, 3. Silver desc, 4. Bronze desc
        results.sort(
            key=lambda c: (c["total_points"], c["gold_medals"], c["silver_medals"], c["bronze_medals"]),
            reverse=True,
        )

        # Assign Ranks
        ranked_list = []
        for index, item in enumerate(results, start=1):
            item["rank"] = index
            ranked_list.append(item)

        podium = ranked_list[:3]

        return Response({
            "total_institutes": len(ranked_list),
            "podium": podium,
            "leaderboard": ranked_list,
        })


class LiveFeedView(APIView):
    """16:9 Fullscreen Stadium LED Screen Live Feed."""

    permission_classes = [AllowAny]

    def get(self, request):
        settings = EventSetting.get_settings()
        lb_response = LeaderboardView().get(request).data

        recent_scores = Score.objects.filter(
            is_verified=True, rank__in=[1, 2, 3]
        ).select_related("competition", "college", "participant").order_by("-updated_at")[:6]

        recent_results = []
        for s in recent_scores:
            recent_results.append({
                "id": s.id,
                "competition_title": s.competition.title,
                "competition_category": s.competition.get_category_display(),
                "college_name": s.college.name,
                "college_code": s.college.code,
                "avatar_color": s.college.avatar_color,
                "participant_name": s.participant.name if s.participant else "",
                "rank": s.rank,
                "points_awarded": float(s.points_awarded),
            })

        total_participants = Participant.objects.count()
        total_events = Competition.objects.count()
        completed_events = Competition.objects.filter(status="COMPLETED").count()

        return Response({
            "event_name": settings.event_name,
            "edition": settings.edition,
            "tagline": settings.tagline,
            "venue": settings.venue,
            "marquee_announcements": settings.marquee_announcements,
            "metrics": {
                "total_institutes": lb_response["total_institutes"],
                "total_participants": total_participants,
                "total_events": total_events,
                "completed_events": completed_events,
            },
            "podium": lb_response["podium"],
            "top_colleges": lb_response["leaderboard"][:10],
            "recent_results": recent_results,
        })


class StatsView(APIView):
    """Public Aggregate Metrics For Hero Section."""

    permission_classes = [AllowAny]

    def get(self, request):
        total_colleges = College.objects.filter(is_active=True).count()
        total_participants = Participant.objects.count()
        total_competitions = Competition.objects.count()
        total_scores = Score.objects.filter(is_verified=True).count()

        return Response({
            "colleges_count": max(total_colleges, 30),
            "participants_count": max(total_participants, 1850),
            "competitions_count": max(total_competitions, 15),
            "cultural_arenas": 6,
            "award_pool": "₹5,00,000+",
            "jury_sync": True,
        })
