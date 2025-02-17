import InvestmentPackage from "@/components/InvestmentPackage";
import { INVESTMENT_PLANS } from "@/constants";

function SelectIvPackagePage() {
  return (
    <section className="flex w-full flex-col items-center p-10">
      <div className="w-full max-w-xl flex-col items-center gap-5">
        <div className="mb-10 flex flex-col gap-2 md:items-center">
          <h3 className="font-dm_sans font-bold uppercase text-siteHeadingDark md:text-2xl">
            Investment Packages
          </h3>
          <p className="text-siteText md:text-center">
            Select an investment package to get started
          </p>
        </div>
        <div className="flex w-full flex-col gap-5">
          {INVESTMENT_PLANS.map((ivPackage, index) => (
            <InvestmentPackage key={index} ivPackage={ivPackage} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SelectIvPackagePage;
