from django.urls import path
from . import views

urlpatterns = [
    # Health check
    path('health/', views.health_check, name='health-check'),
    
    # Authentication endpoints
    path('auth/register/', views.register, name='register'),
    path('auth/login/', views.login_user, name='login'),
    path('auth/logout/', views.logout_user, name='logout'),
    path('auth/profile/', views.get_user_profile, name='user-profile'),
    
    # Account endpoints
    path('account/', views.get_user_account, name='user-account'),
    path('account/balance/', views.update_balance, name='update-balance'),
    path('account/deposit/', views.deposit_money, name='deposit-money'),
    path('account/withdraw/', views.withdraw_money, name='withdraw-money'),
    path('account/transactions/', views.get_transaction_history, name='transaction-history'),
]