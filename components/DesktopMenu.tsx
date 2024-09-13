import Link from "next/link";

function DesktopMenu() {
  return (
    <nav className="">
      <menu className="flex items-center justify-center gap-6 font-dm_sans font-bold ">
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
  );
}

export default DesktopMenu;
