"""Pytest Suite Validating Abhivyakti 2026 API Endpoints And Security Rules."""

import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from Apps.Accounts.models import User
from Apps.Colleges.models import College
from Apps.Competitions.models import Competition, CompetitionCategory
from Apps.Scores.models import Score


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def seeded_data(db):
    admin_user = User.objects.create_superuser(
        email="superadmin@abhivyakti.nsiif.org",
        password="SuperAdminPassword123!",
        full_name="Abhivyakti Administrator",
    )
    judge_user = User.objects.create_user(
        email="judge@abhivyakti.nsiif.org",
        password="JudgePassword123!",
        full_name="Jury Judge Official",
        role="judge",
        is_staff=True,
    )
    col1 = College.objects.create(name="NIMS Institute Of Engineering & Technology", code="NIET", city="Jaipur")
    col2 = College.objects.create(name="National Institute Of Medical Sciences", code="NIMS Medical", city="Jaipur")
    comp = Competition.objects.create(
        title="Dance - Solo, Duet & Group (Round 1)",
        code="DAN-01",
        category=CompetitionCategory.DANCE,
        venue="Rajeshwari Auditorium",
    )
    Score.objects.create(competition=comp, college=col1, rank=1, raw_score=95.0, points_awarded=100.0, is_verified=True)
    Score.objects.create(competition=comp, college=col2, rank=2, raw_score=88.0, points_awarded=70.0, is_verified=True)

    return {
        "admin": admin_user,
        "judge": judge_user,
        "col1": col1,
        "col2": col2,
        "comp": comp,
    }


@pytest.mark.django_db
def test_public_stats_endpoint(api_client, seeded_data):
    """Verify Public Stats Returns Aggregate Metric Counters."""
    url = reverse("fest-stats")
    response = api_client.get(url)
    assert response.status_code == 200
    assert "colleges_count" in response.data
    assert "cultural_arenas" in response.data
    assert response.data["cultural_arenas"] == 6


@pytest.mark.django_db
def test_leaderboard_standings(api_client, seeded_data):
    """Verify Leaderboard Standing Correctly Ranks NIET Over NIMS Medical."""
    url = reverse("leaderboard")
    response = api_client.get(url)
    assert response.status_code == 200
    data = response.data
    assert len(data["podium"]) == 2
    assert data["podium"][0]["college_code"] == "NIET"
    assert data["podium"][0]["total_points"] == 100.0
    assert data["podium"][1]["college_code"] == "NIMS Medical"
    assert data["podium"][1]["total_points"] == 70.0


@pytest.mark.django_db
def test_live_feed_endpoint(api_client, seeded_data):
    """Verify Stadium 16:9 Live Feed Structure."""
    url = reverse("live-feed")
    response = api_client.get(url)
    assert response.status_code == 200
    assert "top_colleges" in response.data
    assert "recent_results" in response.data
    assert len(response.data["recent_results"]) == 2


@pytest.mark.django_db
def test_admin_auth_and_jury_score_input(api_client, seeded_data):
    """Verify Judge Authentication And Score Allotment."""
    login_url = reverse("auth-login")
    login_resp = api_client.post(
        login_url,
        {"email": "judge@abhivyakti.nsiif.org", "password": "JudgePassword123!"},
        format="json",
    )
    assert login_resp.status_code == 200
    assert "access" in login_resp.data

    token = login_resp.data["access"]
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    scores_url = reverse("scores-list")
    score_payload = {
        "competition": seeded_data["comp"].id,
        "college": seeded_data["col1"].id,
        "rank": 3,
        "raw_score": 82.5,
        "remarks": "Great Choreography Execution",
        "is_verified": True,
    }
    score_resp = api_client.post(scores_url, score_payload, format="json")
    assert score_resp.status_code == 201
    assert float(score_resp.data["points_awarded"]) == 40.0
