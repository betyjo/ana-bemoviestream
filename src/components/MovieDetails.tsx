import MovieContainer from "@/components/MovieContainer";
import VideoPlayer from "@/components/VideoPlayer";
import { getImagePath } from "@/lib/getImagePath";
import {
  getMovieDetails,
  getMovieVideos,
  getPopularMovies,
} from "@/lib/getMovies";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Movie Studio Clone || Movie Details page",
};

interface Props {
  params: {
    id: string;
  };
}

const MovieDetails = async ({ params: { id } }: Props) => {
  // Fetch videos
  const videosData = await getMovieVideos(Number(id));
  const videos = videosData.map((v: any) => ({
    id: v.id,
    iso_639_1: v.iso_639_1 ?? "",
    iso_3166_1: v.iso_3166_1 ?? "",
    key: v.key,
    name: v.name,
    official: v.official ?? false,
    published_at: v.published_at
      ? new Date(v.published_at).toLocaleDateString()
      : "Unknown",
    site: v.site ?? "",
    size: v.size ?? 0,
    type: v.type ?? "",
  }));

  // Fetch movie details
  const rawDetails: any = await getMovieDetails(Number(id));
  const details = {
    ...rawDetails,
    release_date: rawDetails.release_date
      ? new Date(rawDetails.release_date).toLocaleDateString()
      : "Unknown",
    genres: rawDetails.genres ?? [],
    tagline: rawDetails.tagline ?? "N/A",
    status: rawDetails.status ?? "Unknown",
  };

  // Fetch popular movies
  const rawPopular = await getPopularMovies();
  const popularMovies = rawPopular.map((m: any) => ({
    ...m,
    release_date: m.release_date
      ? new Date(m.release_date).toLocaleDateString()
      : "Unknown",
    genres: m.genres ?? [],
  }));

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
            <span className="text-white font-medium">
              {details.release_date}
            </span>
          </p>
          <p className="text-gray-200 text-sm">
            Genres:{" "}
            {details.genres.map((item: any, idx: number) => (
              <span key={item.id} className="text-white font-medium mr-1">
                {item.name}
                {idx < details.genres.length - 1 ? "," : ""}
              </span>
            ))}
          </p>
          <p className="text-gray-200 text-sm">
            Tagline:{" "}
            <span className="text-white font-medium">{details.tagline}</span>
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
              {details.status}
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
