from rest_framework import viewsets, generics, permissions
from django.contrib.auth.models import User
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import Movie, Screening, Reservation
from .serializers import MovieSerializer, ScreeningSerializer, ReservationSerializer, UserSerializer, RegisterSerializer

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class ScreeningViewSet(viewsets.ModelViewSet):
    queryset = Screening.objects.all()
    serializer_class = ScreeningSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def perform_create(self, serializer):
        reservation = serializer.save()
        self.send_confirmation_email(reservation)

    def send_confirmation_email(self, reservation):
        subject = 'Potwierdznie rezerwacji'
        message = f'Dziękujemy za rezerwacje {reservation.seats_reserved} miejsc na film {reservation.screening.movie.title}.'
        recipient_list = [reservation.customer_email]
        send_mail(subject, message, 'from@example.com', recipient_list)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class UserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user