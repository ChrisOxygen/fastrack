import Link from "next/link";

function LandingMenuContent() {
  return (
    <>
      <div className="w-full">
        <nav className="w-full">
          <menu className="flex flex-col items-center justify-center gap-6 font-syne text-4xl font-bold">
            <li className="">
              <Link href="/about">About</Link>
            </li>
            <li className="">
              <Link href="/faq">FAQ</Link>
            </li>
            <li className="">
              <Link href="/contacts">Contacts</Link>
            </li>
          </menu>
        </nav>
      </div>

      <div className={`flex items-center justify-center gap-3`}>
        <Link
          href="/login"
          className="rounded-lg border border-siteHeadingDark bg-transparent px-4 py-1 font-dm_sans font-bold text-siteGreen"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-lg border border-siteGreen bg-siteGreen px-4 py-1 font-dm_sans font-bold text-siteLemon"
        >
          Sign up
        </Link>
      </div>
    </>
  );
}

export default LandingMenuContent;
