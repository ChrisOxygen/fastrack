"use client";

import Menu from "./Menu";

function DesktopMenu() {
  return (
    <nav className="hidden md:block">
      <Menu location="desktop" />
    </nav>
  );
}

export default DesktopMenu;
