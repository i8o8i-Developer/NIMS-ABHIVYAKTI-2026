"""Custom DRF Exception Handler Ensuring 100% Title Case Error Responses."""

from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from Apps.Core.Messages import Messages
from Apps.Core.TitleCase import to_title_case


def custom_exception_handler(exc, context):
    """Intercept DRF Exceptions And Return Formatted Title Case JSON Payload."""
    response = exception_handler(exc, context)

    if response is None:
        return Response(
            {
                "detail": Messages.General.SERVER_ERROR,
                "errors": {"server": [str(exc)]},
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    formatted_errors = {}
    detail_message = Messages.General.VALIDATION_ERROR

    if response.status_code == status.HTTP_401_UNAUTHORIZED:
        detail_message = Messages.General.UNAUTHENTICATED
    elif response.status_code == status.HTTP_403_FORBIDDEN:
        detail_message = Messages.General.PERMISSION_DENIED
    elif response.status_code == status.HTTP_404_NOT_FOUND:
        detail_message = Messages.General.NOT_FOUND

    if isinstance(response.data, dict):
        for field, errors in response.data.items():
            if field == "detail":
                detail_message = to_title_case(str(errors))
            elif isinstance(errors, list):
                formatted_errors[field] = [to_title_case(str(e)) for e in errors]
            else:
                formatted_errors[field] = [to_title_case(str(errors))]
    elif isinstance(response.data, list):
        formatted_errors["non_field_errors"] = [to_title_case(str(e)) for e in response.data]

    response.data = {
        "detail": detail_message,
        "errors": formatted_errors,
    }

    return response

