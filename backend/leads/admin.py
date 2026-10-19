from django.conf import settings
from django.contrib import admin, messages
from django.core.mail import send_mail
from django.utils import timezone

from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "status", "reviewed", "created_at", "responded_at")
    list_filter = ("status", "reviewed", "created_at")
    list_editable = ("status", "reviewed")
    search_fields = ("name", "email", "phone", "tip", "response")
    readonly_fields = ("created_at", "responded_at")
    ordering = ("-created_at",)
    actions = ("email_drafted_responses",)

    @admin.action(description="Email the drafted response to selected leads")
    def email_drafted_responses(self, request, queryset):
        sent = 0
        skipped = 0
        for lead in queryset:
            if not lead.response.strip():
                skipped += 1
                continue
            try:
                send_mail(
                    subject="Response from BulkNewsMedia",
                    message=lead.response,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[lead.email],
                    fail_silently=False,
                )
            except Exception:
                messages.error(request, f"Could not send a response to {lead.email}. Check the email configuration.")
                continue
            lead.status = "responded"
            lead.reviewed = True
            lead.responded_at = timezone.now()
            lead.save(update_fields=("status", "reviewed", "responded_at"))
            sent += 1
        if sent:
            self.message_user(request, f"Sent {sent} response email(s).")
        if skipped:
            self.message_user(request, f"Skipped {skipped} lead(s) without a drafted response.", level=messages.WARNING)
