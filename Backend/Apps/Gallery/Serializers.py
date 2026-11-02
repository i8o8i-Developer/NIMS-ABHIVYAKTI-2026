"""Serializers For Gallery Photos."""

from rest_framework import serializers
from Apps.Gallery.models import GalleryItem
from Apps.Core.TitleCase import to_title_case


class GalleryItemSerializer(serializers.ModelSerializer):
    """Full Gallery Item Representation."""

    category_display = serializers.CharField(source="get_category_display", read_only=True)
    final_image_url = serializers.CharField(read_only=True)

    class Meta:
        model = GalleryItem
        fields = [
            "id",
            "title",
            "category",
            "category_display",
            "event_year",
            "image",
            "image_url",
            "final_image_url",
            "caption",
            "is_featured",
            "display_order",
            "created_at",
            "updated_at",
        ]

    def validate_title(self, value):
        return to_title_case(str(value or "").strip()) if value else ""

