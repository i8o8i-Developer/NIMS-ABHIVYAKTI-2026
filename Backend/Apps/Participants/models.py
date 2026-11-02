"""Student Participants Roster."""

from django.db import models
from Apps.Colleges.models import College
from Apps.Competitions.models import Competition
from Apps.Core.TitleCase import to_title_case


class Participant(models.Model):
    """Student Competing In Cultural Events Representing A College."""

    college = models.ForeignKey(
        College,
        on_delete=models.CASCADE,
        related_name="participants",
        help_text="The Institute Represented",
    )
    name = models.CharField(max_length=200, help_text="Full Student Name")
    student_id = models.CharField(max_length=100, help_text="College Roll Number Or Student ID")
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=25, blank=True, null=True)
    gender = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        choices=[
            ("MALE", "Male"),
            ("FEMALE", "Female"),
            ("OTHER", "Other"),
            ("PREFER_NOT_TO_SAY", "Prefer Not To Say"),
        ],
    )
    competitions = models.ManyToManyField(
        Competition,
        related_name="participants",
        blank=True,
        help_text="Competitions Registered For",
    )
    role = models.CharField(
        max_length=100,
        default="Participant",
        help_text="e.g. Soloist, Band Lead, Vocalist, Classical Dancer, Contingent Leader",
    )
    notes = models.TextField(blank=True, null=True)
    registered_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["college__name", "name"]
        verbose_name = "Student Participant"
        verbose_name_plural = "Student Participants"

    def __str__(self):
        return f"{self.name} ({self.student_id}) - {self.college.code}"

    def save(self, *args, **kwargs):
        if self.name:
            self.name = to_title_case(self.name.strip())
        if self.student_id:
            self.student_id = self.student_id.strip().upper()
        super().save(*args, **kwargs)

