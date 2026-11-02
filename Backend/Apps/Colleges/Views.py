"""College API Views."""

from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from Apps.Colleges.models import College
from Apps.Colleges.Serializers import CollegeSerializer
from Apps.Accounts.Permissions import IsCoordinatorOrAbove


class CollegeViewSet(viewsets.ModelViewSet):
    """CRUD For Colleges; Read Accessible Publicly, Modification Restricted To Coordinators+."""

    queryset = College.objects.all().order_by("name")
    serializer_class = CollegeSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsCoordinatorOrAbove()]
