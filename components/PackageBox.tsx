import clsx from "clsx";
import CustomButton from "./ui/CustomButton";
import { LuCheckCheck } from "react-icons/lu";

type PackageBoxProps = {
  ivPackageDetails: {
    name: string;
    description: string;
    minimumAmount: string;
    duration: string;
    roi: string;
  };
};

function PackageBox({ ivPackageDetails }: PackageBoxProps) {
  const { name, description, minimumAmount, duration, roi } = ivPackageDetails;

  const isEmerald = name === "Emerald";
  return (
    <div
      className={clsx(
        "flex w-full max-w-[100opx] flex-col gap-4 rounded-2xl px-8 py-12 lg:max-w-[400px]",
        isEmerald ? "bg-siteGreen text-white" : "bg-gray-50",
      )}
    >
      <span className="text-lg font-semibold capitalize">{name}</span>
      <span className="text-lg">{description}</span>

      <div className="flex flex-wrap items-end gap-2 md:flex-nowrap">
        <span className="font-syne text-[60px] font-bold leading-none">
          {minimumAmount}
        </span>
        <span className="mb-2">Minimun</span>
      </div>
      <hr className="bg-siteText" />
      <div className="mb-5 flex w-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-siteOrange text-black">
            <LuCheckCheck />
          </span>
          <span className="grid place-items-center text-lg leading-none">
            {duration}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-siteOrange text-black">
            <LuCheckCheck />
          </span>
          <span className="grid place-items-center text-lg leading-none">
            {roi}
          </span>
        </div>
      </div>
      <CustomButton
        text="Get Started Today"
        bgColor={isEmerald ? "white" : "orange"}
        hoverBgColor={isEmerald ? "orange" : "green"}
        textColor="black"
      />
    </div>
  );
}

export default PackageBox;
