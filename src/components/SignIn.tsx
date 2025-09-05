"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

interface SignInProps {
  onClose?: () => void;
}

const SignIn = ({ onClose }: SignInProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false, // handle redirect manually
      username,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      if (onClose) onClose();
      // optionally refresh page or update UI
      window.location.reload();
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-72 space-y-3">
      <h3 className="text-lg font-bold text-white text-center">Sign In</h3>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-2 py-1 rounded bg-gray-700 text-white"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-2 py-1 rounded bg-gray-700 text-white"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-1 rounded disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </div>
  );
};

export default SignIn;
