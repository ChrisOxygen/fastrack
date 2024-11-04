import Link from "next/link";
import { usePathname } from "next/navigation";

import { BiExit } from "react-icons/bi";
import { FiArchive, FiSend, FiSettings, FiTool, FiUsers } from "react-icons/fi";
import { GoArrowSwitch } from "react-icons/go";
import { GrMoney } from "react-icons/gr";

function itemIcon(listItem: string) {
  switch (listItem) {
    case "dashboard":
      return <FiArchive />;
    case "all transactions":
      return <GoArrowSwitch />;
    case "deposit":
      return <GrMoney />;
    case "investment":
      return <FiSend />;
    case "withdraw":
      return <BiExit />;
    case "referrals":
      return <FiUsers />;
    case "settings":
      return <FiSettings />;
    case "support":
      return <FiTool />;
    default:
      return <FiArchive />;
  }
}

function SideBarMenuItem({ tabTitle }: { tabTitle: string }) {
  const currentPath = usePathname();
  const dashboardPath = currentPath.replace("/dashboard ", " ");
  const isDashboard = tabTitle === "dashboard";
  const isReferral = tabTitle === "referrals";
  const isActive = dashboardPath.includes(
    "/dashboard/" + tabTitle.replace(" ", "-"),
  );

  const pageLink = isDashboard
    ? "/dashboard"
    : `/dashboard/${tabTitle.replace(" ", "-")}`;

  const isDashboardActive =
    currentPath === "/dashboard" && tabTitle === "dashboard";

  return (
    <li className={`screen-link ${isReferral && "mt-auto"}`}>
      <Link
        href={pageLink}
        className={`side-bar-btn flex w-full items-center gap-2 rounded-lg bg-transparent px-2 py-2 font-dm_sans font-semibold hover:bg-white/40 ${
          isActive ? "bg-white text-siteGreen shadow" : "text-siteHeadingDark"
        } ${
          isDashboardActive
            ? "bg-white text-siteGreen shadow"
            : "text-siteHeadingDark"
        }`}
      >
        {itemIcon(tabTitle)}
        {tabTitle}
      </Link>
    </li>
  );
}

export default SideBarMenuItem;
