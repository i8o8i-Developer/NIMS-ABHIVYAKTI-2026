"""System Bootstrap Management Command For Production.

Initializes Super Administrator Account From Environment Variables.
"""

import os
from django.core.management.base import BaseCommand
from Apps.Accounts.models import User


class Command(BaseCommand):
    help = "Initialize Administrator Accounts From Environment Variables"

    def add_arguments(self, parser):
        parser.add_argument(
            "--force",
            action="store_true",
            help="Force Re-Execution Of Bootstrap Even If Administrator Already Exists",
        )

    def handle(self, *args, **options):
        force = options.get("force", False)
        admin_exists = (
            User.objects.filter(role="super_admin").exists()
            or User.objects.filter(is_superuser=True).exists()
        )

        if admin_exists and not force:
            self.stdout.write(
                self.style.SUCCESS(
                    "Administrator Account Already Exists. Skipping Bootstrap (Execution Bypassed)."
                )
            )
            return

        self.stdout.write("Running Administrator Account Initialization...")

        superadmin_email = os.getenv("SUPERADMIN_EMAIL", "admin@abhivyakti.nsiif.org").strip().lower()
        superadmin_password = os.getenv("SUPERADMIN_PASSWORD", "AdminPassword2026!")
        superadmin_name = os.getenv("SUPERADMIN_NAME", "Abhivyakti Festival Administrator").strip()

        if superadmin_email and superadmin_password:
            superadmin, sa_created = User.objects.get_or_create(
                email=superadmin_email,
                defaults={
                    "full_name": superadmin_name,
                    "role": "super_admin",
                    "is_staff": True,
                    "is_superuser": True,
                    "is_active": True,
                },
            )
            superadmin.set_password(superadmin_password)
            superadmin.full_name = superadmin_name
            superadmin.role = "super_admin"
            superadmin.is_staff = True
            superadmin.is_superuser = True
            superadmin.is_active = True
            superadmin.save()

            if sa_created:
                self.stdout.write(self.style.SUCCESS(f"Super Admin Account Created: {superadmin_email}"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Super Admin Credentials Synchronized: {superadmin_email}"))
        else:
            self.stdout.write(self.style.WARNING("SUPERADMIN_EMAIL Or SUPERADMIN_PASSWORD Not Set."))

        self.stdout.write(self.style.SUCCESS("Bootstrap Completed: Admin Seed Only"))

