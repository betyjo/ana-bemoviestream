"use client";

import { useState } from "react";

interface AdminUploadProps {
  userId: number;
}

const AdminUpload: React.FC<AdminUploadProps> = ({ userId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return setMessage("Select a file first");

    // For demo, we just create a fake URL
    const url = `/uploads/${file.name}`;

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, url, userId }),
    });

    if (res.ok) {
      setMessage("Upload successful!");
      setFile(null);
    } else {
      setMessage("Upload failed");
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="ml-2 bg-blue-600 text-white px-3 py-1 rounded"
      >
        Upload
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default AdminUpload;
