# server/api/views.py
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login
from .models import User, Account
from .serializers import (
    UserRegistrationSerializer, 
    UserLoginSerializer, 
    UserSerializer, 
    AccountSerializer
)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """Register a new user"""
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'User registered successfully',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """Login user and return JWT tokens"""
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Login successful',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    """Logout user by blacklisting the refresh token"""
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """Get current user's profile"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_account(request):
    """Get current user's bank account details"""
    try:
        account = request.user.account
        serializer = AccountSerializer(account)
        return Response(serializer.data)
    except Account.DoesNotExist:
        return Response(
            {'error': 'Account not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deposit_money(request):
    """Deposit money to user's account"""
    try:
        account = request.user.account
    except Account.DoesNotExist:
        return Response(
            {'error': 'Account not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    amount = request.data.get('amount')
    if not amount:
        return Response(
            {'error': 'Amount is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        amount = float(amount)
        if amount <= 0:
            return Response(
                {'error': 'Amount must be positive'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except (ValueError, TypeError):
        return Response(
            {'error': 'Invalid amount'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    account.balance += amount
    account.save()
    
    serializer = AccountSerializer(account)
    return Response({
        'message': 'Deposit successful',
        'account': serializer.data
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def withdraw_money(request):
    """Withdraw money from user's account"""
    try:
        account = request.user.account
    except Account.DoesNotExist:
        return Response(
            {'error': 'Account not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    amount = request.data.get('amount')
    if not amount:
        return Response(
            {'error': 'Amount is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        amount = float(amount)
        if amount <= 0:
            return Response(
                {'error': 'Amount must be positive'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except (ValueError, TypeError):
        return Response(
            {'error': 'Invalid amount'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if account.balance < amount:
        return Response(
            {'error': 'Insufficient balance'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    account.balance -= amount
    account.save()
    
    serializer = AccountSerializer(account)
    return Response({
        'message': 'Withdrawal successful',
        'account': serializer.data
    })

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_balance(request):
    """Update account balance directly"""
    try:
        account = request.user.account
    except Account.DoesNotExist:
        return Response(
            {'error': 'Account not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    balance = request.data.get('balance')
    if balance is None:
        return Response(
            {'error': 'Balance is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        balance = float(balance)
        if balance < 0:
            return Response(
                {'error': 'Balance cannot be negative'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except (ValueError, TypeError):
        return Response(
            {'error': 'Invalid balance'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    account.balance = balance
    account.save()
    
    serializer = AccountSerializer(account)
    return Response({
        'message': 'Balance updated successfully',
        'account': serializer.data
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_transaction_history(request):
    """Get user's transaction history (placeholder for future implementation)"""
    # This is a placeholder - you can implement transaction tracking later
    return Response({
        'message': 'Transaction history feature coming soon',
        'transactions': []
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """Simple health check endpoint"""
    return Response({
        'status': 'healthy',
        'message': 'NeoBank API is running'
    })