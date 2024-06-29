from rest_framework import serializers
from .models import Movie, Screening, Reservation

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