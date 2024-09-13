"use client";

import ContactSupportBox from "@/components/ContactSupportBox";
import OverViewSect from "@/components/OverViewSect";
import RecentActivity from "@/components/RecentActivity";
import ReferEarnBox from "@/components/ReferEarnBox";
import TotalBalanceSect from "@/components/TotalBalanceSect";

function Dashboard() {
  return (
    <>
      <div className="grid h-full w-full grid-rows-[100px_max-content_minmax(0,1fr)] content-between gap-4 overflow-hidden lg:grid-rows-[140px_280px_minmax(0,1fr)]">
        <TotalBalanceSect />
        <OverViewSect />
        <div className="grid grid-cols-1 grid-rows-2 gap-4 lg:grid-cols-[1fr_300px] lg:grid-rows-1">
          <RecentActivity />
          <div className="grid h-full grid-cols-1 grid-rows-[300px_minmax(0,1fr)] gap-4 md:grid-cols-2 md:grid-rows-[max-content] lg:grid-cols-1 lg:grid-rows-[370px_minmax(0,1fr)]">
            <ReferEarnBox />
            <ContactSupportBox />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
