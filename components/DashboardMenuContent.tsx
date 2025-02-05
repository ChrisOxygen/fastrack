import SideBarMenuItem from "./SideBarMenuItem";

import UserProfileBox from "./UserProfileBox";

function DashboardMenuContent() {
  return (
    <>
      <div className="w-full">
        <div className="flex h-full flex-col items-end gap-2">
          <menu className="flex h-full flex-col items-end gap-2">
            <SideBarMenuItem tabTitle="dashboard" />
            <SideBarMenuItem tabTitle="all transactions" />
            <SideBarMenuItem tabTitle="deposit" />
            <SideBarMenuItem tabTitle="investment" />
            <SideBarMenuItem tabTitle="withdraw" />
            <SideBarMenuItem tabTitle="referrals" />
            {/* <SideBarMenuItem tabTitle="settings" /> */}
            <SideBarMenuItem tabTitle="support" />
          </menu>
        </div>
      </div>

      <div className={`flex items-center justify-center gap-3`}>
        <div className="flex w-full flex-col items-center border-t-1 border-siteHeadingDark/25 py-4">
          <UserProfileBox />
          <span className="">2024 Fastrack </span>
        </div>
      </div>
    </>
  );
}

export default DashboardMenuContent;
