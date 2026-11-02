"""Competitions And Cultural Events Data Models."""

from django.db import models


class CompetitionCategory(models.TextChoices):
    DANCE = "DANCE", "Dance (Solo / Duet / Group)"
    MUSIC = "MUSIC", "Singing & Music (Solo / Duet / Band)"
    THEATRE = "THEATRE", "Theatre, Drama & Mono Act"
    FINE_ARTS = "FINE_ARTS", "Fine Arts & Painting"
    LITERARY = "LITERARY", "Literary, Doodling & Calligraphy"
    FASHION = "FASHION", "Fashion Upcycling & MakeUp"
    DIGITAL_AI = "DIGITAL_AI", "AI Art & Digital Design"
    SPECIAL = "SPECIAL", "Special Highlights & Star Night"


class CompetitionStatus(models.TextChoices):
    UPCOMING = "UPCOMING", "Upcoming"
    ONGOING = "ONGOING", "Ongoing / In Progress"
    COMPLETED = "COMPLETED", "Completed & Judged"


class Competition(models.Model):
    """Specific Cultural Competition Or Fest Event."""

    title = models.CharField(max_length=200, help_text="e.g. Dance - Solo, Duet & Group (Round 1)")
    code = models.CharField(max_length=50, unique=True, help_text="e.g. DAN-01, MUS-01, ART-01")
    category = models.CharField(max_length=50, choices=CompetitionCategory.choices, default=CompetitionCategory.DANCE)
    description = models.TextField(blank=True, null=True)
    venue = models.CharField(max_length=150, default="Rajeshwari Auditorium")
    scheduled_at = models.DateTimeField(blank=True, null=True)
    round_name = models.CharField(max_length=50, default="Round 1", help_text="e.g. Round 1, Round 2, Finals")
    max_participants_per_college = models.PositiveIntegerField(default=1, help_text="Maximum Registered Entries Per Institute")
    rules = models.TextField(blank=True, null=True, help_text="Rules, Time Limits, Props, Evaluation Criteria")
    status = models.CharField(max_length=30, choices=CompetitionStatus.choices, default=CompetitionStatus.UPCOMING)

    # Championship Points Allotment
    first_place_points = models.PositiveIntegerField(default=100)
    second_place_points = models.PositiveIntegerField(default=70)
    third_place_points = models.PositiveIntegerField(default=40)
    participation_points = models.PositiveIntegerField(default=10)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["scheduled_at", "category", "title"]
        verbose_name = "Competition / Event"
        verbose_name_plural = "Competitions & Events"

    def __str__(self):
        return f"{self.title} [{self.get_category_display()}] - {self.venue}"

