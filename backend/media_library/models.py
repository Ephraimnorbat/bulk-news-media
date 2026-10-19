from django.db import models

class MediaAsset(models.Model):
    title = models.CharField(max_length=240)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to="media_assets/")
    media_type = models.CharField(max_length=20, choices=[("photo","Photo"),("audio","Audio"),("document","Document")], default="photo")
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ("-created_at",)
    def __str__(self):
        return self.title if hasattr(self, "title") else str(getattr(self, "name", self.pk))
