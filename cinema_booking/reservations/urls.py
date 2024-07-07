from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, ScreeningViewSet, ReservationViewSet, RegisterView, UserView, ChangePasswordView, VerifyEmailView

router = DefaultRouter()
router.register(r'movies', MovieViewSet)
router.register(r'screenings', ScreeningViewSet)
router.register(r'reservations', ReservationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserView.as_view(), name='user-detail'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('verify/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify_email'),
]