# BulkNewsMedia Django API

## Setup

```sh
cd backend
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The API runs at `http://127.0.0.1:8000/api/`; Django admin is at `/admin/`. Add content through the admin site. SQLite is stored in `backend/db.sqlite3`. News and category entries are managed in Django admin under **Stories**. Select News, Opinion, Court Case, Photo Story, or Interview, then enter the displayed author name, excerpt/body, and optional image. Opinion pieces are added by staff in admin; they are not public submissions. Story images, video thumbnails, and media files are uploaded through admin forms and stored under `backend/media/` during local development.

Set `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api` in the frontend `.env.local` when using a non-default API URL. CORS allows localhost ports 3000 by default.

In production, serve `MEDIA_URL` (`/media/`) from durable file storage or an object store such as S3; Django's development media serving is enabled only when `DEBUG=1`. The frontend's Next Image allowlist derives its media host from `NEXT_PUBLIC_API_URL`, so use the backend's public origin there.

## Endpoints

- `POST /api/auth/register/`, `POST /api/auth/login/`, `POST /api/auth/token/refresh/`, `GET /api/auth/me/`, `POST /api/auth/logout/`
- `GET /api/stories/?category=news|opinion|court_case|photo_story|interview`, `GET /api/stories/{slug}/`, plus `/featured/`, `/desk/`, `/rising/`, `/most-read/`, `/search/?q=...`
- `POST /api/leads/` accepts `{name,email,phone?,tip}`
- `POST /api/tips/` accepts `{name,email,phone?,message}`
- `POST /api/newsletter/` accepts `{email}`; `POST /api/newsletter/unsubscribe/` accepts `{email}`
- `GET /api/videos/`, `GET /api/media/`, `GET /api/blog/`, `GET /api/topics/`

Content endpoints are public for reading and staff-only for changes. Leads and tips are public submission endpoints and are managed through Django admin. Auth uses SimpleJWT bearer access tokens.

Daily email subscriptions are delivered by scheduling `python manage.py send_daily_updates` once per day. Configure SMTP environment variables as described in `subscriptions/README.md`.
