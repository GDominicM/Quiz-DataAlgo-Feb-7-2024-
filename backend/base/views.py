from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404

from .models import *
# from . import products
# from base.products import products

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers, status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializer import ProductSerializer, UserSerializer, UserSerializerwithToken, MyTokenObtainPairView


@api_view(['GET'])
def getRoutes(request):
    routes = [
    '/api/products/',
    '/api/products/create/',
    '/api/products/upload/',
    '/api/products/<id>/reviews/',
    '/api/products/top/',
    '/api/products/<id>/',
    '/api/products/delete/<id>/',
    '/api/products/<update>/<id>/',
    ]
    return Response(routes) # JsonResponse - > returns data as json

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product= get_object_or_404(Product, pk=pk) # finds product using pk
    serializer = ProductSerializer(product) # uses serializer to serialize prod data
    return Response(serializer.data)

@api_view(['GET'])
def getUserProfile(request): # user should be logged in
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser]) # only admins can access the view
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    try:
        data = request.data

        user = User.objects.create(        
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password']), 
        )
        serializer = UserSerializerwithToken(user, many=False)
        return Response(serializer.data)
    except: 
     message = {'detail': 'This email is already registered to a user'}
     return Response(message, status=status.HTTP_400_BAD_REQUEST)