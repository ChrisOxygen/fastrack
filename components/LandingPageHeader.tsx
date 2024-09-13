import Image from "next/image";
import DesktopMenu from "./DesktopMenu";
import Link from "next/link";
import HeaderAuthBox from "./HeaderAuthBox";

function LandingPageHeader() {
  return (
    <header className=" w-full flex items-center justify-between">
      <Link
        href="/"
        className="flex text-center font-syne font-bold text-xl gap-2 "
      >
        <Image src="/kudizen-icon.png" alt="Kudizen" width={30} height={30} />
        <h6 className="">Kudizen</h6>
      </Link>

      <DesktopMenu />
      <HeaderAuthBox />
    </header>
  );
}

export default LandingPageHeader;
