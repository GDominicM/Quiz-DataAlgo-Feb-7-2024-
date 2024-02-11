from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers, status
from rest_framework_simplejwt.tokens import RefreshToken

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer): # edit for custom user model
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

    def get__id(self,obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
   def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerwithToken(self.user).data

        for k,v in serializer.items():
            data[k] = v

        return data 


class UserSerializerwithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User # edit if custom user model
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class= MyTokenObtainPairSerializer
