"""Authentication And Staff Operations API Views."""

from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from django.contrib.auth import authenticate

from Apps.Accounts.models import User
from Apps.Accounts.Serializers import UserSerializer, UserCreateSerializer, LoginSerializer
from Apps.Accounts.Permissions import IsSuperAdmin
from Apps.Core.models import AuditLog
from Apps.Core.Messages import Messages


class LoginView(APIView):
    """Authenticate Staff Member And Issue JWT Tokens."""

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"].lower().strip()
        password = serializer.validated_data["password"]

        user = authenticate(request, email=email, password=password)

        if not user:
            return Response(
                {"detail": Messages.Auth.INVALID_CREDENTIALS},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.is_active:
            return Response(
                {"detail": Messages.Auth.ACCOUNT_DISABLED},
                status=status.HTTP_403_FORBIDDEN,
            )

        refresh = RefreshToken.for_user(user)

        AuditLog.objects.create(
            actor=user,
            action="Staff Member Logged In",
            target_type="User",
            target_id=str(user.id),
            metadata={"email": user.email, "role": user.role},
        )

        response = Response(
            {
                "detail": Messages.Auth.LOGIN_SUCCESS,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )

        response.set_cookie(
            key="abhivyakti_staff_refresh",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=7 * 24 * 3600,
        )

        return response


class LogoutView(APIView):
    """Blacklist Refresh Token And Terminate Staff Session."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh") or request.COOKIES.get("abhivyakti_staff_refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
        except Exception:
            pass

        response = Response(
            {"detail": Messages.Auth.LOGOUT_SUCCESS},
            status=status.HTTP_200_OK,
        )
        response.delete_cookie("abhivyakti_staff_refresh")
        return response


class CookieTokenRefreshView(TokenRefreshView):
    """Handle Refresh Token In Both Body Payload And HttpOnly Cookie."""

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        if "refresh" not in data or not data["refresh"]:
            cookie_refresh = request.COOKIES.get("abhivyakti_staff_refresh")
            if cookie_refresh:
                data["refresh"] = cookie_refresh

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class MeView(APIView):
    """Return Details Of Currently Authenticated Staff Member."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    """Staff Management CRUD Operations For Super Administrators."""

    permission_classes = [IsSuperAdmin]
    queryset = User.objects.all().order_by("-created_at")

    def get_serializer_class(self):
        if self.action == "create":
            return UserCreateSerializer
        return UserSerializer

