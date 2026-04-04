from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order
from products.models import Product

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    product_id = request.data.get('product_id')

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

    order = Order.objects.create(user=user, product=product)

    return Response({'message': 'Order created successfully'})



from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    user = request.user
    orders = Order.objects.filter(user=user)

    data = []
    for order in orders:
        data.append({
            "id": order.id,
            "product": order.product.title,
            "price": order.product.price,
            "created_at": order.created_at
        })

    return Response(data)


from django.contrib.auth import get_user_model
from django.db.models import Count

User = get_user_model()

@api_view(['GET'])
def admin_dashboard(request):
    total_users = User.objects.count()
    total_orders = Order.objects.count()

    # Orders per product
    product_data = (
        Order.objects.values('product__title')
        .annotate(count=Count('id'))
    )

    return Response({
        "total_users": total_users,
        "total_orders": total_orders,
        "product_data": product_data
    })
    
    
@api_view(['GET'])
def latest_orders(request):
    orders = Order.objects.select_related('user', 'product').order_by('-created_at')[:5]

    data = []
    for order in orders:
        data.append({
            "user": order.user.username,
            "product": order.product.title,
            "time": order.created_at
        })

    return Response(data)    