type InvestmentRowProps = {
  investment: {
    investmentTier: string;
    amount: number;
    status: string;
    returns: number;
    createdAt: string;
  };
  num: number;
};

// 48 hours from createdAt is end date

const endDate = (createdAt: string) => {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + 2);
  //   return date.toDateString();
  // return dat without year
  return date.toDateString().slice(0, -5);
};

function InvestmentRow({ investment, num }: InvestmentRowProps) {
  const { investmentTier, amount, status, returns, createdAt } = investment;
  console.log(endDate(createdAt));
  return (
    <div className="grid grid-cols-[25px_minmax(40px,100px)_minmax(40px,60px)_minmax(40px,60px)_minmax(60px,80px)_minmax(70px,90px)] justify-between">
      <span className="text-sm text-siteHeadingDark/60">#{num}</span>
      <span className="text-sm text-siteHeadingDark/60">
        {investment.investmentTier}
      </span>
      <span className="text-sm text-siteHeadingDark/60">
        {investment.amount}
      </span>
      <span className="text-sm text-siteHeadingDark/60">
        {investment.returns}
      </span>
      <span className="text-sm text-siteHeadingDark/60">
        {investment.status}
      </span>
      <span className="text-sm text-siteHeadingDark/60">
        {endDate(createdAt)}
      </span>
    </div>
  );
}

export default InvestmentRow;
