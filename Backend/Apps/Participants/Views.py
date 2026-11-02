"""Participants API Views."""

from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from Apps.Participants.models import Participant
from Apps.Participants.Serializers import ParticipantSerializer
from Apps.Accounts.Permissions import IsOperatorOrAbove


class ParticipantViewSet(viewsets.ModelViewSet):
    """CRUD Operations For Student Participants."""

    serializer_class = ParticipantSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "student_id", "email", "phone", "college__name", "college__code"]
    ordering_fields = ["name", "registered_at", "college__name"]

    def get_queryset(self):
        qs = Participant.objects.select_related("college").prefetch_related("competitions").all()
        col = self.request.query_params.get("college")
        if col:
            qs = qs.filter(college_id=col)
        gender = self.request.query_params.get("gender")
        if gender:
            qs = qs.filter(gender=gender)
        role = self.request.query_params.get("role")
        if role:
            qs = qs.filter(role__icontains=role)
        return qs

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsOperatorOrAbove()]
