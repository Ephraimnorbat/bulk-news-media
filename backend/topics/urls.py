from rest_framework.routers import DefaultRouter
from .views import TopicViewSet
router = DefaultRouter()
router.register("", TopicViewSet, basename="topics")
urlpatterns = router.urls
