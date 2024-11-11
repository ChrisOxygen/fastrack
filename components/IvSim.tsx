import React, { useState, useEffect } from "react";

function IvSim({ tradeAmount }: { tradeAmount: number }) {
  const [percentageRange, setPercentageRange] = useState(1.5);
  const [currentPrice, setCurrentPrice] = useState(tradeAmount);

  useEffect(() => {
    const fluctuatePrice = () => {
      const minChange = tradeAmount * (1 - percentageRange / 100);
      const maxChange = tradeAmount * (1 + percentageRange / 100);
      const newPrice = Math.random() * (maxChange - minChange) + minChange;
      setCurrentPrice(Number(newPrice.toFixed(2)));
    };

    // Start fluctuating every second
    const interval = setInterval(fluctuatePrice, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount or stop
  }, [tradeAmount, percentageRange]);

  return (
    <span className="text-5xl font-bold text-siteGreen sm:text-6xl">
      {currentPrice}
    </span>
  );
}

export default IvSim;
