"""Seed Data Management Command For NIMS Abhivyakti 2026 Cultural Championship.
Seeded with all 22 official competitions, arenas, venues, dates (18-21 Nov 2026),
and exact timings from Page 20 of AbhivyaktiRulebookFinal.pdf.
"""

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
    help = "Seed Initial Colleges, 22 Official Rulebook Competitions, Gallery And Directorate Administrator"

    def handle(self, *args, **options):
        self.stdout.write("Seeding NIMS Abhivyakti 2026 Cultural Championship Database...")

        # 1. Event Settings (18-21 November 2026)
        event_setting = EventSetting.get_settings()
        event_setting.event_name = "NIMS Abhivyakti 2026"
        event_setting.tagline = "Celebrating Cultural Majesty & Excellence"
        event_setting.edition = "2026"
        event_setting.start_date = timezone.make_aware(datetime(2026, 11, 18, 9, 0, 0))
        event_setting.end_date = timezone.make_aware(datetime(2026, 11, 21, 21, 0, 0))
        event_setting.date_range_display = "18–21 November 2026"
        event_setting.venue = "Rajeshwari Auditorium & NIMS Convention Grounds, Jaipur"
        event_setting.marquee_announcements = [
            "NIMS University Cultural Championship 2026 • 18-21 November 2026",
            "Abhivyakti 2026 Prestigious Championship Rolling Trophy",
            "Day 1: Groove-o-Mania & Harmony Hustle Prelims Live",
            "Day 2: Couture Upcycling & Visual Arts Arena",
            "Day 3: SoloFlix Mono Act & Literature Quiz Finale",
            "Day 4: Grand Finale & Couture Clique at Cricket Ground",
        ]
        event_setting.feature_flags = {
            "live_leaderboard_active": True,
            "jury_scoring_open": True,
            "rules_download_active": True,
            "star_night_banner_active": True,
        }
        event_setting.save()
        self.stdout.write(self.style.SUCCESS("Event Settings Configured (18-21 November 2026)"))

        # 2. Staff Accounts
        # Primary Super Admin (admin@nims.ac.in)
        nims_admin_email = "admin@nims.ac.in"
        nims_admin_pass = "Abhivyakti@2026"
        if not User.objects.filter(email=nims_admin_email).exists():
            User.objects.create_superuser(
                email=nims_admin_email,
                password=nims_admin_pass,
                full_name="Fest Directorate Administrator",
                role="super_admin",
            )
            self.stdout.write(self.style.SUCCESS(f"Super Admin Created: {nims_admin_email}"))
        else:
            u = User.objects.get(email=nims_admin_email)
            u.set_password(nims_admin_pass)
            u.role = "super_admin"
            u.is_superuser = True
            u.is_staff = True
            u.save()

        # Secondary Super Admin
        sec_admin_email = "admin@abhivyakti.nsiif.org"
        if not User.objects.filter(email=sec_admin_email).exists():
            User.objects.create_superuser(
                email=sec_admin_email,
                password="AdminPassword2026!",
                full_name="Abhivyakti System Administrator",
                role="super_admin",
            )

        # Official Jury Account
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

        # 4. Seed All 22 Official Competitions & Contests From AbhivyaktiRulebookFinal.pdf
        # Exact schedule and venues from Page 20
        events_data = [
            # ──────── DAY 1: 18th November 2026 (Wednesday) ────────
            {
                "code": "DAN-01",
                "title": "Groove-o-Mania (Dance) - Solo, Duet & Group (Rd 1)",
                "category": CompetitionCategory.DANCE,
                "venue": "Rajeshwari Auditorium",
                "time_str": "2026-11-18 10:00:00",
                "round": "Round 1 (Original Performances)",
                "rules": "Solo (Max 3 Mins, 3m/3f), Duet (Max 3 Mins, 2 Pairs), Group (Max 5 Mins, 1 Team Of 6-10). All Dance Forms Allowed. 3-Round Format: Round 1 (Original), Round 2 (Battle Round With Draw Tracks), Round 3 (Grand Finale). Judged On Choreography, Synchronization, Expressions, Costumes & Stage Presence.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "MUS-01",
                "title": "Harmony Hustle (Singing) – Solo, Duet, RAP & Group (Rd 1)",
                "category": CompetitionCategory.MUSIC,
                "venue": "NIMS School of Law - LT 10 & 11",
                "time_str": "2026-11-18 10:00:00",
                "round": "Round 1 (Prelims)",
                "rules": "Solo (Max 3 Mins, 3m/3f), Duet (Max 3 Mins, 2 Pairs, Both Singers), Group (Max 5 Mins, 1 Team Of 6-10), Rap (Single Round). Karaoke Permitted. One Accompanist Permitted. Judged On Swara (Pitch), Taal (Rhythm), Voice Quality & Stage Presence.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "LIT-01",
                "title": "Spellbound (Spell Bee - Round 1)",
                "category": CompetitionCategory.LITERARY,
                "venue": "Marik Hall",
                "time_str": "2026-11-18 14:00:00",
                "round": "Round 1 (Dictation)",
                "rules": "5 Solo Participants Per College (At Least 1 Female). Round 1 Dictation Consists Of 20 Words Dictated To All. Top 30 Participants Advance To Round 2 Moderate Spell Bee. Four-Round Elimination Tournament.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "LIT-02",
                "title": "Alfaaz Unplugged (Poetry Slam – Hindi & English)",
                "category": CompetitionCategory.LITERARY,
                "venue": "Marik / NIET",
                "time_str": "2026-11-18 14:00:00",
                "round": "Finals",
                "rules": "5 Solo Participants Per Language Per College. 15 Minutes On-Spot Preparation, 2-3 Minutes Performance Time. Must Create Original Poetry On The Spot Without External Reference. Judged On Originality, Writing, Imagery, Voice & Stage Presence.",
                "status": CompetitionStatus.COMPLETED,
            },

            # ──────── DAY 2: 19th November 2026 (Thursday) ────────
            {
                "code": "ART-01",
                "title": "RangRush (Rangoli Contest)",
                "category": CompetitionCategory.FINE_ARTS,
                "venue": "School of Law",
                "time_str": "2026-11-19 09:00:00",
                "round": "Finals",
                "rules": "2 Teams Of 3-5 Students Per College. Size 3x3 Feet. On-Spot Theme. All Required Materials And Natural Colors Brought By Teams. Time Limit 30-60 Minutes.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "FAS-01",
                "title": "ReThread (Fashion Upcycling)",
                "category": CompetitionCategory.FASHION,
                "venue": "School of Law",
                "time_str": "2026-11-19 10:00:00",
                "round": "Finals",
                "rules": "5 Solo Entries Per College (At Least 1 Female). Maximum Time 60 Minutes. Upcycle Used/Old Clothing Brought By Participant Into Wearable Couture Garments On The Spot. New Fabric Strictly Prohibited.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "ART-02",
                "title": "ScribbleSquad (Doodling Competition)",
                "category": CompetitionCategory.FINE_ARTS,
                "venue": "School of Law",
                "time_str": "2026-11-19 10:00:00",
                "round": "Finals",
                "rules": "5 Solo Entries Per College (At Least 1 Female). Maximum Time 60 Minutes. Paper Size A3. On-Spot Theme. Black Fine-Liners And Ink Pens Only.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "AI-01",
                "title": "BOT-Brush (AI Poster & Art Generation)",
                "category": CompetitionCategory.DIGITAL_AI,
                "venue": "School of Law",
                "time_str": "2026-11-19 11:00:00",
                "round": "Finals",
                "rules": "5 Solo Entries Per College (At Least 1 Female). Maximum Time 30 Minutes. Create An Original Poster Based On On-Spot Theme Using Preferred AI Tools On Personal Device. Submit JPG/PNG/PDF <= 5MB Via Official QR Code.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "ART-03",
                "title": "Inked Expressions (Face Painting)",
                "category": CompetitionCategory.FINE_ARTS,
                "venue": "School of Law",
                "time_str": "2026-11-19 11:00:00",
                "round": "Finals",
                "rules": "3 Male & 3 Female Entries Per College. Maximum Time 60 Minutes. Model Arrives Clean-Faced. Skin-Friendly Non-Toxic Body Paints Mandatory. Stencils And Pre-Made Designs Strictly Prohibited.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "ART-04",
                "title": "FONT-tastic (Calligraphy Contest)",
                "category": CompetitionCategory.FINE_ARTS,
                "venue": "School of Law",
                "time_str": "2026-11-19 12:00:00",
                "round": "Finals",
                "rules": "5 Solo Entries Per College (At Least 1 Female). Maximum Time 30 Minutes. Write On-Spot Text On A3 Paper. Calligraphy Pens Only. Mixed Styles And Ball Pens Strictly Prohibited.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "FAS-02",
                "title": "MUA Madness (MakeUp Contest)",
                "category": CompetitionCategory.FASHION,
                "venue": "School of Law",
                "time_str": "2026-11-19 12:00:00",
                "round": "Finals",
                "rules": "5 Solo Entries Per College (At Least 1 Male). Maximum Time 60 Minutes. Model Arrives Clean-Faced. Blending, Shading, Contouring, Editorial Glamour, And Hygiene Evaluated.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "FAS-03",
                "title": "Kick-Drip (Shoes Decoration Contest)",
                "category": CompetitionCategory.FASHION,
                "venue": "School of Law",
                "time_str": "2026-11-19 14:00:00",
                "round": "Finals",
                "rules": "5 Solo Entries Per College (At Least 1 Female). Maximum Time 60 Minutes. Decorate 1 Pair Of Shoes Live On The Spot. Acrylics, Street Art Stencils, And Finishes.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "LIT-03",
                "title": "Inkspire (Creative Writing – Hindi & English)",
                "category": CompetitionCategory.LITERARY,
                "venue": "School of Law",
                "time_str": "2026-11-19 14:00:00",
                "round": "Finals",
                "rules": "5 Solo Entries Per Language Per College. 45 Minutes Limit. Word Count 400-600 Words Based On On-Spot Creative Stimulus Prompt. Evaluated On Originality, Structure, Language & Theme.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "LIT-04",
                "title": "Lit Check (Literature Quiz - Prelims)",
                "category": CompetitionCategory.LITERARY,
                "venue": "Rajeshwari Auditorium",
                "time_str": "2026-11-19 15:00:00",
                "round": "Prelims",
                "rules": "1 Team Of 4 Students Per College. 4 Rounds: Questioning, Audio Clues, Visual Clues, And Rapid-Fire. Top Teams Advance To Day 3 Grand Finale. Covers World Literature, Authors, And Movements.",
                "status": CompetitionStatus.COMPLETED,
            },

            # ──────── DAY 3: 20th November 2026 (Friday) ────────
            {
                "code": "THE-01",
                "title": "SoloFlix (Mono Act Monologue)",
                "category": CompetitionCategory.THEATRE,
                "venue": "Rajeshwari Auditorium",
                "time_str": "2026-11-20 09:00:00",
                "round": "Finals",
                "rules": "3 Solo Entries Per College (At Least 1 Female). Maximum Time 3 Minutes. Solo Dramatic Monologue Commanding Stage. Evaluated On Acting Skills, Voice Modulation, Concept Creativity & Theatrical Impact.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "DAN-02",
                "title": "Groove-o-Mania (Dance – Round 2 Battle Round)",
                "category": CompetitionCategory.DANCE,
                "venue": "Rajeshwari Auditorium",
                "time_str": "2026-11-20 11:00:00",
                "round": "Round 2 Battle",
                "rules": "Round 2 Battle Round For Solo And Duet Qualifiers. Matchups & Music Tracks Determined Through Draw/Lottery On The Spot. Energy, Adaptability, Stage Dominance & Freestyle Rebuttal Judged.",
                "status": CompetitionStatus.ONGOING,
            },
            {
                "code": "MUS-02",
                "title": "Harmony Hustle (Singing – Round 2 Semi-Finals)",
                "category": CompetitionCategory.MUSIC,
                "venue": "NIMS School of Law - LT 10 & 11",
                "time_str": "2026-11-20 11:00:00",
                "round": "Round 2 Semi-Finals",
                "rules": "Round 2 Vocal Showcase. Pitch Accuracy (Sur), Rhythm (Taal), Vocal Range, Modulation & Stage Charisma Evaluated By Renowned Music Gurus.",
                "status": CompetitionStatus.ONGOING,
            },
            {
                "code": "LIT-05",
                "title": "Lit Check (Literature Quiz - Grand Finale)",
                "category": CompetitionCategory.LITERARY,
                "venue": "Rajeshwari Auditorium",
                "time_str": "2026-11-20 14:00:00",
                "round": "Grand Finale",
                "rules": "Grand Championship Finale For Top 4 Qualifying College Teams. Rapid-Fire And Audio-Visual Literary Master Rounds.",
                "status": CompetitionStatus.UPCOMING,
            },
            {
                "code": "LIT-06",
                "title": "Clash of Takes (Debate – Hindi & English)",
                "category": CompetitionCategory.LITERARY,
                "venue": "Marik / NIET",
                "time_str": "2026-11-20 14:00:00",
                "round": "Finals",
                "rules": "2 Solo Entries Per Language Per College. 3 Minutes Argument Presentation + 1 Minute Rebuttal. 2 Rounds (Prelims & Finals). Stance (For/Against) Decided Via Chit Draw On Spot. Judged On Content, Logic, Rebuttal & Delivery.",
                "status": CompetitionStatus.UPCOMING,
            },

            # ──────── DAY 4: 21st November 2026 (Saturday) ────────
            {
                "code": "THE-02",
                "title": "Act-O-Graphy (Skit & Drama)",
                "category": CompetitionCategory.THEATRE,
                "venue": "Rajeshwari Auditorium",
                "time_str": "2026-11-21 09:00:00",
                "round": "Finals",
                "rules": "1 Team Of 5-10 Students Per College. Maximum Time 10 Minutes. Audio Track Submitted In Advance. Evaluated On Script, Acting, Dialogue Delivery, Team Coordination & Theatrical Production.",
                "status": CompetitionStatus.UPCOMING,
            },
            {
                "code": "DAN-03",
                "title": "Grand Finale – Groove-o-Mania & Harmony Hustle",
                "category": CompetitionCategory.DANCE,
                "venue": "Rajeshwari Auditorium",
                "time_str": "2026-11-21 11:00:00",
                "round": "Championship Finale",
                "rules": "The Crown Championship Round Featuring Finalists Across Solo, Duet & Group Categories In Dance & Music Before The Grand Festival Directorate Jury.",
                "status": CompetitionStatus.UPCOMING,
            },
            {
                "code": "FAS-04",
                "title": "Couture Clique (Fashion Show – 'The Creative Couture Challenge')",
                "category": CompetitionCategory.FASHION,
                "venue": "University Cricket Ground",
                "time_str": "2026-11-21 17:00:00",
                "round": "Mega Grand Finale",
                "rules": "Grand Mega Finale Staged At University Cricket Ground! 1 Team Of 8-15 Students Per College. Maximum Time 8 Minutes. Overall Theme: 'The Creative Couture Challenge'. Evaluated On Presentation, Walking Posture, Styling, Music, Choreography & Overall Impact.",
                "status": CompetitionStatus.UPCOMING,
            },

            # ──────── SUBMISSION-BASED CONTESTS (Group D) ────────
            {
                "code": "SUB-01",
                "title": "LOL Lab (Meme Making)",
                "category": CompetitionCategory.DIGITAL_AI,
                "venue": "Online / Fest Grounds",
                "time_str": "2026-11-19 10:00:00",
                "round": "Digital Submission",
                "rules": "Group D Submission Contest. 5 Solo Entries Per College (At Least 1 Female). Format: JPG/PNG/PDF <= 5MB. AI-Generation, Plagiarism, And Inappropriate Content Strictly Prohibited.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "SUB-02",
                "title": "Reel-ity Check (Reel Making)",
                "category": CompetitionCategory.DIGITAL_AI,
                "venue": "Online / Fest Grounds",
                "time_str": "2026-11-20 10:00:00",
                "round": "Digital Submission",
                "rules": "Group D Submission Contest. 5 Solo Entries Per College (At Least 1 Female). 30-60 Second Reel. Theme: 'NIMS Through My Eyes'. Format: MP4 <= 200MB. Evaluated On Cinematography, Storytelling & Creative Edit.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "SUB-03",
                "title": "Pixel Tales (Photo Story)",
                "category": CompetitionCategory.DIGITAL_AI,
                "venue": "Online / Fest Grounds",
                "time_str": "2026-11-20 10:00:00",
                "round": "Digital Submission",
                "rules": "Group D Submission Contest. 5 Solo Entries Per College (At Least 1 Female). Submit 6 Photographs Depicting A Coherent Single Narrative Story. Format: JPG/PNG/PDF <= 50MB.",
                "status": CompetitionStatus.COMPLETED,
            },
            {
                "code": "SUB-04",
                "title": "Mini-Mentary (Short Documentary)",
                "category": CompetitionCategory.DIGITAL_AI,
                "venue": "Online / Fest Grounds",
                "time_str": "2026-11-21 10:00:00",
                "round": "Digital Submission",
                "rules": "Group D Submission Contest. 3 Teams Per College (3-5 Students Each). Duration 3-5 Minutes. Format: MP4 <= 1GB. Judged On Documentary Research, Narrative Depth, Sound Design, And Impact.",
                "status": CompetitionStatus.UPCOMING,
            },
        ]

        created_competitions = {}
        for ev in events_data:
            dt = datetime.strptime(ev["time_str"], "%Y-%m-%d %H:%M:%S")
            tz_dt = timezone.make_aware(dt) if timezone.is_naive(dt) else dt
            comp, created = Competition.objects.update_or_create(
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

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(created_competitions)} Official 18-21 Nov Rulebook Competitions"))

        # 5. Seed Realistic Verified Results For Leaderboard Standings
        sample_results = [
            ("DAN-01", "NIET", 1, 95.0, "Exemplary Folk Fusion & Precision"),
            ("DAN-01", "NDCH", 2, 90.5, "High Energy Semi-Classical Duet"),
            ("DAN-01", "NIMC", 3, 86.0, "Strong Group Synchronization"),
            ("MUS-01", "NIMS Medical", 1, 97.0, "Soulful Classical Raag Performance"),
            ("MUS-01", "NIET", 2, 92.5, "Flawless Vocal Range"),
            ("MUS-01", "NLS", 3, 88.0, "Acoustic Melody & Harmonies"),
            ("ART-01", "NDCH", 1, 96.0, "Intricate Rangoli Mandala Art"),
            ("ART-01", "NCP", 2, 90.0, "Vibrant Folk Rangoli Composition"),
            ("ART-01", "NIMC", 3, 84.5, "Eco-Friendly Floral Pattern"),
            ("FAS-01", "NIHM", 1, 94.0, "Outstanding Denim Upcycled Ensemble"),
            ("FAS-01", "NCN", 2, 89.0, "Vintage Saree Reimagined"),
            ("FAS-01", "NLS", 3, 83.5, "Sustainable Streetwear Concept"),
            ("ART-02", "NSCAI", 1, 98.0, "Astonishing Detail In Black Ink Doodle"),
            ("ART-02", "NIET", 2, 92.0, "Expressive Surrealist Narrative"),
            ("ART-02", "NIMC", 3, 87.0, "Comic Strip Storytelling"),
            ("AI-01", "NSCAI", 1, 96.5, "Mastery In Prompt Engineering & Style"),
            ("AI-01", "NIET", 2, 91.0, "Futuristic Cultural Fusion"),
            ("AI-01", "NIMS Medical", 3, 85.5, "Digital Concept Art"),
            ("ART-03", "NCP", 1, 93.0, "Intricate Tribal Mask Design"),
            ("ART-03", "NIMS Medical", 2, 89.0, "Optical Illusion Face Canvas"),
            ("ART-03", "NDCH", 3, 84.0, "Mythological Character Paint"),
            ("THE-01", "NLS", 1, 97.5, "Gripping Monologue On Justice & Human Rights"),
            ("THE-01", "NIMS Medical", 2, 93.0, "Emotional Portrayal Of A Healer"),
            ("THE-01", "NIET", 3, 88.5, "Sharp Satire On Modern Society"),
            ("SUB-01", "NSCAI", 1, 94.0, "Clever Academic Humour & Satire"),
            ("SUB-01", "NIMC", 2, 89.0, "Campus Life Meme Carousel"),
            ("SUB-01", "NDCH", 3, 83.0, "Relatable Student Struggles"),
            ("SUB-02", "NIET", 1, 97.0, "Cinematic Campus Transition Edit"),
            ("SUB-02", "NIMS Medical", 2, 92.0, "Vibrant Student Community Perspective"),
            ("SUB-02", "NLS", 3, 86.5, "Creative Visual Storytelling"),
        ]

        # Reset scores and re-populate
        Score.objects.all().delete()
        score_count = 0
        for code, c_code, rank, raw, remark in sample_results:
            comp = created_competitions.get(code)
            col = created_colleges.get(c_code)
            if comp and col:
                Score.objects.create(
                    competition=comp,
                    college=col,
                    rank=rank,
                    raw_score=raw,
                    remarks=remark,
                    is_verified=True,
                )
                score_count += 1

        self.stdout.write(self.style.SUCCESS(f"Seeded {score_count} Verified Judging Results & Leaderboard Standings"))

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
        self.stdout.write(self.style.SUCCESS("ALL 22 ABHIVYAKTI 18-21 NOV SEED DATA INITIALIZED SUCCESSFULLY!"))
