"use client";

import React, { useEffect, useRef } from "react";

function HeaderScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "light",
      locale: "en",
    });

    containerRef.current.appendChild(script);

    return () => {
      if (container) {
        if (container?.contains(script)) {
          // container.removeChild(container?.firstChild);
          container?.removeChild(script); // Cleanup script on unmount
        }
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container z-[30]" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default HeaderScroll;
