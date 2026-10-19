from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, SAFE_METHODS, BasePermission
from .models import Video
from .serializers import VideoSerializer
class PublicReadAdminWrite(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or (request.user and request.user.is_staff)
class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [PublicReadAdminWrite]
