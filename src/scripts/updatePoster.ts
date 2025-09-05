import prisma from "@/lib/prisma";

async function main() {
  await prisma.movie.update({
    where: { id: 1 },
    data: { poster_path: "now_playing/movie1.jpg" },
  });

  await prisma.movie.update({
    where: { id: 2 },
    data: { poster_path: "upcoming/movie2.jpg" },
  });

  await prisma.movie.update({
    where: { id: 3 },
    data: { poster_path: "top_rated/movie3.jpg" },
  });

  await prisma.movie.update({
    where: { id: 4 },
    data: { poster_path: "popular/movie4.jpg" },
  });

  console.log("Updated poster paths!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
