import { formatToUSD, getReadableDuration } from "@/utils/services";
import Link from "next/link";

type InvestmentPackageProps = {
  ivPackage: {
    packageName: string;
    minimumInvestment: number;
    durationDays: number;
    roiPercent: number;
  };
};

function InvestmentPackage({ ivPackage }: InvestmentPackageProps) {
  const { packageName, minimumInvestment, durationDays, roiPercent } =
    ivPackage;

  return (
    <div className="flex flex-col gap-2">
      <div className="mt-5 flex flex-col gap-2 rounded-xl border border-siteHeadingDark/25 bg-gray-50 px-5 pb-5 hover:shadow-sm">
        <span className="mt-[-12px] w-max rounded-md border border-siteHeadingDark/25 bg-siteGreen px-3 py-[2px] font-dm_sans font-bold text-white">
          {packageName}
        </span>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-siteHeadingDark/25 py-3">
            <span className="font-dm_sans font-semibold text-siteGreen">
              Duration
            </span>
            <span className="font-dm_sans">{durationDays} Days</span>
          </div>
          <div className="flex items-center justify-between border-b border-siteHeadingDark/25 py-3">
            <span className="font-dm_sans font-semibold text-siteGreen">
              ROI(%)
            </span>
            <span className="font-dm_sans">{roiPercent} %</span>
          </div>
          <div className="flex items-center justify-between border-siteHeadingDark/25 py-3">
            <span className="font-dm_sans font-semibold text-siteGreen">
              Minimum Amount
            </span>
            <span className="font-dm_sans">
              {formatToUSD(minimumInvestment)}
            </span>
          </div>

          <Link
            href={`/dashboard/investment/create/${packageName.toLowerCase()}`}
            className="rounded-md bg-siteGreen p-2 text-center font-dm_sans font-bold text-white"
          >
            Invest Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InvestmentPackage;
