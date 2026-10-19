from django.db import models
from django.core.validators import FileExtensionValidator

class Video(models.Model):
    title = models.CharField(max_length=240)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    video_url = models.URLField()
    thumbnail = models.FileField(
        upload_to="video_thumbnails/",
        blank=True,
        validators=[FileExtensionValidator(["jpg", "jpeg", "png", "webp", "gif"])],
        help_text="Upload a JPG, PNG, WebP, or GIF thumbnail.",
    )
    published_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ("-published_at",)
    def __str__(self):
        return self.title if hasattr(self, "title") else str(getattr(self, "name", self.pk))
