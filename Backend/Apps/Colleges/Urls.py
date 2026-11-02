"""College URL Configuration."""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Apps.Colleges.Views import CollegeViewSet

router = DefaultRouter()
router.register(r"", CollegeViewSet, basename="colleges")

urlpatterns = [
    path("", include(router.urls)),
]

