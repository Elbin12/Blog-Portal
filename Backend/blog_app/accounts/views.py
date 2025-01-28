from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, CreateAPIView, UpdateAPIView, RetrieveAPIView, ListAPIView
from .models import CustomUser, UserProfile, Blog, Comments, Interactions
from .serializers import SignupSerializer, UserSerializer, UserProfileSerializer, BlogSerializer, CommentsSerializer, InteractionSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError
import os
from .utils import upload_fileobj_to_s3
from datetime import datetime

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
    
class ProfileUpdate(UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = CustomUser.objects.all()
    serializer_class = UserProfileSerializer

    def get_object(self):
        user = self.request.user
        profile, created = UserProfile.objects.get_or_create(user=user)
        return profile
    

    def update(self, request, *args, **kwargs):
        user_profile = self.get_object()
        serializer = self.get_serializer(user_profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    
class CreateListBlog(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_queryset(self):
        return Blog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        if 'image' in self.request.FILES:
            file = self.request.FILES['image']
            
            file_extension = os.path.splitext(file.name)[1]
            current_time_str = datetime.now().strftime("%Y%m%d_%H%M%S")
            unique_filename = f"{current_time_str}{file_extension}"
            s3_file_path = f"users/blog/image/{unique_filename}"

            try:
                upload_fileobj_to_s3(file, s3_file_path)
            except Exception as e:
                raise ValidationError({"image": f"Failed to upload image: {str(e)}"})
        serializer.save(user=self.request.user, image=s3_file_path)

class UpdateBlog(UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_object(self):
        blog_id = self.request.data.get('blog_id')
        blog = Blog.objects.get(id=blog_id)
        return blog
    
    def update(self, request, *args, **kwargs):
        blog = self.get_object()
        serializer = self.get_serializer(blog, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

class BlogList(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.AllowAny]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class BlogDetails(RetrieveAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.AllowAny]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_object(self):
        blog_id = self.kwargs.get('id')
        return Blog.objects.get(id=blog_id)
    
class CreateComment(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer

    def perform_create(self, serializer):
        request_data = self.request.data
        if 'blog_id' in request_data:
            blog_id = self.request.data.get('blog_id')
            blog = Blog.objects.get(id=blog_id)
            serializer.save(user=self.request.user, blog=blog)

class UpdateInteractions(UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = Interactions.objects.all()
    serializer_class = InteractionSerializer

    def get_object(self):
        blog_id = self.request.data.get('blog_id')
        blog = Blog.objects.get(id=blog_id)
        interaction, created = Interactions.objects.get_or_create(user=self.request.user, blog=blog)
        return interaction