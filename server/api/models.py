# server/api/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class User(AbstractUser):
    """Custom User model extending Django's AbstractUser"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    
    # Keep username field but auto-generate it
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']
    
    def save(self, *args, **kwargs):
        if not self.username:
            # Auto-generate username from first and last name
            base_username = f"{self.first_name.lower()}{self.last_name.lower()}"
            # Remove spaces and special characters
            import re
            base_username = re.sub(r'[^a-zA-Z0-9]', '', base_username)
            
            # Ensure uniqueness by adding a number if needed
            username = base_username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1
            self.username = username
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.email}"

class Account(models.Model):
    """Bank Account model linked to User"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='account')
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    account_number = models.CharField(max_length=12, unique=True)
    account_type = models.CharField(max_length=50, default='Premium Elite')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.account_number}"
    
    def save(self, *args, **kwargs):
        if not self.account_number:
            # Generate account number (you can customize this logic)
            import random
            self.account_number = f"NB{random.randint(1000000000, 9999999999)}"
        super().save(*args, **kwargs)

