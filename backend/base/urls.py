from . import views
from . import serializer
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('products/', views.getProducts, name='products'),
    path('products/<str:pk>/', views.getProduct, name='product'),

    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('users/logout', views.logoutUser, name="logout"),
    path('users/profile', views.getUserProfile, name='user_profile'),
    path('users/register', views.registerUser, name="register"),
    path('users', views.getUsers, name='users'),
]
