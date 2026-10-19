from rest_framework import serializers
from .models import Subscription
class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ("id", "email", "active", "subscribed_at")
        read_only_fields = ("id", "active", "subscribed_at")
