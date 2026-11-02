"""Competitions API Views."""

from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from Apps.Competitions.models import Competition
from Apps.Competitions.Serializers import CompetitionSerializer
from Apps.Accounts.Permissions import IsCoordinatorOrAbove


class CompetitionViewSet(viewsets.ModelViewSet):
    """CRUD And Filter Operations For Competitions."""

    serializer_class = CompetitionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "code", "venue", "description", "rules"]
    ordering_fields = ["scheduled_at", "title", "category", "status"]

    def get_queryset(self):
        qs = Competition.objects.all().order_by("scheduled_at", "title")
        cat = self.request.query_params.get("category")
        if cat:
            qs = qs.filter(category=cat)
        stat = self.request.query_params.get("status")
        if stat:
            qs = qs.filter(status=stat)
        venue = self.request.query_params.get("venue")
        if venue:
            qs = qs.filter(venue__icontains=venue)
        return qs

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsCoordinatorOrAbove()]
