"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import GenreDropDown from "./GenreDropDown";
import SearchInput from "./SearchInput";
import ThemeToggler from "./ThemeToggler";
import SignIn from "./SignIn";

const Header: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(false);

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

      {/* Other controls */}
      <div className="text-white flex space-x-2 items-center">
        <GenreDropDown />
        <SearchInput />
        <ThemeToggler />

        {/* Sign In Button */}
        <div className="relative">
          <button
            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
            onClick={() => setShowSignIn(!showSignIn)}
          >
            Sign In
          </button>

          {/* Sign In form dropdown */}
          {showSignIn && (
            <div className="absolute right-0 mt-2 z-50">
              <SignIn onClose={() => setShowSignIn(false)} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
