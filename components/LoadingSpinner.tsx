import React from "react";

function LoadingSpinner() {
  return (
    <div className="fixed left-0 top-0 z-50 grid h-screen w-screen place-items-center bg-white/85">
      <div className="h-[100px] w-[100px] animate-spin rounded-full border-8 border-gray-300 border-t-siteGreen" />
    </div>
  );
}

export default LoadingSpinner;
