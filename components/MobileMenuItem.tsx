import clsx from "clsx";
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

function MobileMenuItem({ tabTitle }: { tabTitle: string }) {
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
    <li
      className={clsx(
        "w-full rounded-lg p-1 text-lg hover:bg-gray-100",
        isReferral && "mt-auto",
        isDashboardActive && "bg-siteGreen/10 hover:bg-siteGreen/10",
      )}
    >
      <Link
        href={pageLink}
        className={clsx("flex w-full items-center gap-3 p-2")}
      >
        <span
          className={clsx(
            "",
            isDashboardActive && "text-siteGreen",
            !isDashboardActive && "text-gray-400",
          )}
        >
          {itemIcon(tabTitle)}
        </span>
        <span
          className={clsx(
            "font-semibold capitalize",
            isDashboardActive && "text-siteGreen",
            !isDashboardActive && "text-siteHeadingDark",
          )}
        >
          {tabTitle}
        </span>
      </Link>
    </li>
  );
}

export default MobileMenuItem;

// className={`side-bar-btn flex w-full items-center gap-2 rounded-lg bg-transparent px-2 py-2 font-dm_sans font-semibold capitalize hover:bg-white/40 ${
//     isActive ? "bg-white text-siteGreen shadow" : "text-siteHeadingDark"
//   } ${
//     isDashboardActive
//       ? "bg-white text-siteGreen shadow"
//       : "text-siteHeadingDark"
//   }`}

// className={`screen-link ${isReferral && "mt-auto"}`}
