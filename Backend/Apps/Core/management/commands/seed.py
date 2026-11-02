"""Seed Data Management Command For NIMS Abhivyakti 2026 Cultural Championship."""

import os
from datetime import datetime
from django.core.management.base import BaseCommand
from django.utils import timezone
from Apps.Accounts.models import User
from Apps.Colleges.models import College
from Apps.Competitions.models import Competition, CompetitionCategory, CompetitionStatus
from Apps.Scores.models import Score
from Apps.Participants.models import Participant
from Apps.Gallery.models import GalleryItem, GalleryCategory
from Apps.Core.models import EventSetting


class Command(BaseCommand):
    help = "Seed Initial Colleges, 15 Image Schedule Events, Gallery And Administrator"

    def handle(self, *args, **options):
        self.stdout.write("Seeding NIMS Abhivyakti 2026 Cultural Championship Database...")

        # 1. Event Settings
        event_setting = EventSetting.get_settings()
        event_setting.event_name = "NIMS Abhivyakti 2026"
        event_setting.tagline = "Celebrating Cultural Majesty & Excellence"
        event_setting.date_range_display = "21–22 November 2026"
        event_setting.venue = "Rajeshwari Auditorium & NIMS Convention Grounds, Jaipur"
        event_setting.marquee_announcements = [
            "NIMS University Cultural Championship 2026",
            "Abhivyakti 2026 Prestigious Championship Rolling Trophy",
            "Mega Battle Of The Bands & Rock Concert Prelims Open",
            "Star Celebrity Night Announcement Dropping Soon",
            "High-Stakes Nukkad Natak & Classical Dance Active",
        ]
        event_setting.save()
        self.stdout.write(self.style.SUCCESS("Event Settings Configured"))

        # 2. Staff Accounts
        superadmin_email = os.getenv("SUPERADMIN_EMAIL", "admin@abhivyakti.nsiif.org").lower().strip()
        superadmin_password = os.getenv("SUPERADMIN_PASSWORD", "AdminPassword2026!")

        if not User.objects.filter(email=superadmin_email).exists():
            User.objects.create_superuser(
                email=superadmin_email,
                password=superadmin_password,
                full_name="Abhivyakti Festival Administrator",
                role="super_admin",
            )
            self.stdout.write(self.style.SUCCESS(f"Super Admin Created: {superadmin_email}"))

        # Judge / Coordinator Accounts
        judge_email = "judge@abhivyakti.nsiif.org"
        if not User.objects.filter(email=judge_email).exists():
            User.objects.create_user(
                email=judge_email,
                password="JudgePassword2026!",
                full_name="Chief Jury Official",
                role="judge",
                is_staff=True,
            )

        # 3. Seed 12 Participating NIMS Institutes & Colleges
        colleges_data = [
            ("NIMS Institute Of Engineering & Technology", "NIET", "#1D2F6F", "Prof. Rakesh Verma", "rakesh.verma@nimsuniversity.org"),
            ("National Institute Of Medical Sciences", "NIMS Medical", "#8B0000", "Dr. Sunita Sharma", "sunita.sharma@nimsuniversity.org"),
            ("NIMS Dental College & Hospital", "NDCH", "#059669", "Dr. Amit Agrawal", "amit.agrawal@nimsuniversity.org"),
            ("NIMS Institute Of Management & Commerce", "NIMC", "#D97706", "Prof. Priya Mehta", "priya.mehta@nimsuniversity.org"),
            ("NIMS Law School", "NLS", "#4B5563", "Dr. Rajesh Chauhan", "rajesh.chauhan@nimsuniversity.org"),
            ("NIMS College Of Pharmacy", "NCP", "#7C3AED", "Dr. Neha Saxena", "neha.saxena@nimsuniversity.org"),
            ("NIMS College Of Nursing", "NCN", "#DB2777", "Prof. Mary Joseph", "mary.joseph@nimsuniversity.org"),
            ("NIMS College Of Physiotherapy & Occupational Therapy", "NCPT", "#0284C7", "Dr. Vikas Yadav", "vikas.yadav@nimsuniversity.org"),
            ("NIMS Institute Of Allied Health Sciences", "NIAHS", "#0D9488", "Dr. Pooja Rathore", "pooja.rathore@nimsuniversity.org"),
            ("NIMS School Of Humanities & Social Sciences", "NSHSS", "#EA580C", "Prof. Sanjay Mishra", "sanjay.mishra@nimsuniversity.org"),
            ("NIMS School Of Computing & AI", "NSCAI", "#2563EB", "Prof. Ananya Sen", "ananya.sen@nimsuniversity.org"),
            ("NIMS Institute Of Hotel Management & Culinary Arts", "NIHM", "#B45309", "Chef Vikram Rawat", "vikram.rawat@nimsuniversity.org"),
        ]

        created_colleges = {}
        for name, code, color, contact, email in colleges_data:
            col, _ = College.objects.get_or_create(
                code=code,
                defaults={
                    "name": name,
                    "city": "Jaipur",
                    "state": "Rajasthan",
                    "avatar_color": color,
                    "contact_person": contact,
                    "contact_email": email,
                    "is_active": True,
                },
            )
            created_colleges[code] = col

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(created_colleges)} NIMS Colleges & Institutes"))

        # 4. Seed All 15 Competitions Exactly From User Image 2 Reference
        events_data = [
            # Day 1 - 21 Nov
            {
                "code": "DAN-01",
                "title": "Dance - Solo, Duet & Group (Round 1)",
                "category": CompetitionCategory.DANCE,
                "venue": "Rajeshwari Auditorium",
                "time_str": "2026-11-21 10:00:00",
                "round": "Round 1",
                "rules": "Performance Time Limit: Solo (3-4 Mins), Duet (4-5 Mins), Group (6-8 Mins). Track Must Be Submitted In MP3 Format 1 Hour Prior. Classical, Contemporary, Bollywood & Folk Permitted.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "MUS-01",
                "title": "Singing - Solo, Duet & Group (Round 1)",
                "category": CompetitionCategory.MUSIC,
                "venue": "Management - LT 10 & 11",
                "time_str": "2026-11-21 10:00:00",
                "round": "Round 1",
                "rules": "Vocal Time: 4 Minutes Max. Live Acoustic Instruments Or Standard Karaoke Backing Permitted. Classical, Semi-Classical, Sufi, Light Western & Bollywood Accepted.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "ART-01",
                "title": "Face Painting",
                "category": CompetitionCategory.FINE_ARTS,
                "venue": "Management - LT 16 & 17",
                "time_str": "2026-11-21 14:00:00",
                "round": "Finals",
                "rules": "Duration: 90 Minutes. Theme Will Be Disclosed On The Spot. Only Non-Toxic Skin-Safe Paints And Brushes Allowed. Models Must Be NIMS Students.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "ART-02",
                "title": "Best Out Of Waste",
                "category": CompetitionCategory.FINE_ARTS,
                "venue": "Management - LT 21",
                "time_str": "2026-11-21 14:00:00",
                "round": "Finals",
                "rules": "Duration: 2 Hours. Team Size: 1-2 Students. All Raw Materials Must Be Clean Recycled Or Scrap Articles. No Pre-Assembled Structure Allowed.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "FAS-01",
                "title": "Fashion Upcycling",
                "category": CompetitionCategory.FASHION,
                "venue": "Fashion Lab & LT 16, 17",
                "time_str": "2026-11-21 15:00:00",
                "round": "Finals",
                "rules": "Transform Existing Clothing Into Avant-Garde Couture. Time Limit: 2.5 Hours Followed By A 2-Minute Ramp Walk Before Jury.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "LIT-01",
                "title": "Doodling Competition",
                "category": CompetitionCategory.LITERARY,
                "venue": "Moot Court 2",
                "time_str": "2026-11-21 16:00:00",
                "round": "Finals",
                "rules": "Duration: 60 Minutes. Cartridge Paper Provided. Black Fineliners And Markers Permitted. Visual Storytelling & Conceptual Ingenuity Evaluated.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "ART-03",
                "title": "Collage Making",
                "category": CompetitionCategory.FINE_ARTS,
                "venue": "LT 21, 15",
                "time_str": "2026-11-21 16:00:00",
                "round": "Finals",
                "rules": "Duration: 90 Minutes. Theme: 'Cultural Symphony & Youth Awakening'. Newspapers, Magazines, Scissors, And Adhesives Allowed.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "ART-04",
                "title": "Clay Art",
                "category": CompetitionCategory.FINE_ARTS,
                "venue": "Corridor - 1st Floor",
                "time_str": "2026-11-21 16:00:00",
                "round": "Finals",
                "rules": "Duration: 2 Hours. Natural Terracotta Clay Provided By Fest Committee. Sculpture Craftsmanship, Proportions And Theme Alignment Judged.",
                "status": CompetitionStatus.COMPLETED,
            },
            # Day 2 - 22 Nov
            {
                "code": "THE-01",
                "title": "Mono Act",
                "category": CompetitionCategory.THEATRE,
                "venue": "Rajeshwari Auditorium",
                "time_str": "2026-11-22 09:00:00",
                "round": "Finals",
                "rules": "Solo Performance Time: 4-6 Minutes. Minimal Hand Props Allowed. Script May Be In Hindi, English Or Regional Dialect. Expression, Dialogue Delivery & Character Transition Judged.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "DAN-02",
                "title": "Dance - Solo, Duet & Group (Round 2)",
                "category": CompetitionCategory.DANCE,
                "venue": "Rajeshwari Auditorium",
                "time_str": "2026-11-22 11:00:00",
                "round": "Round 2 / Finals",
                "rules": "Grand Finale Round. Time Limit: 8 Minutes For Groups, 5 Minutes For Duets/Solo. Synchronisation, Choreography Complexity, Stage Dominance & Costumes Judged.",
                "status": CompetitionStatus.ONGOING,
            },
            {
                "code": "MUS-02",
                "title": "Singing - Solo, Duet & Group (Round 2)",
                "category": CompetitionCategory.MUSIC,
                "venue": "LT 10 & 11",
                "time_str": "2026-11-22 11:00:00",
                "round": "Round 2 / Finals",
                "rules": "Final Musical Showcase. Pitch Accuracy (Sur), Rhythm (Taal), Vocal Range, Modulation & Stage Charisma Evaluated By Renowned Music Gurus.",
                "status": CompetitionStatus.ONGOING,
            },
            {
                "code": "AI-01",
                "title": "AI Art",
                "category": CompetitionCategory.DIGITAL_AI,
                "venue": "LT 25",
                "time_str": "2026-11-22 14:00:00",
                "round": "Finals",
                "rules": "Prompt Engineering & Generative Visual Art. Duration: 90 Minutes. Participants Create Thematic Imagery Using AI Platforms With Complete Workflow Logs.",
                "status": CompetitionStatus.UPCOMING,
            },
            {
                "code": "LIT-02",
                "title": "Calligraphy",
                "category": CompetitionCategory.LITERARY,
                "venue": "Moot Court",
                "time_str": "2026-11-22 14:00:00",
                "round": "Finals",
                "rules": "Duration: 60 Minutes. Calligraphy Pens, Inks & Nibs. Script Options: Devanagari, English Gothic, Copperplate Or Arabic.",
                "status": CompetitionStatus.UPCOMING,
            },
            {
                "code": "FAS-02",
                "title": "MakeUp Contest",
                "category": CompetitionCategory.FASHION,
                "venue": "LT 16, 17 & Corridor (2nd Floor)",
                "time_str": "2026-11-22 14:30:00",
                "round": "Finals",
                "rules": "Duration: 75 Minutes. Fantasy Or Cinematic Editorial MakeUp. Blending, Contouring, Safety, Hygiene And Originality Evaluated.",
                "status": CompetitionStatus.UPCOMING,
            },
            {
                "code": "FAS-03",
                "title": "Kick Drip",
                "category": CompetitionCategory.FASHION,
                "venue": "LT 21 & 15",
                "time_str": "2026-11-22 14:30:00",
                "round": "Finals",
                "rules": "Custom Sneaker Design & Footwear Customisation. Sneaker Canvas Or White Shoes Provided. Acrylics, Finishes & Street Style Aesthetic Judged.",
                "status": CompetitionStatus.UPCOMING,
            },
        ]

        created_competitions = {}
        for ev in events_data:
            dt = datetime.strptime(ev["time_str"], "%Y-%m-%d %H:%M:%S")
            tz_dt = timezone.make_aware(dt) if timezone.is_naive(dt) else dt
            comp, _ = Competition.objects.get_or_create(
                code=ev["code"],
                defaults={
                    "title": ev["title"],
                    "category": ev["category"],
                    "venue": ev["venue"],
                    "scheduled_at": tz_dt,
                    "round_name": ev["round"],
                    "rules": ev["rules"],
                    "status": ev["status"],
                    "first_place_points": 100,
                    "second_place_points": 70,
                    "third_place_points": 40,
                    "participation_points": 10,
                },
            )
            created_competitions[ev["code"]] = comp

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(created_competitions)} Official Schedule Competitions"))

        # 5. Seed Realistic Verified Results For Leaderboard Standings
        sample_results = [
            ("DAN-01", "NIET", 1, 94.5, "Exemplary Folk Fusion Performance"),
            ("DAN-01", "NDCH", 2, 89.0, "High Energy Semi-Classical Duet"),
            ("DAN-01", "NIMC", 3, 85.5, "Strong Group Synchronization"),
            ("MUS-01", "NIMS Medical", 1, 96.0, "Soulful Classical Raag Performance"),
            ("MUS-01", "NIET", 2, 91.5, "Flawless Vocal Range"),
            ("MUS-01", "NLS", 3, 87.0, "Acoustic Melody"),
            ("ART-01", "NCP", 1, 92.0, "Intricate Tribal Mask Design"),
            ("ART-01", "NIMS Medical", 2, 88.5, "Vibrant Optical Illusion"),
            ("ART-01", "NSCAI", 3, 83.0, "Cyberpunk Aesthetic"),
            ("ART-02", "NDCH", 1, 95.0, "Remarkable Kinetic Eco-Sculpture"),
            ("ART-02", "NIMC", 2, 89.5, "Functional Recycled Desk Lamp"),
            ("ART-02", "NIET", 3, 84.0, "Cardboard Automaton"),
            ("FAS-01", "NIHM", 1, 93.0, "Outstanding Denim Upcycled Ensemble"),
            ("FAS-01", "NCN", 2, 88.0, "Vintage Saree Reimagined"),
            ("FAS-01", "NLS", 3, 82.5, "Sustainable Streetwear"),
            ("LIT-01", "NSCAI", 1, 97.0, "Astonishing Detail In Black Ink Doodle"),
            ("LIT-01", "NIET", 2, 91.0, "Expressive Surrealist Collage"),
            ("LIT-01", "NIMC", 3, 86.0, "Comic Strip Storytelling"),
            ("THE-01", "NLS", 1, 98.0, "Gripping Monologue On Justice & Society"),
            ("THE-01", "NIMS Medical", 2, 92.5, "Emotional Portrayal Of A Healer"),
            ("THE-01", "NIET", 3, 87.5, "Comic Satire On Modern Tech"),
        ]

        for code, c_code, rank, raw, remark in sample_results:
            comp = created_competitions.get(code)
            col = created_colleges.get(c_code)
            if comp and col:
                Score.objects.get_or_create(
                    competition=comp,
                    college=col,
                    defaults={
                        "rank": rank,
                        "raw_score": raw,
                        "remarks": remark,
                        "is_verified": True,
                    },
                )

        self.stdout.write(self.style.SUCCESS("Seeded Verified Judging Results & Scores"))

        # 6. Seed High Quality Gallery Items
        gallery_data = [
            ("Grand Opening Ceremony & Lamp Lighting", GalleryCategory.GENERAL, "2026", "/Assets/IMG-20261006-WA0125.png", "Honourable Chancellor & Vice-Chancellor Inaugurating Abhivyakti 2026", True, 1),
            ("Classical Dance Prelims At Rajeshwari Auditorium", GalleryCategory.DANCE, "2026", "/Assets/IMG-20261006-WA0125.png", "Mesmerizing Kathak Performance By NIET Contingent", True, 2),
            ("Battle Of The Bands High Voltage Concert", GalleryCategory.MUSIC, "2026", "/Assets/IMG-20261006-WA0125.png", "Electrifying Rock Band Finals Under Central Convention Lights", True, 3),
            ("Nukkad Natak Street Play Arena", GalleryCategory.THEATRE, "2025", "/Assets/IMG-20261006-WA0125.png", "Impactful Social Awareness Drama By NIMS Law School", False, 4),
            ("Runway Couture & Fashion Showcase", GalleryCategory.FASHION, "2025", "/Assets/IMG-20261006-WA0125.png", "Spectacular Sustainable Fashion Upcycling Showcase", False, 5),
            ("Celebrity Star Night Crowd & Fest Euphoria", GalleryCategory.STAR_NIGHT, "2025", "/Assets/IMG-20261006-WA0125.png", "Over 5,000 Students Celebrating Star Celebrity Musical Night", True, 6),
        ]

        for title, cat, yr, img_url, cap, feat, order in gallery_data:
            GalleryItem.objects.get_or_create(
                title=title,
                defaults={
                    "category": cat,
                    "event_year": yr,
                    "image_url": img_url,
                    "caption": cap,
                    "is_featured": feat,
                    "display_order": order,
                },
            )

        self.stdout.write(self.style.SUCCESS("Seeded Abhivyakti Gallery Highlights"))
        self.stdout.write(self.style.SUCCESS("ALL ABHIVYAKTI SEED DATA INITIALIZED SUCCESSFULLY!"))
