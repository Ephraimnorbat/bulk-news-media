from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, SAFE_METHODS, BasePermission
from .models import MediaAsset
from .serializers import MediaAssetSerializer
class PublicReadAdminWrite(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or (request.user and request.user.is_staff)
class MediaAssetViewSet(viewsets.ModelViewSet):
    queryset = MediaAsset.objects.all()
    serializer_class = MediaAssetSerializer
    permission_classes = [PublicReadAdminWrite]
