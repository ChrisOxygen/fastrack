import CtaFooter from "@/components/CtaFooter";
import LandingPageHeader from "@/components/LandingPageHeader";
import React from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full flex-col overflow-x-hidden">
      <LandingPageHeader />
      {children}
      <CtaFooter />
    </main>
  );
}

export default RootLayout;
