from rest_framework import serializers
from .models import MediaAsset
class MediaAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaAsset
        fields = ("id", "title", "description", "file", "media_type", "created_at")
