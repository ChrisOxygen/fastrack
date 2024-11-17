import InvestmentPackage from "@/components/InvestmentPackage";
import { INVESTMENT_PLANS } from "@/constants";

function SelectIvPackagePage() {
  return (
    <section className="flex w-full flex-col items-center">
      <div className="w-full max-w-xl flex-col items-center gap-5">
        <h3 className="text-c font-dm_sans text-2xl font-bold uppercase text-siteHeadingDark">
          Investment Packages
        </h3>
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
