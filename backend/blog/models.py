from django.db import models
from django.core.validators import FileExtensionValidator

class BlogPost(models.Model):
    title = models.CharField(max_length=240)
    slug = models.SlugField(unique=True)
    excerpt = models.TextField(blank=True)
    body = models.TextField()
    image = models.FileField(
        upload_to="blog_images/",
        blank=True,
        validators=[FileExtensionValidator(["jpg", "jpeg", "png", "webp", "gif"])],
        help_text="Upload a JPG, PNG, WebP, or GIF image.",
    )
    author = models.CharField(max_length=160, default="Newsroom")
    published_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ("-published_at",)
    def __str__(self):
        return self.title if hasattr(self, "title") else str(getattr(self, "name", self.pk))
