"""Root URL Configuration For NIMS Abhivyakti 2026 Cultural Championship."""

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.views.static import serve
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from Apps.Core.models import EventSetting
from Apps.Accounts.Permissions import IsSuperAdmin


def health_check(request):
    return JsonResponse({
        "status": "Healthy",
        "service": "NIMS Abhivyakti 2026 API",
        "tagline": "Celebrating Cultural Majesty & Excellence",
    })


class FestivalSettingsView(APIView):
    """Retrieve Or Update Event Settings And Live Control Flags."""

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsSuperAdmin()]

    def get(self, request):
        s = EventSetting.get_settings()
        return Response({
            "event_name": s.event_name,
            "tagline": s.tagline,
            "edition": s.edition,
            "start_date": s.start_date,
            "end_date": s.end_date,
            "date_range_display": s.date_range_display,
            "venue": s.venue,
            "marquee_announcements": s.marquee_announcements,
            "feature_flags": s.feature_flags,
        })

    def patch(self, request):
        s = EventSetting.get_settings()
        for field in ["event_name", "tagline", "edition", "start_date", "end_date", "date_range_display", "venue", "marquee_announcements", "feature_flags"]:
            if field in request.data:
                setattr(s, field, request.data[field])
        s.save()
        return Response({
            "status": "Success",
            "message": "Festival Settings Successfully Updated",
            "settings": {
                "event_name": s.event_name,
                "tagline": s.tagline,
                "date_range_display": s.date_range_display,
                "venue": s.venue,
                "marquee_announcements": s.marquee_announcements,
                "feature_flags": s.feature_flags,
            },
        })


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", health_check, name="health-check"),
    path("api/auth/", include("Apps.Accounts.Urls")),
    path("api/colleges/", include("Apps.Colleges.Urls")),
    path("api/competitions/", include("Apps.Competitions.Urls")),
    path("api/scores/", include("Apps.Scores.Urls")),
    path("api/participants/", include("Apps.Participants.Urls")),
    path("api/gallery/", include("Apps.Gallery.Urls")),
    path("api/settings/", FestivalSettingsView.as_view(), name="festival-settings"),
]

urlpatterns += [
    re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
