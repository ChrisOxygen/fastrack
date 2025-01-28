import { PACKAGES_DETAILS } from "@/constants";
import PackageBox from "../PackageBox";

function PackagePricing() {
  return (
    <div className="relative flex w-full py-[100px]">
      <div className="mx-auto flex w-full flex-col items-start justify-between gap-4 px-6 md:container">
        <span className="rounded bg-siteGreen/5 px-4 py-1 font-semibold uppercase text-siteGreen">
          Investment Packages
        </span>
        <div className="flex flex-col items-start gap-5 lg:flex-row lg:gap-16">
          <h3 className="text-3xl font-bold md:text-5xl">
            Customized Investment Packages for every budget and goal
          </h3>
          <p className="text-lg text-siteText">
            Explore tailored investment packages offering diversification,
            expert management, customizable options, and consistent growth.
            Achieve financial goals with transparency, affordability, and
            reliable returns for every investor’s needs.
          </p>
        </div>
        <div className="mt-12 flex w-full flex-col items-start justify-between gap-6 lg:flex-row">
          {PACKAGES_DETAILS.map((ivPackageDetails, index) => (
            <PackageBox key={index} ivPackageDetails={ivPackageDetails} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PackagePricing;
