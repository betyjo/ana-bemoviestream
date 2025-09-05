const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Seed genres
  const genresData = [
    { id: 1, name: "Action" },
    { id: 2, name: "Comedy" },
    { id: 3, name: "Romance" },
    { id: 4, name: "Thriller" },
  ];

  for (const genre of genresData) {
    await prisma.genre.upsert({
      where: { id: genre.id },
      update: {},
      create: genre,
    });
  }

  // 2️⃣ Seed movies with genre relations
  const moviesData = [
    {
      title: "Ash",
      overview: "Example overview for Ash.",
      release_date: new Date("2023-01-01"),
      poster_path: "/posters/popular/ash.jpg",
      backdrop_path: "/posters/popular/ash.jpg",
      popularity: 50,
      vote_average: 7.5,
      vote_count: 100,
      video: false,
      genreIds: [1, 2],
    },
    {
      title: "Avatar",
      overview: "Example overview for Avatar.",
      release_date: new Date("2023-02-01"),
      poster_path: "/posters/popular/avatar.jpg",
      backdrop_path: "/posters/popular/avatar.jpg",
      popularity: 90,
      vote_average: 8.0,
      vote_count: 200,
      video: false,
      genreIds: [1, 3],
    },
    {
      title: "Back Action",
      overview: "Example overview for Back Action.",
      release_date: new Date("2023-03-01"),
      poster_path: "/posters/upcoming/backaction.jpg",
      backdrop_path: "/posters/upcoming/backaction.jpg",
      popularity: 70,
      vote_average: 6.5,
      vote_count: 50,
      video: false,
      genreIds: [2],
    },
    {
      title: "Emily in Paris",
      overview: "Example overview for Emily in Paris.",
      release_date: new Date("2023-04-01"),
      poster_path: "/posters/upcoming/emilyinparis.jpg",
      backdrop_path: "/posters/upcoming/emilyinparis.jpg",
      popularity: 80,
      vote_average: 7.8,
      vote_count: 120,
      video: false,
      genreIds: [3],
    },
    {
      title: "Mean Girls",
      overview: "Example overview for Mean Girls.",
      release_date: new Date("2023-05-01"),
      poster_path: "/posters/popular/meangirls.jpg",
      backdrop_path: "/posters/popular/meangirls.jpg",
      popularity: 85,
      vote_average: 7.9,
      vote_count: 140,
      video: false,
      genreIds: [2, 3],
    },
    {
      title: "Money Heist",
      overview: "Example overview for Money Heist.",
      release_date: new Date("2023-06-01"),
      poster_path: "/posters/toprated/moneyheist.jpg",
      backdrop_path: "/posters/toprated/moneyheist.jpg",
      popularity: 95,
      vote_average: 9.0,
      vote_count: 300,
      video: false,
      genreIds: [1, 4],
    },
    {
      title: "Outer Banks",
      overview: "Example overview for Outer Banks.",
      release_date: new Date("2023-07-01"),
      poster_path: "/posters/nowplaying/outerbanks.jpg",
      backdrop_path: "/posters/nowplaying/outerbanks.jpg",
      popularity: 75,
      vote_average: 7.2,
      vote_count: 90,
      video: false,
      genreIds: [3],
    },
    {
      title: "Thursday Murder",
      overview: "Example overview for Thursday Murder.",
      release_date: new Date("2023-08-01"),
      poster_path: "/posters/toprated/thursdaymurder.jpg",
      backdrop_path: "/posters/toprated/thursdaymurder.jpg",
      popularity: 60,
      vote_average: 6.8,
      vote_count: 70,
      video: false,
      genreIds: [4],
    },
  ];

  for (const movie of moviesData) {
    const createdMovie = await prisma.movie.create({
      data: {
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        popularity: movie.popularity,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        video: movie.video,
      },
    });

    await prisma.movieGenre.createMany({
      data: movie.genreIds.map((genreId) => ({
        movieId: createdMovie.id,
        genreId,
      })),
      skipDuplicates: true,
    });
  }

  // 3️⃣ Seed a demo admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  console.log("Seeded all genres, movies, and admin user successfully!");
}

main()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
