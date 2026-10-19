from django.contrib import admin
from .models import Subscription
@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ("email", "active", "subscribed_at", "unsubscribed_at")
    list_filter = ("active",)
    search_fields = ("email",)
