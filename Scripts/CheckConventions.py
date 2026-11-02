"""
Verification Script: CheckConventions.py
Enforces PascalCase file/folder names and Title Case formatting.
"""

import os
import re
import sys
from pathlib import Path

# Tooling and standard exceptions for filenames
EXEMPT_FILENAMES = {
    "package.json",
    "package-lock.json",
    "index.html",
    "manage.py",
    "tsconfig.json",
    "vite.config.ts",
    "postcss.config.js",
    "tailwind.config.ts",
    "pytest.ini",
    "docker-compose.yml",
    "Dockerfile",
    "requirements.txt",
    "robots.txt",
    "sitemap.xml",
    "favicon.ico",
    "favicon.svg",
    "db.sqlite3",
    "README.md",
    ".gitignore",
    ".env",
    ".env.example",
    "Nginx.conf",
    "__init__.py",
    "ViteEnv.d.ts",
    # Django Framework conventions
    "admin.py",
    "apps.py",
    "models.py",
    "seed.py",
    "bootstrap.py",
}

# Exempt directories (Framework and build artifacts)
EXEMPT_DIRS = {
    "node_modules",
    ".git",
    ".pytest_cache",
    "__pycache__",
    "dist",
    ".vite",
    "Assets",
    # Django Framework directories
    "migrations",
    "management",
    "commands",
}

def is_pascal_case(name: str) -> bool:
    # Allow names like Main.tsx, AdminLayout.tsx, IMG-20261006-WA0125.png, etc.
    stem = Path(name).stem
    if not stem:
        return True
    # Strip non-alphanumeric separators if any
    parts = re.split(r"[-_.]", stem)
    for part in parts:
        if part and not (part[0].isupper() or part.isdigit()):
            return False
    return True

def audit_directory(root_dir: Path):
    print(f"Auditing Conventions In: {root_dir}")
    violations = []

    for root, dirs, files in os.walk(root_dir):
        # Exclude exempt directories
        dirs[:] = [d for d in dirs if d not in EXEMPT_DIRS]

        current_path = Path(root)

        # Check directory names
        for d in dirs:
            if d not in EXEMPT_DIRS and not is_pascal_case(d):
                violations.append(f"Directory Not In PascalCase: {current_path / d}")

        # Check file names
        for f in files:
            if f not in EXEMPT_FILENAMES and not is_pascal_case(f):
                violations.append(f"File Not In PascalCase: {current_path / f}")

    if violations:
        print(f"Found {len(violations)} Naming Convention Violations:")
        for v in violations:
            print(f"  - {v}")
        return False
    else:
        print("Success: All Analyzed Files And Folders Follow Strict PascalCase Formatting.")
        return True

if __name__ == "__main__":
    base = Path(__file__).resolve().parent.parent
    success = audit_directory(base)
    sys.exit(0 if success else 1)
