from rest_framework import serializers
from .models import Story
class StorySerializer(serializers.ModelSerializer):
    updates = serializers.SerializerMethodField()
    class Meta:
        model = Story
        fields = ("id", "slug", "title", "excerpt", "body", "image", "author", "published_at", "updated_at", "status", "updates", "kicker", "featured", "rising", "views")
    def get_updates(self, obj):
        return 0
