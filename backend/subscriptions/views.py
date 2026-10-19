from django.utils import timezone
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Subscription
from .serializers import SubscriptionSerializer
class SubscribeView(generics.CreateAPIView):
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.AllowAny]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        subscription, created = Subscription.objects.get_or_create(email=email)
        if not subscription.active:
            subscription.active = True
            subscription.unsubscribed_at = None
            subscription.save(update_fields=["active", "unsubscribed_at"])
        return Response({"email": subscription.email, "active": subscription.active, "subscribed": True}, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
class UnsubscribeView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        email = request.data.get("email", "")
        updated = Subscription.objects.filter(email__iexact=email, active=True).update(active=False, unsubscribed_at=timezone.now())
        return Response({"unsubscribed": bool(updated)})
