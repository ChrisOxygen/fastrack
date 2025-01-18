"use client";

import BuildPortfolioSect from "@/components/hompage/BuildPortfolioSect";
import PackagePricing from "@/components/hompage/PackagePricing";

function InvestmentPlansPage() {
  return (
    <div className="relative flex w-full flex-col pt-[100px]">
      <div className="mx-auto flex w-full flex-col items-start justify-between gap-4 border-t bg-siteGreen/10 px-6">
        <div className="mx-auto md:container">
          <PackagePricing />
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col items-start justify-between gap-4 border-t px-6 md:container">
        <BuildPortfolioSect />
      </div>
    </div>
  );
}

export default InvestmentPlansPage;
