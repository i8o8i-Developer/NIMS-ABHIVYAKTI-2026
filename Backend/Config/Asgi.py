"""ASGI Config For Abhivyakti 2026 Cultural Championship Backend."""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Config.Settings")

application = get_asgi_application()
