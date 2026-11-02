FROM python:3.12-slim

# Prevent Python From Writing Pyc Files And Buffer Output
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install System Dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python Requirements
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy Project Files
COPY . /app/

# Expose Port
EXPOSE 8000

# Run Migrations, Bootstrap Admin & System Settings, Seed Data, Collect Static, And Start Gunicorn
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py bootstrap && python manage.py seed && python manage.py collectstatic --noinput && gunicorn Config.Wsgi:application --bind 0.0.0.0:8000 --workers 3"]

