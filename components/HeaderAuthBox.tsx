import Link from "next/link";

function HeaderAuthBox() {
  return (
    <div className="flex gap-3 items-center justify-center">
      <Link
        href="/login"
        className=" bg-transparent text-siteGreen font-dm_sans font-bold"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className=" bg-siteGreen text-siteLemon rounded-lg px-4 py-1 font-dm_sans font-bold"
      >
        Sign up
      </Link>
    </div>
  );
}

export default HeaderAuthBox;
