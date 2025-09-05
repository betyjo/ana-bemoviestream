// src/app/page.tsx
import HeroCarousel from "@/components/HeroCarousel";
import MovieContainer from "@/components/MovieContainer";
import CaroselBanner from "@/components/CaroselBanner";
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getPopularMovies,
} from "@/lib/getMovies";
import Image from "next/image";

export default async function Home() {
  // Fetch movies
  const nowPlayingMovies = await getNowPlayingMovies();
  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/mbg.jpg')" }}
    >
      {/* Optional overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Logo on the side */}
      <div className="absolute top-4 left-4 z-20">
        <Image src="/logo.png" alt="Logo" width={60} height={60} />
      </div>

      {/* Page content */}
      <div className="relative z-10 space-y-6">
        {/* Hero carousel at top */}
        <HeroCarousel movies={nowPlayingMovies} />

        {/* Optional CaroselBanner if still needed */}
        {/* <CaroselBanner /> */}

        {/* Movie sections */}
        <div className="flex flex-col space-y-4">
          <MovieContainer movies={nowPlayingMovies} title="Now Playing" />
          <MovieContainer movies={upcomingMovies} title="Upcoming" />
          <MovieContainer movies={topRatedMovies} title="Top Rated" />
          <MovieContainer movies={popularMovies} title="Popular" />
        </div>
      </div>
    </main>
  );
}
