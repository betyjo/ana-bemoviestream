import MovieContainer from "@/components/MovieContainer";
import { getAllGenres } from "@/lib/getGenres";
import { notFound } from "next/navigation";

const GenrePage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { genre?: string };
}) => {
  const genreId = Number(params.id);
  if (Number.isNaN(genreId)) return notFound();

  // Fetch all movies for this genre
  const genreMovies = await getAllGenres(genreId); // returns all genres from movies
  const selectedMovies = genreMovies
    .filter((g) => g.id === genreId)
    .map((g) => ({
      id: g.id,
      title: g.name,
      poster_path: `/posters/GENRE/${g.name
        .toLowerCase()
        .replace(/\s+/g, "")}.jpg`, // optional placeholder mapping
      adult: false,
      backdrop_path: "",
      genre_ids: [g.id],
      original_language: "en",
      original_title: g.name,
      overview: "No description available",
      popularity: 0,
      release_date: "",
      video: false,
      vote_average: 0,
      vote_count: 0,
    }));

  if (selectedMovies.length === 0) return notFound();

  const genreName = searchParams?.genre || `Genre ${genreId}`;

  return (
    <div className="py-10 max-w-screen-xl mx-auto">
      <h2 className="text-4xl font-bold px-10 mb-5">Results for {genreName}</h2>
      <MovieContainer movies={selectedMovies} title={genreName} isVertical />
    </div>
  );
};

export default GenrePage;
