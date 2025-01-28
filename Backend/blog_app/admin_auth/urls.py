from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('signin/', views.SignIn.as_view()),
    path('users/', views.UsersList.as_view()),
    path('user/<int:id>/', views.UserDetail.as_view()),
    path('user/block/', views.UserBlock.as_view()),
]
