from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("stories", "0003_story_category"),
    ]

    operations = [
        migrations.CreateModel(
            name="News",
            fields=[],
            options={"verbose_name": "News item", "verbose_name_plural": "News", "proxy": True},
            bases=("stories.story",),
        ),
        migrations.CreateModel(
            name="Opinion",
            fields=[],
            options={"verbose_name": "Opinion", "verbose_name_plural": "Opinions", "proxy": True},
            bases=("stories.story",),
        ),
        migrations.CreateModel(
            name="CourtCase",
            fields=[],
            options={"verbose_name": "Court case", "verbose_name_plural": "Court cases", "proxy": True},
            bases=("stories.story",),
        ),
        migrations.CreateModel(
            name="PhotoStory",
            fields=[],
            options={"verbose_name": "Photo story", "verbose_name_plural": "Photo stories", "proxy": True},
            bases=("stories.story",),
        ),
        migrations.CreateModel(
            name="Interview",
            fields=[],
            options={"verbose_name": "Interview", "verbose_name_plural": "Interviews", "proxy": True},
            bases=("stories.story",),
        ),
    ]
