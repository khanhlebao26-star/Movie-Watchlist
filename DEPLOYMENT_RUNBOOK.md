# Deployment Runbook

This runbook is for temporarily publishing the portfolio demo, pausing it when
it is not needed, and restoring it later without losing data.

## Production topology

The frontend and backend are hosted on different sites.

Required production settings:

```env
# Backend
NODE_ENV=production
FRONTEND_URL=https://your-frontend.example

# Frontend
VITE_API_URL=https://your-backend.example
```

The authentication cookie uses `HttpOnly`, `Secure`, and `SameSite=None`.
CORS accepts only `FRONTEND_URL`, and state-changing browser requests from
another origin are rejected.

## Secrets inventory

Store the values in the hosting provider and a password manager. Never commit
the real values to Git.

```text
DATABASE_URL
JWT_SECRET
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_BUCKET
TMDB_READ_ACCESS_TOKEN
BLOCKED_TMDB_PERSON_IDS
ADMIN_EMAIL
ADMIN_NAME
ADMIN_PASSWORD
FRONTEND_URL
AUTH_RATE_LIMIT_MAX
VITE_API_URL
```

## Before pausing the demo

### 1. Preserve the source code

- Commit and push the repository.
- Confirm that Prisma migrations are included.
- Confirm that `.env` and backup files are not tracked by Git.

### 2. Back up database data

Create the backup outside this repository because it can contain email
addresses, password hashes, and other private data.

In PowerShell, replace the placeholder and run:

```powershell
New-Item -ItemType Directory -Force "D:\Backups\movie-watchlist"
npx supabase@latest db dump --db-url "<SUPABASE_SESSION_POOLER_URL>" -f "D:\Backups\movie-watchlist\data.sql" --use-copy --data-only
```

Prisma migrations preserve the database structure. This data dump preserves
the records such as users, movies, watchlists, and watch progress.

### 3. Back up Supabase Storage

Database dumps do not contain the video files stored in the `movies` bucket.
Download that bucket separately from Supabase Storage and keep it beside the
database backup:

```text
D:\Backups\movie-watchlist\
├── data.sql
└── movies\
    └── video files...
```

For a small portfolio library, downloading the bucket from the Supabase
Dashboard is the simplest option. Signed URLs do not need to be saved because
the backend creates new URLs when the demo is running.

### 4. Pause without deleting

- Let the backend sleep or suspend it in the hosting dashboard.
- Let the Supabase Free project pause automatically.
- Do not delete the Supabase project, database, bucket, or hosting services.

## Restore the demo

1. Resume the Supabase project and wait until it reports healthy.
2. Confirm that database tables and the `movies` bucket still exist.
3. Restore all backend environment variables.
4. Start or redeploy the backend.
5. From `backend/`, apply pending migrations with `npx prisma migrate deploy`.
6. Restore `VITE_API_URL` and redeploy the frontend if its backend URL changed.
7. Run the smoke test below.

If the Supabase project was deleted, create a new project, apply the Prisma
migrations, import the database data dump, recreate the private `movies`
bucket, and upload the backed-up video files.

## Smoke test

- [ ] The home page loads.
- [ ] Registration and login work.
- [ ] Refreshing the page keeps the user logged in.
- [ ] `/auth/me` returns the logged-in user.
- [ ] Movie browsing, search, and filtering work.
- [ ] Watchlist changes persist.
- [ ] Watch progress persists.
- [ ] A logged-in user receives a signed video URL and can play the video.
- [ ] A normal user cannot access administrator operations.
- [ ] An administrator can create and update a movie.
- [ ] Logout clears the cookie.
- [ ] The protected video endpoint returns `401` after logout.
- [ ] The browser console shows no CORS or cookie errors.

## Before sharing the portfolio link

Resume the services and complete the smoke test at least one day before sending
the link. A sleeping free backend can take around a minute to handle its first
request.
