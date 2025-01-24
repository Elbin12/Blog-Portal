from rest_framework.serializers import ModelSerializer
from accounts.models import CustomUser, UserProfile

class UsersProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class UsersListingSerializer(ModelSerializer):
    user_profile = UsersProfileSerializer(many=True)
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'is_active', 'date_joined', 'user_profile']