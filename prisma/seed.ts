import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const movies = [
    {
      title: "Ash",
      overview: "Example overview for Ash.",
      release_date: new Date("2023-01-01"),
      poster_path: "/ash.jpg",
      backdrop_path: "/ash.jpg",
      popularity: 50,
      vote_average: 7.5,
      vote_count: 100,
      genreIds: [1, 2],
    },
    {
      title: "Avatar",
      overview: "Example overview for Avatar.",
      release_date: new Date("2023-02-01"),
      poster_path: "/avatar.jpg",
      backdrop_path: "/avatar.jpg",
      popularity: 90,
      vote_average: 8.0,
      vote_count: 200,
      genreIds: [1, 3],
    },
    {
      title: "Back Action",
      poster_path: "/backaction.jpg",
      backdrop_path: "/backaction.jpg",
      release_date: new Date("2023-03-01"),
      popularity: 70,
      vote_average: 6.5,
      vote_count: 50,
      genreIds: [2],
    },
    {
      title: "Emily in Paris",
      poster_path: "/emilyinparis.jpg",
      backdrop_path: "/emilyinparis.jpg",
      release_date: new Date("2023-04-01"),
      popularity: 80,
      vote_average: 7.8,
      vote_count: 120,
      genreIds: [3],
    },
    {
      title: "Mean Girls",
      poster_path: "/meangirls.jpg",
      backdrop_path: "/meangirls.jpg",
      release_date: new Date("2023-05-01"),
      popularity: 85,
      vote_average: 7.9,
      vote_count: 140,
      genreIds: [2, 3],
    },
    {
      title: "Money Heist",
      poster_path: "/moneyheist.jpg",
      backdrop_path: "/moneyheist.jpg",
      release_date: new Date("2023-06-01"),
      popularity: 95,
      vote_average: 9.0,
      vote_count: 300,
      genreIds: [1, 4],
    },
    {
      title: "Outer Banks",
      poster_path: "/outerbanks.jpg",
      backdrop_path: "/outerbanks.jpg",
      release_date: new Date("2023-07-01"),
      popularity: 75,
      vote_average: 7.2,
      vote_count: 90,
      genreIds: [3],
    },
    {
      title: "Thursday Murder",
      poster_path: "/thursdaymurder.jpg",
      backdrop_path: "/thursdaymurder.jpg",
      release_date: new Date("2023-08-01"),
      popularity: 60,
      vote_average: 6.8,
      vote_count: 70,
      genreIds: [4],
    },
  ];

  for (const movie of movies) {
    await prisma.movie.create({ data: movie });
  }

  console.log("Seeded movies successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
