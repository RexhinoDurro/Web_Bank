from django.urls import path
from . import views

urlpatterns = [
    
    path('accounts/', views.account_list_create, name='account-list-create'),
    path('accounts/<uuid:account_id>/', views.account_detail, name='account-detail'),
    
    
    path('accounts/<uuid:account_id>/balance/', views.update_balance, name='update-balance'),
    path('accounts/<uuid:account_id>/deposit/', views.deposit_money, name='deposit-money'),
    path('accounts/<uuid:account_id>/withdraw/', views.withdraw_money, name='withdraw-money'),
]