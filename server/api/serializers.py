from .models import Accounts
from rest_framework import serializers


class AccountSerializer(serializers.ModelSerializer):
  class Meta:
    model = Accounts
    fields = ['id', 'firstname', 'lastname', 'balance', 'email', 'created_at']
    read_only_fields = ['id', 'created_at']
    
class CreateAccountSerializer(serializers.ModelSerializer):
  class Meta:
    model = Accounts
    fields = ['firstname', 'lastname', 'balance', 'email']
    
  def validate_email(self, value):
    #ensure email is unique
    if Accounts.objects.filter(email=value).exists():
        raise serializers.ValidationError("An account with this email exists")
    return value
  
  def validate_balance(self, value):
    if value < 0:
        raise serializers.ValidationError("Balance cannot be negative")
    return value
  
class BalanceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Accounts
    fields = ['id', 'balance']
    read_only_fields = ['id']