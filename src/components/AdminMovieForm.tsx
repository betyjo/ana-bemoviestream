"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminMovieForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    overview: "",
    release_date: "",
    poster_path: "",
    backdrop_path: "",
    video: false,
    vote_average: 0,
    vote_count: 0,
    popularity: 0,
    genre_ids: [] as number[],
    tagline: "",
    status: "",
    adult: false,
    original_language: "",
    original_title: "",
    trailer_url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/movies");
      } else {
        const data = await res.json();
        console.error("Error creating movie:", data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 max-w-lg mx-auto p-4"
    >
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <textarea
        placeholder="Overview"
        name="overview"
        value={form.overview}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="date"
        name="release_date"
        value={form.release_date}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Poster Path"
        name="poster_path"
        value={form.poster_path}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Backdrop Path"
        name="backdrop_path"
        value={form.backdrop_path}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Trailer URL"
        name="trailer_url"
        value={form.trailer_url}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="IMDb Rating"
        name="vote_average"
        value={form.vote_average}
        onChange={handleChange}
        className="border p-2 rounded"
        step="0.1"
      />
      <input
        type="number"
        placeholder="Vote Count"
        name="vote_count"
        value={form.vote_count}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Popularity"
        name="popularity"
        value={form.popularity}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Tagline"
        name="tagline"
        value={form.tagline}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Status"
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Original Language"
        name="original_language"
        value={form.original_language}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Original Title"
        name="original_title"
        value={form.original_title}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="adult"
          checked={form.adult}
          onChange={handleChange}
        />
        Adult
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="video"
          checked={form.video}
          onChange={handleChange}
        />
        Video
      </label>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-2">
        Add Movie
      </button>
    </form>
  );
}
