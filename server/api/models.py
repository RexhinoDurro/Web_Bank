# server/api/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
import uuid
import re


class CustomUserManager(UserManager):
    """Custom UserManager that handles auto-generated usernames"""
    
    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        """Create and save a regular user with auto-generated username"""
        if not email:
            raise ValueError('Email is required')
        if not first_name:
            raise ValueError('First name is required')
        if not last_name:
            raise ValueError('Last name is required')
            
        email = self.normalize_email(email)
        
        # Auto-generate username from first and last name
        username = self._generate_username(first_name, last_name)
        
        # Create user without calling parent create_user to avoid username requirement
        user = self.model(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        """Create and save a superuser with auto-generated username"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
            
        return self.create_user(email, first_name, last_name, password, **extra_fields)
    
    def _generate_username(self, first_name, last_name):
        """Generate a unique username from first and last name"""
        # Create base username from first and last name
        base_username = f"{first_name.lower()}{last_name.lower()}"
        # Remove spaces and special characters
        base_username = re.sub(r'[^a-zA-Z0-9]', '', base_username)
        
        # Ensure uniqueness by adding a number if needed
        username = base_username
        counter = 1
        while self.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1
        return username


class User(AbstractUser):
    """Custom User model extending Django's AbstractUser"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    
    # Keep username field but auto-generate it
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']
    
    # Use our custom manager
    objects = CustomUserManager()
    
    def save(self, *args, **kwargs):
        if not self.username:
            # Auto-generate username from first and last name
            base_username = f"{self.first_name.lower()}{self.last_name.lower()}"
            # Remove spaces and special characters
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