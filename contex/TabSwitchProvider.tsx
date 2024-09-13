"use client";

import { createContext, Dispatch, useContext, useState } from "react";

type TabSwitchContextType = {
  activeScreen: screenViewListType;
  setActiveScreen: Dispatch<React.SetStateAction<screenViewListType>>;
};

const TabSwitchContext = createContext<TabSwitchContextType | null>(null);

export type screenViewListType =
  | "Dashboard"
  | "All Transactions"
  | "Add Money"
  | "Send Money"
  | "Withdraw"
  | "Referral"
  | "Settings"
  | "Support Tickets";

function TabSwitchProvider({ children }: { children: React.ReactNode }) {
  const [activeScreen, setActiveScreen] =
    useState<screenViewListType>("Dashboard");
  return (
    <TabSwitchContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
      }}
    >
      {children}
    </TabSwitchContext.Provider>
  );
}
//custom hook
function useTabSwitch() {
  const context = useContext(TabSwitchContext);

  if (context === undefined)
    throw new Error("TabSwitchContext was used outside the TabSwitchProvider");

  const { activeScreen, setActiveScreen } = context as TabSwitchContextType;
  return { activeScreen, setActiveScreen };
}

export { TabSwitchProvider, useTabSwitch };
