"""Competition Scores And Live Judging Points."""

from django.db import models
from Apps.Competitions.models import Competition
from Apps.Colleges.models import College
from Apps.Participants.models import Participant


class Score(models.Model):
    """Result / Score Record Evaluated By Fest Judges."""

    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, related_name="scores")
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name="scores")
    participant = models.ForeignKey(
        Participant,
        on_delete=models.CASCADE,
        related_name="scores",
        null=True,
        blank=True,
        help_text="Student Participant Evaluated",
    )
    rank = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
        help_text="1 = 1st Place (Gold), 2 = 2nd Place (Silver), 3 = 3rd Place (Bronze), 0 or Null For Participant",
    )
    raw_score = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        default=0.0,
        help_text="Judges Direct Marks (Out Of 100)",
    )
    points_awarded = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        default=0.0,
        help_text="Championship Points Awarded Toward Overall Institutional Trophy",
    )
    remarks = models.TextField(blank=True, null=True, help_text="Judge Comments Or Technical Notes")
    is_verified = models.BooleanField(default=True, help_text="Official Verified Result")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["competition", "rank", "-raw_score"]
        verbose_name = "Competition Score"
        verbose_name_plural = "Competition Scores"

    def __str__(self):
        participant_str = f" ({self.participant.name})" if self.participant else ""
        return f"{self.competition.title} - {self.college.code}{participant_str}: {self.points_awarded} Pts"

    def save(self, *args, **kwargs):
        # Auto-Associate College From Participant If Set
        if self.participant and not self.college_id:
            self.college = self.participant.college

        # Automatically Allot Points Based On Rank
        if (self.points_awarded is None or float(self.points_awarded) == 0.0) and self.rank is not None:
            if self.rank == 1:
                self.points_awarded = self.competition.first_place_points
            elif self.rank == 2:
                self.points_awarded = self.competition.second_place_points
            elif self.rank == 3:
                self.points_awarded = self.competition.third_place_points
            elif self.rank == 0:
                self.points_awarded = self.competition.participation_points
        elif (self.points_awarded is None or float(self.points_awarded) == 0.0) and self.raw_score and float(self.raw_score) > 0:
            self.points_awarded = self.raw_score

        super().save(*args, **kwargs)
