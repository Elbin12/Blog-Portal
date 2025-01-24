from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, CreateAPIView
from .models import CustomUser
from .serializers import SignupSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.

class CheckCredentials(APIView):
    def post(self, request):
        email = request.data.get('email')
        if CustomUser.objects.filter(email=email).exists():
            return Response({'message':'Email already exists.'}, status=400)

class SignupView(CreateAPIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = SignupSerializer


class SigninView(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = CustomUser.objects.get(email=email)
            print(user, 'user')
            if not user.check_password(password):
                return Response({'message': 'Invalid password'}, status=400)
            
            refresh = RefreshToken()
            refresh['user_id'] = str(user.id)
            refresh["email"] = str(user.email)
            serializer = UserSerializer(user)
            data = serializer.data
            content = {
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
                'userDetails' : data
            }
            return Response({'user_data':content}, status=200)
        except CustomUser.DoesNotExist:
            return Response({'message':'User not found'}, status=404)

class HomeView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        return Response({'status':'success'},status=200)
