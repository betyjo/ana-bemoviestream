import Image from "next/image";
import Link from "next/link";
import GenreDropDown from "./GenreDropDown";
import SearchInput from "./SearchInput";
import ThemeToggler from "./ThemeToggler";

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between backdrop-blur-2xl transition-colors p-5 bg-[#12121280] gap-4 md:gap-0 sticky z-50 top-0">
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
      </div>
    </header>
  );
};

export default Header;
