from django.contrib import admin
from django.utils.html import format_html
from .models import CourtCase, Interview, News, Opinion, PhotoStory, Story
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


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "status", "published_at", "image_preview")
    list_filter = ("status", "published_at")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "excerpt", "body", "author")
    readonly_fields = ("image_preview",)
    exclude = ("category",)
    category_value = "news"

    def get_queryset(self, request):
        return super().get_queryset(request).filter(category=self.category_value)

    def save_model(self, request, obj, form, change):
        obj.category = self.category_value
        super().save_model(request, obj, form, change)

    @admin.display(description="Current image")
    def image_preview(self, obj):
        if not obj or not obj.image:
            return "No image uploaded"
        return format_html('<img src="{}" style="max-height: 120px; max-width: 220px; object-fit: contain;" />', obj.image.url)


@admin.register(News)
class NewsAdmin(CategoryAdmin):
    category_value = "news"


@admin.register(Opinion)
class OpinionAdmin(CategoryAdmin):
    category_value = "opinion"


@admin.register(CourtCase)
class CourtCaseAdmin(CategoryAdmin):
    category_value = "court_case"


@admin.register(PhotoStory)
class PhotoStoryAdmin(CategoryAdmin):
    category_value = "photo_story"


@admin.register(Interview)
class InterviewAdmin(CategoryAdmin):
    category_value = "interview"
