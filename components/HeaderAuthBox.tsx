import Link from "next/link";

function HeaderAuthBox() {
  return (
    <div className="hidden items-center justify-center gap-3 sm:flex">
      <Link
        href="/login"
        className="bg-transparent font-dm_sans font-bold text-siteGreen"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="rounded-lg bg-siteGreen px-4 py-1 font-dm_sans font-bold text-siteLemon"
      >
        Sign up
      </Link>
    </div>
  );
}

export default HeaderAuthBox;
