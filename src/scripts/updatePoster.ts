import prisma from "@/lib/prisma";

async function main() {
  await prisma.movie.update({
    where: { title: "Movie 1" },
    data: { poster_path: "now_playing/movie1.jpg" },
  });

  await prisma.movie.update({
    where: { title: "Movie 2" },
    data: { poster_path: "upcoming/movie2.jpg" },
  });

  // Repeat for all movies
  console.log("Updated poster paths!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
