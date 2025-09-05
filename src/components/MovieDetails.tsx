import MovieContainer from "@/components/MovieContainer";
import VideoPlayer from "@/components/VideoPlayer";
import { getImagePath } from "@/lib/getImagePath";
import {
  getMovieDetails,
  getMovieVideos,
  getPopularMovies,
} from "@/lib/getMovies";
import Image from "next/image";
import { Metadata } from "next";
import { Movie, VideoProps } from "@/type";

export const metadata: Metadata = {
  title: "Movie Studio Clone || Movie Details page",
};

interface Props {
  params: { id: string };
}

const transformMovie = (movie: any): Movie => ({
  ...movie,
  release_date: movie.release_date ? String(movie.release_date) : null,
  genres: movie.genres ?? [],
  tagline: movie.tagline ?? null,
  status: movie.status ?? null,
});

const MovieDetails = async (props: Props) => {
  // Dynamic route params must be awaited in Next 22
  const { params } = props;
  const id = Number(params.id);

  // Fetch videos and details
  const videosData = (await getMovieVideos(id)) || [];
  const videos: VideoProps[] = videosData.map((v: any) => ({
    id: v.id,
    movieId: v.movieId,
    key: v.key,
    name: v.name,
    site: v.site,
    type: v.type,
    official: v.official ?? null,
    size: v.size ?? null,
    published_at: v.published_at ?? null,
    iso_639_1: v.iso_639_1 ?? null,
    iso_3166_1: v.iso_3166_1 ?? null,
  }));

  const rawDetails = await getMovieDetails(id);
  const details: Movie = transformMovie(rawDetails);

  const popularMovies: Movie[] = ((await getPopularMovies()) || []).map(
    transformMovie
  );

  const releaseDate = details.release_date
    ? new Date(details.release_date).toLocaleDateString()
    : "Unknown";

  const genres = details.genres ?? [];

  return (
    <div className="px-10">
      <div className="py-10 flex flex-col lg:flex-row items-center gap-5">
        <div className="w-full lg:w-1/2 min-h-96 rounded-md overflow-hidden group">
          {details.backdrop_path && (
            <Image
              src={getImagePath(details.backdrop_path)}
              alt={details.title ?? "Movie Image"}
              width={1920}
              height={1080}
              className="w-full h-full object-cover shadow-md shadow-gray-900 drop-shadow-xl group-hover:scale-110 duration-500"
            />
          )}
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold underline decoration-[1px]">
            {details.original_title ?? details.title ?? "Untitled"}
          </h2>
          <p className="text-sm leading-6 tracking-wide mt-2">
            {details.overview ?? "No overview available."}
          </p>
          <p className="text-gray-200 text-sm">
            IMDB:{" "}
            <span className="text-white font-medium">
              {details.vote_average ?? "N/A"}
            </span>
          </p>
          <p className="text-gray-200 text-sm">
            Votes:{" "}
            <span className="text-white font-medium">
              {details.vote_count ?? "N/A"}
            </span>
          </p>
          <p className="text-gray-200 text-sm">
            Release Date:{" "}
            <span className="text-white font-medium">{releaseDate}</span>
          </p>
          <p className="text-gray-200 text-sm">
            Genres:{" "}
            {genres.length
              ? genres.map((g, idx) => (
                  <span key={g.id} className="text-white font-medium mr-1">
                    {g.name}
                    {idx < genres.length - 1 ? "," : ""}
                  </span>
                ))
              : "N/A"}
          </p>
          <p className="text-gray-200 text-sm">
            Tagline:{" "}
            <span className="text-white font-medium">
              {details.tagline ?? "N/A"}
            </span>
          </p>
          <p className="text-gray-200 text-sm">
            Status:{" "}
            <span
              className={`font-medium ${
                details.status === "Released"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {details.status ?? "Unknown"}
            </span>
          </p>
        </div>
      </div>

      <VideoPlayer videos={videos} />

      <div className="mt-6">
        <MovieContainer
          movies={popularMovies}
          title="Popular Movies"
          isVertical
        />
      </div>
    </div>
  );
};

export default MovieDetails;
