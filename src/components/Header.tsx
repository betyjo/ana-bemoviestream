import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between backdrop-blur-2xl transition-colors p-5 bg-[#12121280] gap-4 md:gap-0 sticky z-50 top-0">
      {/* Logo */}
      <Link href={"/"}>
        <Image
          src="logo.svg"
          alt="Logo"
          width={120}
          height={100}
          priority={true}
          className="cursor-pointer w-40 h-auto"
        />
      </Link>
    </div>
  );
};

export default Header;
