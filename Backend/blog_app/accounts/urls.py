from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.SignupView.as_view()),
    path('signin/', views.SigninView.as_view()),
    path('home/', views.HomeView.as_view()),
    path('profile/update/', views.ProfileUpdate.as_view()),
    path('blog/create-list/', views.CreateListBlog.as_view()),
]
