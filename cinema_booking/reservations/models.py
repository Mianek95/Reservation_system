from django.contrib.auth.models import AbstractUser
from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.IntegerField(help_text="Duration in minutes")
    release_date = models.DateField()

    def __str__(self):
        return self.title

class Screening(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    screening_time = models.DateTimeField()
    available_seats = models.IntegerField()

    def __str__(self):
        return f"{self.movie.title} at {self.screening_time}"
    
    def reserve_seats(self, number_of_seats):
        if self.available_seats >= number_of_seats:
            self.available_seats -= number_of_seats
            self.save()
            return True
        return False
    
class Reservation(models.Model):
    screening = models.ForeignKey(Screening, on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=100)
    customer_email = models.EmailField()
    seats_reserved = models.IntegerField()

    def __str__(self):
        return f"Reservation for {self.customer_name} - {self.screening.movie.title}"
    
class CustomerUser(AbstractUser):
    is_verified = models.BooleanField(default=False)