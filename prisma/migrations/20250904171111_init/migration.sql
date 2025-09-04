-- CreateTable
CREATE TABLE "public"."Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT,
    "release_date" TIMESTAMP(3),
    "popularity" DOUBLE PRECISION DEFAULT 0,
    "vote_average" DOUBLE PRECISION DEFAULT 0,
    "vote_count" INTEGER DEFAULT 0,
    "poster_path" TEXT,
    "backdrop_path" TEXT,
    "genreIds" INTEGER[],
    "video" BOOLEAN DEFAULT false,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Video" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "official" BOOLEAN,
    "size" INTEGER,
    "published_at" TIMESTAMP(3),

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Video" ADD CONSTRAINT "Video_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
