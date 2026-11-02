#!/usr/bin/env python
"""Django Command-Line Utility For Administrative Tasks."""
import os
import sys


def main():
    """Run Administrative Tasks In Configured Environment."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Config.Settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Could Not Import Django. Ensure It Is Installed And Accessible On Your Environment."
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
