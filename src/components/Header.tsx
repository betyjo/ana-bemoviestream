"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import GenreDropdown from "./GenreDropDown";
import SearchInput from "./SearchInput";
import ThemeToggler from "./ThemeToggler";
import SignIn from "./SignIn";
import SignUp from "./Sign-Up";
import AdminUpload from "./AdminUpload";

const Header: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showAdminUpload, setShowAdminUpload] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  return (
    <header className="w-full flex items-center justify-between backdrop-blur-2xl transition-colors p-5 bg-[#12121280] gap-4 md:gap-0 sticky z-50 top-0 relative">
      {/* Logo */}
      <Link href="/" passHref>
        <Image
          src="/logo.svg"
          alt="Logo"
          width={120}
          height={100}
          priority
          className="w-40 h-auto"
        />
      </Link>

      {/* Left controls */}
      <div className="flex items-center gap-4">
        <SearchInput />
        <div className="relative">
          <button
            onClick={() => setShowGenreDropdown(!showGenreDropdown)}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
          >
            Genre
          </button>
          {showGenreDropdown && (
            <div className="absolute mt-2 z-50">
              <GenreDropdown />
            </div>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 text-white">
        <ThemeToggler />

        {/* Admin Upload */}
        <div className="relative">
          <button
            className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
            onClick={() => setShowAdminUpload(!showAdminUpload)}
          >
            Admin Upload
          </button>
          {showAdminUpload && (
            <div className="absolute right-0 mt-2 z-50">
              <AdminUpload
                userId={1}
                onClose={() => setShowAdminUpload(false)}
              />
            </div>
          )}
        </div>

        {/* Sign In */}
        <div className="relative">
          <button
            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
            onClick={() => {
              setShowSignIn(!showSignIn);
              setShowSignUp(false);
            }}
          >
            Sign In
          </button>
          {showSignIn && (
            <div className="absolute right-0 mt-2 z-50">
              <SignIn onClose={() => setShowSignIn(false)} />
            </div>
          )}
        </div>

        {/* Sign Up */}
        <div className="relative">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
            onClick={() => {
              setShowSignUp(!showSignUp);
              setShowSignIn(false);
            }}
          >
            Sign Up
          </button>
          {showSignUp && (
            <div className="absolute right-0 mt-2 z-50">
              <SignUp onClose={() => setShowSignUp(false)} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
