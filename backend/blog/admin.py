from django.contrib import admin
from django.utils.html import format_html
from .models import BlogPost

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "published_at", "image_preview")
    list_filter = ("published_at",)
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "excerpt", "body", "author")
    readonly_fields = ("image_preview",)

    @admin.display(description="Current image")
    def image_preview(self, obj):
        if not obj or not obj.image:
            return "No image uploaded"
        return format_html('<img src="{}" style="max-height: 120px; max-width: 220px; object-fit: contain;" />', obj.image.url)
