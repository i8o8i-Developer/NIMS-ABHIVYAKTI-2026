"""Serializers For Authentication And Staff User Management."""

from rest_framework import serializers
from Apps.Accounts.models import User
from Apps.Core.TitleCase import to_title_case


class UserSerializer(serializers.ModelSerializer):
    """Staff User Representation."""

    class Meta:
        model = User
        fields = ["id", "email", "full_name", "role", "is_active", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_full_name(self, value):
        return to_title_case(str(value or "").strip())


class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer For Creating Staff Members With Assigned Passwords."""

    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["id", "email", "full_name", "role", "is_active", "password"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create_user(password=password, **validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    """Staff Login Request Credentials."""

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
