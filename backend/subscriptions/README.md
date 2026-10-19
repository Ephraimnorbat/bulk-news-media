# Daily email updates

The newsletter endpoint stores active email subscriptions. Configure `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USE_TLS`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, and `DEFAULT_FROM_EMAIL` in the environment for SMTP delivery. Without configuration, Django uses its console email backend.

Schedule `python manage.py send_daily_updates` once per day with cron or your hosting provider's scheduler. The command emails up to 20 stories published within the last 24 hours to each active subscriber. It skips delivery when there are no recent stories.
