ana-bemoviestreaming
A full-stack movie streaming app built with Next.js, NextAuth.js, and Prisma. Supports admin and user roles, movie uploads, and genre management.

Features

Home Page

Search movies by title.

Navigation bar with Home and interactive genre filters.

Display movies with poster, title, and overview.

Admin Pages

Upload new movies with posters and optional videos.

Manage genres.

Movie Details

Show overview, genres, and associated videos.

Authentication

Sign-in using NextAuth credentials provider.

Role-based access (admin vs user).

Backend (API)

Auth: /api/auth/[...nextauth] handles login, logout, session.

Movies: /api/movie (CRUD, admin-only for POST/PUT/DELETE).

Genres: /api/genre (list genres, add new genres admin-only).

Upload: /api/upload (admin uploads posters/videos).

Role-based protection: via requireAuth helper; unauthorized access returns 401/403.

Database Schema (Prisma)
model User {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
  role     String
}

model Movie {
  id          Int       @id @default(autoincrement())
  title       String
  overview    String?
  release_date DateTime?
  poster_path String?
  genres      MovieGenre[]
}

model Genre {
  id     Int          @id @default(autoincrement())
  name   String
  movies MovieGenre[]
}

model MovieGenre {
  movieId Int
  genreId Int
  movie   Movie @relation(fields: [movieId], references: [id])
  genre   Genre @relation(fields: [genreId], references: [id])
  @@id([movieId, genreId])
}

model Upload {
  id       Int    @id @default(autoincrement())
  filename String
  url      String
  uploadedBy Int
}

Setup & Running

Install dependencies

npm install


Set environment variables

DATABASE_URL="-env"
NEXTAUTH_SECRET="adfadfadfaldkf"


Migrate database

npx prisma migrate dev --name init


Run dev server

npm run dev


Test API

Login: GET /api/auth/signin
register: POST /api/auth/signup

Movies: GET /api/movie, POST /api/movie (admin)

Genres: GET /api/genre, POST /api/genre (admin)

Upload: POST /api/upload (admin)