from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

@api_view(['POST'])
def register_user(request):
    data = request.data

    username = data.get('username')
    password = data.get('password')
    phone_number = data.get('phone_number')
    name = data.get('name')

    if not username or not password or not phone_number or not name:
        return Response({'error': 'All fields are required'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)

    if User.objects.filter(phone_number=phone_number).exists():
        return Response({'error': 'Phone number already exists'}, status=400)

    user = User.objects.create_user(
        username=username,
        password=password,
        phone_number=phone_number,
        name=name
    )

    return Response({'message': 'User registered successfully'}, status=201)


@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({'error': 'Invalid credentials'}, status=401)

    refresh = RefreshToken.for_user(user)

    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'is_admin': user.is_staff  # 🔥 IMPORTANT
    })