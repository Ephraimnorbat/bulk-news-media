from rest_framework import viewsets
from rest_framework.permissions import SAFE_METHODS, BasePermission
from .models import Tip
from .serializers import TipSerializer
class PublicSubmitStaffManage(BasePermission):
    def has_permission(self, request, view):
        return request.method == "POST" or (request.method in SAFE_METHODS and request.user and request.user.is_staff) or (request.user and request.user.is_staff)
class TipViewSet(viewsets.ModelViewSet):
    queryset = Tip.objects.all()
    serializer_class = TipSerializer
    permission_classes = [PublicSubmitStaffManage]
