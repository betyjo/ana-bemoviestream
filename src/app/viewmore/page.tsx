import MovieContainer from "@/components/MovieContainer";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/getMovies";
import type { Movie } from "@/type";

interface Props {
  searchParams: {
    title?: string; // optional in case query param is missing
  };
}

const ViewMorePage = async ({ searchParams }: Props) => {
  const title = searchParams?.title || ""; // safely handle missing title
  let movies: Movie[] = [];

  switch (title) {
    case "Now Playing":
      movies = await getNowPlayingMovies();
      break;
    case "Upcoming":
      movies = await getUpcomingMovies();
      break;
    case "Top Rated":
      movies = await getTopRatedMovies();
      break;
    case "Popular":
      movies = await getPopularMovies();
      break;
    default:
      movies = [];
  }

  return (
    <div className="py-10">
      <h2 className="text-4xl font-bold px-10 mb-5">
        Results of {title || "Movies"}
      </h2>
      <MovieContainer movies={movies} isVertical={true} />
    </div>
  );
};

export default ViewMorePage;
