from datetime import timedelta
from django.core.mail import send_mass_mail
from django.core.management.base import BaseCommand
from django.utils import timezone
from stories.models import Story
from subscriptions.models import Subscription

class Command(BaseCommand):
    help = "Email active subscribers a digest of stories published in the last day."
    def handle(self, *args, **options):
        cutoff = timezone.now() - timedelta(days=1)
        stories = Story.objects.filter(published_at__gte=cutoff).order_by("-published_at")[:20]
        if not stories.exists():
            self.stdout.write("No stories from the last 24 hours; no emails sent.")
            return
        lines = ["Your BulkNewsMedia daily update", ""]
        for story in stories:
            lines.append(f"{story.title}\n{story.excerpt}\n")
        message = "\n".join(lines)
        subscribers = Subscription.objects.filter(active=True).values_list("email", flat=True)
        messages = [("Your BulkNewsMedia daily update", message, None, [email]) for email in subscribers]
        sent = send_mass_mail(messages, fail_silently=False)
        self.stdout.write(self.style.SUCCESS(f"Sent {sent} daily update email(s)."))
