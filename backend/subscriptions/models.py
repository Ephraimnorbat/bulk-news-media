from django.db import models
class Subscription(models.Model):
    email = models.EmailField(unique=True)
    active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    unsubscribed_at = models.DateTimeField(null=True, blank=True)
    def __str__(self):
        return self.email
