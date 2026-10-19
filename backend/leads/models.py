from django.db import models
class Lead(models.Model):
    STATUS_CHOICES = [
        ("new", "New"),
        ("reviewing", "Reviewing"),
        ("responded", "Responded"),
        ("closed", "Closed"),
    ]
    name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    tip = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    response = models.TextField(blank=True, help_text="Draft the response, then use the admin action to email it to the lead.")
    responded_at = models.DateTimeField(null=True, blank=True)
    class Meta:
        ordering = ("-created_at",)
    def __str__(self):
        return f"{self.name}: {self.tip[:50]}"
