"""Single Source Of Truth Message Catalog For Abhivyakti 2026 Cultural Fest."""


class Messages:
    """Grouped Title Case Message Constants For Entire System."""

    class General:
        SUCCESS = "Operation Completed Successfully"
        VALIDATION_ERROR = "Please Correct The Highlighted Form Errors"
        NOT_FOUND = "Requested Record Could Not Be Located"
        PERMISSION_DENIED = "You Do Not Have Authorization To Perform This Action"
        UNAUTHENTICATED = "Authentication Credentials Were Not Provided Or Have Expired"
        SERVER_ERROR = "An Internal Server Error Occurred. Please Try Again Later"

    class Auth:
        LOGIN_SUCCESS = "Welcome To NIMS Abhivyakti 2026 Command Center"
        INVALID_CREDENTIALS = "Invalid Email Address Or Password Provided"
        ACCOUNT_DISABLED = "This Staff Account Has Been Deactivated By Administration"
        TOKEN_REFRESH_SUCCESS = "Session Successfully Extended"
        LOGOUT_SUCCESS = "Staff Session Successfully Closed"

    class Competitions:
        CREATED = "Cultural Competition Successfully Created"
        UPDATED = "Competition Schedule And Rules Successfully Updated"
        DELETED = "Competition Record Removed Successfully"
        STATUS_CHANGED = "Competition Status Updated"

    class Scores:
        RECORDED = "Judges Score Successfully Recorded And Verified"
        UPDATED = "Score Allotment Updated Successfully"
        VERIFIED = "Official Results Verified For Leaderboard Broadcast"
        DISQUALIFIED = "Participant Entry Flagged As Disqualified"

    class Colleges:
        CREATED = "Participating College Added Successfully"
        UPDATED = "College Particulars Updated Successfully"
        DELETED = "College Entry Removed"

    class Gallery:
        UPLOAD_SUCCESS = "Fest Photo Successfully Added To Gallery"
        UPDATED = "Photo Caption And Tags Updated"
        DELETED = "Gallery Item Removed"
