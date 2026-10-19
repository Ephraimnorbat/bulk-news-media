from django.db import models

class Tip(models.Model):
    name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed = models.BooleanField(default=False)
    class Meta:
        ordering = ("-created_at",)
    def __str__(self):
        return self.title if hasattr(self, "title") else str(getattr(self, "name", self.pk))
