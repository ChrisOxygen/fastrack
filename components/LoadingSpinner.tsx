import { Spinner } from "@nextui-org/react";
import React from "react";

function LoadingSpinner() {
  return (
    <div className="fixed left-0 top-0 grid h-screen w-screen place-items-center bg-white/85">
      <Spinner
        classNames={{
          wrapper: "w-[100px] h-[100px] ",
          circle1: "w-[100px] h-[100px] ",
          circle2: "w-[100px] h-[100px] ",
        }}
      />
    </div>
  );
}

export default LoadingSpinner;
