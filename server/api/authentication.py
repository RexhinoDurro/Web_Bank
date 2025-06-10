# server/api/authentication.py
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

User = get_user_model()

class EmailBackend(ModelBackend):
    """
    Custom authentication backend that allows users to log in using their email
    instead of username, while keeping username as the USERNAME_FIELD
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        # Get email from kwargs if username is None
        if username is None:
            username = kwargs.get('email')
        
        # Both username (email) and password are required
        if username is None or password is None:
            return None
            
        try:
            # Try to find user by email
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760)
            User().set_password(password)
            return None
        
        # Check if password is correct and user can authenticate
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None