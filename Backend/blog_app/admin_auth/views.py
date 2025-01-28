from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.serializers import UserSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import permissions
from .serializers import UsersListingSerializer, UserDetailsSerializer

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
    queryset = CustomUser.objects.filter(is_superuser=False).order_by('date_joined')
    serializer_class = UsersListingSerializer

class UserDetail(RetrieveAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminUser]
    queryset = CustomUser.objects.filter(is_superuser=False)
    serializer_class = UserDetailsSerializer

    def get_object(self):
        user_id = self.kwargs.get('id')
        return CustomUser.objects.get(id=user_id)
    
class UserBlock(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        user_id = request.data.get('user_id')
        try:
            user = CustomUser.objects.get(id=user_id)
            user.is_active = False if user.is_active else True
            user.save()
            return Response({'is_active':user.is_active}, status=200)
        except CustomUser.DoesNotExist:
            return Response({'error':'user not found'}, status=404)
        except Exception as e:
            return Response({'message':'Internal server error'}, status=500)
        