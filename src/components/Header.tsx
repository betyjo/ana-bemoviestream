import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between backdrop-blur-2xl transition-colors p-5 bg-[#12121280] gap-4 md:gap-0 sticky z-50 top-0">
      {/* Logo */}
      <Image
        src="logo.png"
        alt="Logo"
        width={120}
        height={100}
        priority={true}
        className="cursor-pointer w-40 h-auto"
      />
    </div>
  );
};

export default Header;
