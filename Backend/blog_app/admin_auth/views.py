from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.serializers import UserSerializer
from rest_framework.generics import ListAPIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import permissions
from .serializers import UsersListingSerializer

# Create your views here.


class SignIn(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = CustomUser.objects.get(email=email)
            if not user.is_superuser:
                return Response({'message':'You donot have permission to access this page.'}, status=400)
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
                'adminDetails' : data
            }
            return Response({'admin_data':content}, status=200)
        except CustomUser.DoesNotExist:
            return Response({'message', 'User not found.'}, status=404)
        

class UsersList(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminUser]
    queryset = CustomUser.objects.filter(is_superuser=False)
    serializer_class = UsersListingSerializer