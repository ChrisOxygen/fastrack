import Image from "next/image";
import DesktopMenu from "./DesktopMenu";
import Link from "next/link";
import HeaderAuthBox from "./HeaderAuthBox";
import MobileMenu from "./MobileMenu";

function LandingPageHeader() {
  return (
    <header className="z-20 flex w-full items-center justify-between">
      <Link
        href="/"
        className="flex gap-2 text-center font-syne text-xl font-bold"
      >
        <Image
          src="/fastrack-green.png"
          alt="Kudizen"
          width={150}
          height={10}
        />
      </Link>

      <DesktopMenu />
      <HeaderAuthBox />

      <div className="block sm:hidden">
        <MobileMenu location="landing" />
      </div>
    </header>
  );
}

export default LandingPageHeader;
