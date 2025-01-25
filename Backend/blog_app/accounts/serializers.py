from rest_framework.serializers import ModelSerializer, ValidationError
from .models import CustomUser, UserProfile


class SignupSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'password']
    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email = validated_data['email'],
            password = validated_data['password']
        )
        return user
    
class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ['id', 'user']

class UserSerializer(ModelSerializer):
    user_profile = UserProfileSerializer()
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'is_active', 'date_joined', 'user_profile', 'is_superuser']