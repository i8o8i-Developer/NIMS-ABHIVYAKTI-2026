"""Gallery API Views."""

from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from Apps.Gallery.models import GalleryItem
from Apps.Gallery.Serializers import GalleryItemSerializer
from Apps.Accounts.Permissions import IsCoordinatorOrAbove


class GalleryItemViewSet(viewsets.ModelViewSet):
    """CRUD For Fest Gallery Photos."""

    serializer_class = GalleryItemSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "caption", "category"]
    ordering_fields = ["event_year", "display_order", "created_at"]

    def get_queryset(self):
        qs = GalleryItem.objects.all().order_by("-is_featured", "-event_year", "display_order")
        cat = self.request.query_params.get("category")
        if cat:
            qs = qs.filter(category=cat)
        year = self.request.query_params.get("event_year")
        if year:
            qs = qs.filter(event_year=year)
        featured = self.request.query_params.get("is_featured")
        if featured is not None:
            qs = qs.filter(is_featured=featured.lower() in ("true", "1"))
        return qs

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsCoordinatorOrAbove()]
