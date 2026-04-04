from django.urls import path
from .views import create_order, my_orders, admin_dashboard, latest_orders

urlpatterns = [
    path('create/', create_order),
    path('my/', my_orders),
    path('dashboard/', admin_dashboard),
    path('latest/', latest_orders),
]