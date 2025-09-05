"use client";

import { signOut } from "next-auth/react";

export default function SignOutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 w-80 text-center">
        <h2 className="text-xl font-bold text-white">Are you sure?</h2>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
