"""Participating Colleges And Institutes Model."""

from django.db import models
from django.db.models import Sum, Count, Q


class College(models.Model):
    """Participating College Or University Institute In Abhivyakti 2026."""

    name = models.CharField(max_length=255, unique=True, help_text="Full Institution Name, e.g. NIMS Institute Of Engineering & Technology")
    code = models.CharField(max_length=50, unique=True, help_text="Short College Code, e.g. NIET, NDCH, NLS")
    city = models.CharField(max_length=100, default="Jaipur")
    state = models.CharField(max_length=100, default="Rajasthan")
    contact_person = models.CharField(max_length=150, blank=True, null=True, help_text="Contingent Leader Or Faculty Coordinator")
    contact_email = models.EmailField(blank=True, null=True)
    contact_phone = models.CharField(max_length=20, blank=True, null=True)
    avatar_color = models.CharField(max_length=20, default="#800020", help_text="Hex Color For Crest Badges, e.g. #800020 (Maroon), #D4AF37 (Gold)")
    logo_url = models.URLField(max_length=500, blank=True, null=True, help_text="Optional Crest Or Logo Image Link")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "College / Institute"
        verbose_name_plural = "Colleges & Institutes"

    def __str__(self):
        return f"{self.name} ({self.code})"

    @property
    def total_points(self) -> float:
        """Calculate Aggregate Championship Points From Verified Scores."""
        agg = self.scores.filter(is_verified=True).aggregate(total=Sum("points_awarded"))
        return float(agg["total"] or 0.0)

    @property
    def gold_medals(self) -> int:
        return self.scores.filter(is_verified=True, rank=1).count()

    @property
    def silver_medals(self) -> int:
        return self.scores.filter(is_verified=True, rank=2).count()

    @property
    def bronze_medals(self) -> int:
        return self.scores.filter(is_verified=True, rank=3).count()

    @property
    def events_participated(self) -> int:
        return self.scores.filter(is_verified=True).count()

