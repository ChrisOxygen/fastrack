import { ReactNode } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa6";
import { TbBrandTether } from "react-icons/tb";

type DepositFormSelectProps = {
  method: {
    id: number;
    key: string;
    label: string;
    depositAddress: string;
    network: string;
  };
};
//

function DepositFormSelect({ method }: DepositFormSelectProps) {
  let content: ReactNode;

  switch (method.key) {
    case "BTC":
      content = (
        <div className="flex items-center gap-3 text-lg font-semibold text-siteText md:gap-5 md:text-2xl">
          <span className="text-3xl">
            <FaBitcoin />
          </span>
          <span className="">Bitcoin(BTC)</span>
        </div>
      );
      break;
    case "USDT":
      content = (
        <div className="flex items-center gap-3 text-lg font-semibold text-siteText md:gap-5 md:text-2xl">
          <span className="">
            <TbBrandTether />
          </span>
          <span className="">USDT(USDT)</span>
        </div>
      );
      break;
    case "ETH":
      content = (
        <div className="flex items-center gap-3 text-lg font-semibold text-siteText md:gap-5 md:text-2xl">
          <span className="">
            <FaEthereum />
          </span>
          <span className="">Etherium(ETH)</span>
        </div>
      );
      break;
    default:
      content = (
        <div className="flex items-center gap-3 text-2xl font-semibold text-siteText md:gap-5">
          <span className="">
            <FaBitcoin />
          </span>
          <span className="">Bitcoin(BTC)</span>
        </div>
      );
      break;
  }

  return <div className="block py-2 md:py-3">{content}</div>;
}

export default DepositFormSelect;
