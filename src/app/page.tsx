import CaroselBanner from "@/components/CaroselBanner";
import MovieContainer from "@/components/MovieContainer";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/getMovies";

export default async function Home() {
  const nowPlayingMovies = await getNowPlayingMovies();
  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/mbg.jpg')" }}
    >
      {/* Optional overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Page content */}
      <div className="relative z-10">
        <CaroselBanner />
        <div className="flex flex-col space-y-2">
          <MovieContainer movies={nowPlayingMovies} title="Now Playing" />
          <MovieContainer movies={upcomingMovies} title="Upcoming" />
          <MovieContainer movies={topRatedMovies} title="Top Rated" />
          <MovieContainer movies={popularMovies} title="Popular" />
        </div>
      </div>
    </main>
  );
}
