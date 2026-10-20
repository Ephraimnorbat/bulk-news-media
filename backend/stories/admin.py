from django.contrib import admin
from django.utils.html import format_html
from .models import Story
@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "author", "status", "featured", "rising", "published_at", "image_preview")
    list_filter = ("category", "status", "published_at")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "excerpt", "body")
    readonly_fields = ("image_preview",)

    @admin.display(description="Current image")
    def image_preview(self, obj):
        if not obj or not obj.image:
            return "No image uploaded"
        return format_html('<img src="{}" style="max-height: 120px; max-width: 220px; object-fit: contain;" />', obj.image.url)
