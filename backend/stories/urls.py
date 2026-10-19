from rest_framework.routers import DefaultRouter
from .views import StoryViewSet
router = DefaultRouter()
router.register("", StoryViewSet, basename="story")
urlpatterns = router.urls
