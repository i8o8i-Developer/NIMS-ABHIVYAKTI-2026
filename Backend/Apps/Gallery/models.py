"""Gallery Photos And Videos Data Model."""

from django.db import models


class GalleryCategory(models.TextChoices):
    DANCE = "DANCE", "Classical & Western Dance"
    MUSIC = "MUSIC", "Battle Of The Bands & Vocals"
    THEATRE = "THEATRE", "Theatre & Street Play (Nukkad Natak)"
    FASHION = "FASHION", "Fashion & Runway Couture"
    STAR_NIGHT = "STAR_NIGHT", "Celebrity Star Night & Concerts"
    AWARDS = "AWARDS", "Grand Trophies & Valedictory"
    CROWD = "CROWD", "Festival Grounds & Atmosphere"
    GENERAL = "GENERAL", "Campus Highlights"


class GalleryItem(models.Model):
    """Fest Photo Or Media Capture."""

    title = models.CharField(max_length=200, blank=True, default="", help_text="Photo Title / Caption")
    category = models.CharField(max_length=50, choices=GalleryCategory.choices, default=GalleryCategory.GENERAL)
    event_year = models.CharField(max_length=10, default="2026", help_text="e.g. 2026, 2025, 2024")
    image = models.ImageField(upload_to="gallery/", blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True, help_text="Optional CDN / External Image URL")
    caption = models.TextField(blank=True, default="")
    is_featured = models.BooleanField(default=False, help_text="Highlight On Landing Page Gallery Carousel")
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-event_year", "display_order", "-created_at"]
        verbose_name = "Gallery Photo"
        verbose_name_plural = "Gallery Photos"

    def __str__(self):
        return f"{self.title or 'Photo'} ({self.event_year} - {self.get_category_display()})"

    @property
    def final_image_url(self) -> str:
        if self.image:
            return self.image.url
        return self.image_url or "/Assets/IMG-20261006-WA0125.png"

