from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("stories", "0002_alter_story_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="story",
            name="category",
            field=models.CharField(
                choices=[
                    ("news", "News"),
                    ("opinion", "Opinion"),
                    ("court_case", "Court Case"),
                    ("photo_story", "Photo Story"),
                    ("interview", "Interview"),
                ],
                db_index=True,
                default="news",
                max_length=20,
            ),
        ),
    ]
