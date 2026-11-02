"""WSGI Config For Abhivyakti 2026 Cultural Championship Backend."""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Config.Settings")

application = get_wsgi_application()
