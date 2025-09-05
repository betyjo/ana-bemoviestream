"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminMovieForm from "@/components/AdminMovieForm";

export default function UploadPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Movie</h1>
      <AdminMovieForm />
    </div>
  );
}

export function UploadForm() {
  const router = useRouter();
  const [filename, setFilename] = useState("");
  const [url, setUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!filename || !url || !userId) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, url, userId }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to another page and pass data
        router.push(
          `/uploads?filename=${encodeURIComponent(data.filename)}&id=${data.id}`
        );
      } else {
        setMessage(`Upload failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while uploading.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload File</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Filename"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="File URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
