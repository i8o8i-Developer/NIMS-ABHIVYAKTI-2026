"""Core Domain Models For Abhivyakti Cultural Championship."""

from django.db import models
from django.conf import settings


class EventSetting(models.Model):
    """Singleton Configuration Storing Abhivyakti Event Information And Live Controls."""

    event_name = models.CharField(max_length=200, default="NIMS Abhivyakti 2026")
    tagline = models.CharField(max_length=255, default="NIMS University Inter-College Cultural Championship 2026")
    edition = models.CharField(max_length=50, default="2026")
    start_date = models.DateTimeField(help_text="Grand Opening Ceremony Date & Time")
    end_date = models.DateTimeField(blank=True, null=True, help_text="Valedictory & Awards Ceremony")
    date_range_display = models.CharField(max_length=150, default="21–22 November 2026")
    venue = models.CharField(max_length=200, default="Rajeshwari Auditorium & Convention Grounds, NIMS University Rajasthan, Jaipur")
    marquee_announcements = models.JSONField(
        default=list,
        help_text="Live Running Marquee Announcement Tickers",
    )
    feature_flags = models.JSONField(
        default=dict,
        help_text="Remote Control Over Live Leaderboard, Rules Download, And Scoring",
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Festival Event Setting"
        verbose_name_plural = "Festival Event Settings"

    def __str__(self):
        return f"{self.event_name} ({self.date_range_display})"

    @classmethod
    def get_settings(cls):
        """Retrieve Existing Singleton Settings Or Create Default Instance."""
        obj, _ = cls.objects.get_or_create(
            id=1,
            defaults={
                "event_name": "NIMS Abhivyakti 2026",
                "tagline": "Celebrating Cultural Majesty & Excellence",
                "edition": "2026",
                "start_date": "2026-11-21T09:00:00+05:30",
                "end_date": "2026-11-22T20:00:00+05:30",
                "date_range_display": "21–22 November 2026",
                "venue": "Rajeshwari Auditorium & NIMS Convention Grounds, Jaipur",
                "marquee_announcements": [
                    "NIMS University Cultural Championship 2026",
                    "Abhivyakti 2026 Prestigious Championship Rolling Trophy",
                    "Mega Battle Of The Bands & Rock Concert Prelims Open",
                    "Star Celebrity Night Announcement Dropping Soon",
                    "High-Stakes Nukkad Natak & Classical Dance Prelims Active",
                ],
                "feature_flags": {
                    "live_leaderboard_active": True,
                    "jury_scoring_open": True,
                    "rules_download_active": True,
                    "star_night_banner_active": True,
                },
            },
        )
        return obj


class AuditLog(models.Model):
    """Immutable Ledger For Staff Actions, Jury Scoring & System Modifiers."""

    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="audit_logs",
    )
    action = models.CharField(max_length=150)
    target_type = models.CharField(max_length=100)
    target_id = models.CharField(max_length=100, blank=True, null=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Audit Log"
        verbose_name_plural = "Audit Logs"

    def __str__(self):
        return f"{self.action} on {self.target_type} at {self.created_at}"

