"use client";

import { Movie } from "../../type";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const router = useRouter();

  const handleRoute = () => {
    if (!movie.id) return;
    router.push(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={handleRoute}
      className="relative flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-gray-300 dark:to-[#1A1C29]/80 z-10" />
      <p className="absolute z-20 bottom-5 left-5 text-white font-semibold shadow-sm">
        {movie.title}
      </p>
      <Image
        src={getImagePath(movie.backdrop_path || movie.poster_path)}
        alt={movie.title}
        width={1920}
        height={1080}
        className="w-fit lg:min-w-[400px] h-56 object-cover shadow-md shadow-gray-900 drop-shadow-xl"
        priority={false} // avoid preloading all cards
      />
    </div>
  );
};

export default MovieCard;
