from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import Accounts
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AccountSerializer, CreateAccountSerializer, BalanceSerializer
# Create your views here.
@api_view(['GET', 'POST'])
def account_list_create(request):
  #GET / accounts/ - List all accounts
  #POST /accounts/ - Create new account
  
  if request.method == 'GET':
    accounts = Accounts.objects.all()
    serializer = AccountSerializer(accounts, many=True)
    return Response(serializer.data)
  
  elif request.method == 'POST':
    serializer = CreateAccountSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'DELETE', 'PUT', 'PATCH'])
def account_detail(request, account_id):
    #GET /accounts/{id}/ - Get account details
    #PUT /accounts/{id}/ - Update account (full)
    #PATCH /accounts/{id}/ - Update account (partial)
    #DELETE /accounts/{id}/ - Delete account
  account = get_object_or_404(Accounts, id=account_id)
  if request.method == 'GET':
    serializer = AccountSerializer(account)
    return Response(serializer.data)
  elif request.method == ['PUT', 'PATCH']:
    partial = request.method == 'PATCH'
    serializer = AccountSerializer(account, data=request.data, partial=partial)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == ['DELETE']:
      account.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['PATCH'])
def update_balance(request, account_id):
    account = get_object_or_404(Accounts, id=account_id)
    serializer = BalanceSerializer(account, data=request.data, partial=True )
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['POST'])
def deposit_money(request, account_id):
  #POST /accounts/{id}/deposit/ - Deposit money to account
  #Body: {"amount": "100.00"}
  
  account = get_object_or_404(Accounts, id=account_id)
  
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
def withdraw_money(request, account_id):
  account = get_object_or_404(Accounts, account_id)
  
  amount = request.data.get('amount')
  if not amount:
    return Response(
      {'error':'Amount is required'},
      status=status.HTTP_400_BAD_REQUEST
    )
  try:
    amount = float(amount)
    if amount <= 0:
      return Response(
        {'error':'Amount must be Postive'},
        status=status.HTTP_400_BAD_REQUEST
      )
  except(ValueError, TypeError):
    return Response(
      {'error':'Invalid Amount'},
      status=status.HTTP_400_BAD_REQUEST
    )
  if(account.balance < amount):
    return Response(
      {'error':'Amount is insufficient'}
    )
  account.balance -= amount
  account.save()
  
  serializer = AccountSerializer(account)
  return Response(
    {'message':'Deposit Successful',
     'account': serializer.data
     })