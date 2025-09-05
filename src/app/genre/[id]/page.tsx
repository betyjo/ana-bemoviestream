// src/app/genre/[id]/page.tsx
import MovieContainer from "@/components/MovieContainer";
import { getMoviesByGenre, getAllGenres } from "@/lib/getMovies";
import { Movie } from "@/type";
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

  // Fetch movies belonging to this genre
  let movies: Movie[] = await getMoviesByGenre(genreId);

  // Fetch genre name for display
  const genres = await getAllGenres();
  const genreName =
    genres.find((g) => g.id === genreId)?.name || `Genre ${genreId}`;

  // If no movies exist, create placeholder data
  if (movies.length === 0) {
    movies = [
      {
        id: genreId,
        title: genreName,
        poster_path: `/posters/GENRE/${genreName
          .toLowerCase()
          .replace(/\s+/g, "")}.jpg`,
        adult: false,
        backdrop_path: "",
        genre_ids: [genreId],
        genres: [{ id: genreId, name: genreName }],
        tagline: "",
        status: "Released",
        original_language: "en",
        original_title: genreName,
        overview: "No description available",
        popularity: 0,
        release_date: "",
        video: false,
        vote_average: 0,
        vote_count: 0,
      },
    ];
  }

  return (
    <div className="py-10 max-w-screen-xl mx-auto">
      <h2 className="text-4xl font-bold px-10 mb-5">Results for {genreName}</h2>
      <MovieContainer movies={movies} title={genreName} isVertical />
    </div>
  );
};

export default GenrePage;
