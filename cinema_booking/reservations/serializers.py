from rest_framework import serializers
from .models import Movie, Screening, Reservation
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class ScreeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = Screening
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

    def validate(self, attrs):
        screening = attrs['screening']
        seat_reserved = attrs['seats_reserved']
        if seat_reserved > screening.available_seats:
            raise serializers.ValidationError("Not enough available seats.")
        return attrs
    
    def create(self, validated_data):
        screening = validated_data['screening']
        seats_reserved = validated_data['seats_reserved']
        if screening.reserve_seats(seats_reserved):
            return super().create(validated_data)
        else:
            raise serializers.ValidationError("Could not reserve seats.")

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        
        user.set_password(validated_data['password'])
        user.save()

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=50, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=50, style={'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']
    
    def validate(self, data):
        password = data.get('password')
        password2 = data.get('password2')
        user = self.context.get('user')

        if password != password2:
            raise serializers.ValidationError("Password and Confirm password does not match")
        
        user.set_password(password)
        user.save()
        return data