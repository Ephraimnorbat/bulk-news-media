from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils.text import slugify

class Story(models.Model):
    CATEGORY_CHOICES = [
        ("news", "News"),
        ("opinion", "Opinion"),
        ("court_case", "Court Case"),
        ("photo_story", "Photo Story"),
        ("interview", "Interview"),
    ]
    STATUS_CHOICES = [(v, v.title()) for v in ("developing", "live", "update", "standard")]
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="news", db_index=True)
    title = models.CharField(max_length=240)
    slug = models.SlugField(max_length=260, unique=True, blank=True)
    excerpt = models.TextField(blank=True)
    body = models.TextField(blank=True)
    image = models.FileField(
        upload_to="story_images/",
        blank=True,
        validators=[FileExtensionValidator(["jpg", "jpeg", "png", "webp", "gif"])],
        help_text="Upload a JPG, PNG, WebP, or GIF image.",
    )
    author = models.CharField(max_length=160, default="Newsroom")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="standard")
    kicker = models.CharField(max_length=160, blank=True)
    featured = models.BooleanField(default=False)
    rising = models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ("-published_at",)
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    def __str__(self):
        return self.title


class News(Story):
    class Meta:
        proxy = True
        verbose_name = "News item"
        verbose_name_plural = "News"


class Opinion(Story):
    class Meta:
        proxy = True
        verbose_name = "Opinion"
        verbose_name_plural = "Opinions"


class CourtCase(Story):
    class Meta:
        proxy = True
        verbose_name = "Court case"
        verbose_name_plural = "Court cases"


class PhotoStory(Story):
    class Meta:
        proxy = True
        verbose_name = "Photo story"
        verbose_name_plural = "Photo stories"


class Interview(Story):
    class Meta:
        proxy = True
        verbose_name = "Interview"
        verbose_name_plural = "Interviews"
