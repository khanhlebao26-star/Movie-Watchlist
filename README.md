# Movie Watchlist

A full-stack movie watchlist web application built with React, Vite, Express, Prisma, PostgreSQL, and Supabase.

The application allows users to browse movies, manage their watchlist, track watching progress, and watch movies through secure temporary video URLs. Administrators can manage movie data.

---

## Features

### User

- Register and login
- JWT authentication with HTTP-only cookies
- Browse and search movies
- Filter movies by genre
- View movie details and cast
- Add/remove movies from watchlist
- Update watchlist status
- Rate movies and add notes
- Track movie watching progress
- Continue watching unfinished movies
- Watch movies through protected video URLs
- View trending people from TMDB

### Admin

Administrators have all user features plus:

- Create movies
- Update movies
- Delete movies
- Manage movie information
- Manage movie video paths

> Note: Role-based access control (RBAC) is strictly enforced on the backend.

---

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js 22+
- Express 5
- Prisma 7
- PostgreSQL
- JWT
- bcryptjs
- Zod
- Helmet
- CORS
- Express Rate Limit
- Supertest
- Node.js Test Runner

### External Services

- Supabase PostgreSQL: Production database
- Supabase Storage: Private movie video storage
- TMDB API: Trending people and movie cast information

---

## Project Structure

```text
movie_watchlist/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   ├── test/
│   │   └── api.test.js
│   ├── .env.example
│   ├── package.json
│   └── prisma.config.ts
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Requirements

Make sure the following are installed:

- Node.js 22 or later
- npm
- The project uses PostgreSQL through Prisma ORM and currently uses Supabase PostgreSQL.

---

## Installation

Clone the repository and enter the project directory:

```bash
git clone <repository-url>
cd movie_watchlist
```

### Backend

```bash
cd backend
npm install
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
```

---

## Environment Variables

### Backend

Create `backend/.env` based on: `backend/.env.example`

Example:

```env
DATABASE_URL=
NODE_ENV=development

JWT_SECRET=
JWT_EXPIRES_IN=7d

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_BUCKET=movies

TMDB_READ_ACCESS_TOKEN=

ADMIN_EMAIL=
ADMIN_NAME=Movie Admin
ADMIN_PASSWORD=

PORT=5001
FRONTEND_URL=http://localhost:5173
```

### Frontend

Create `frontend/.env` based on: `frontend/.env.example`

Example:

```env
VITE_API_URL=http://localhost:5001
```

> Important: Never commit real `.env` files, database passwords, JWT secrets, Supabase service-role keys, or API tokens. The Supabase service-role key must remain backend-only and must never be exposed to the frontend.

---

## Database Setup

The project uses Prisma migrations.

From the `backend/` directory, generate Prisma Client:

```bash
npx prisma generate
```

Apply migrations:

```bash
npx prisma migrate deploy
```

For local development where you need to create a new migration:

```bash
npx prisma migrate dev
```

### Seed Data

To seed movie data:

```bash
npm run seed:movies
```

## Running the Application

### Start Backend

From `backend/`:

```bash
npm run dev
```

The backend runs on `http://localhost:5001`.

### Start Frontend

From `frontend/`:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

Open the frontend URL in your browser.

## Backend Scripts

Run these commands from `backend/`:

| Command                | Description                            |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Start backend with Nodemon             |
| `npm start`            | Start backend                          |
| `npm test`             | Run API test suite                     |
| `npm run seed:movies`  | Seed movie data                        |
| `npm run migrate:test` | Deploy migrations to the test database |

## Frontend Scripts

Run these commands from `frontend/`:

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start Vite development server |
| `npm run build`   | Build production frontend     |
| `npm run preview` | Preview production build      |
| `npm run lint`    | Run ESLint                    |

## Testing

The backend uses the Node.js built-in test runner and Supertest.

From `backend/`:

```bash
npm test
```

The test suite covers areas including:

- Authentication
- Authorization and RBAC
- Movie CRUD
- Movie validation
- Movie search and filtering
- Watchlist
- Watch progress
- Video API
- Supabase Storage error handling
- Trending people API
- TMDB API error handling

The test suite uses a separate test database.

## Video Storage

Movie videos are stored in a private Supabase Storage bucket.

The backend generates temporary signed URLs for authenticated users instead of exposing public storage URLs.

The Supabase service-role key must remain on the server and must never be exposed to the frontend.

## Security

The application includes several security mechanisms:

- JWT authentication
- HTTP-only authentication cookies
- Role-based access control
- Password hashing with bcrypt
- Request validation with Zod
- Helmet security headers
- CORS configuration
- Authentication rate limiting
- Private Supabase Storage
- Temporary signed video URLs
- Environment variables for secrets

## API Overview

Main API groups:

- `/auth`
- `/movies`
- `/watchlist`
- `/api/watch-progress`
- `/api/videos`
- `/trending`

Examples:

```text
GET    /auth/me

GET    /movies
GET    /movies/:id
GET    /movies/:id/cast

POST   /movies
PUT    /movies/:id
DELETE /movies/:id

GET    /watchlist
POST   /watchlist
PUT    /watchlist/:movieId
DELETE /watchlist/:movieId

GET    /api/watch-progress
POST   /api/watch-progress/:movieId

GET    /api/videos/:movieId

GET    /trending/people
```

Movie creation, update, and deletion require an authenticated administrator account.

## Development Workflow

1. Start PostgreSQL or Supabase.
2. Configure `backend/.env`.
3. Run Prisma migrations.
4. Start the backend.
5. Start the frontend.
6. Develop and test.
7. Run backend tests.
8. Run frontend lint and build.

## License

This project is currently developed for educational and portfolio purposes.
