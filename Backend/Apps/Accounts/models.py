"""Custom User Model With Role-Based Access Control For Abhivyakti 2026."""

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):
    """Manager For Custom User Model Using Email As Primary Identifier."""

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email Address Is Required")
        email = self.normalize_email(email).lower()
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("role", "super_admin")
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """Staff & Identity User Model For Abhivyakti 2026."""

    ROLE_CHOICES = (
        ("super_admin", "Super Admin"),
        ("coordinator", "Festival Coordinator"),
        ("judge", "Jury & Judge"),
        ("operator", "Desk Operator"),
        ("viewer", "Stadium Screen Display"),
    )

    email = models.EmailField(unique=True, db_index=True)
    full_name = models.CharField(max_length=150)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="operator")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name"]

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return f"{self.full_name} ({self.email}) - {self.get_role_display()}"

    @property
    def is_super_admin(self):
        return self.role == "super_admin" or self.is_superuser

    @property
    def is_coordinator(self):
        return self.role in ("coordinator", "super_admin") or self.is_superuser

    @property
    def is_judge(self):
        return self.role in ("judge", "coordinator", "super_admin") or self.is_superuser

    @property
    def is_operator(self):
        return self.is_active
