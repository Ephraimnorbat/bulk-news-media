from django.db.models import Q
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Story
from .serializers import StorySerializer

class StoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    lookup_field = "slug"
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "excerpt", "body", "author"]
    @action(detail=False, methods=["get"])
    def featured(self, request):
        return Response(self.get_serializer(self.get_queryset().filter(featured=True)[:1], many=True).data)
    @action(detail=False, methods=["get"])
    def desk(self, request):
        return Response(self.get_serializer(self.get_queryset().filter(status__in=["live", "developing", "update"]), many=True).data)
    @action(detail=False, methods=["get"])
    def rising(self, request):
        return Response(self.get_serializer(self.get_queryset().filter(rising=True), many=True).data)
    @action(detail=False, methods=["get"], url_path="most-read")
    def most_read(self, request):
        items = self.get_queryset().order_by("-views", "-published_at")
        return Response(self.get_serializer(items[:20], many=True).data)
    @action(detail=False, methods=["get"])
    def search(self, request):
        query = request.query_params.get("q", "")
        items = self.get_queryset().filter(Q(title__icontains=query) | Q(excerpt__icontains=query) | Q(body__icontains=query) | Q(author__icontains=query)) if query else self.get_queryset().none()
        return Response(self.get_serializer(items, many=True).data)
