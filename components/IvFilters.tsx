import clsx from "clsx";
import React, { Dispatch, SetStateAction } from "react";

type IvFiltersProps = {
  filters: {
    isRunning: boolean;
    isCompleted: boolean;
    isProcessing: boolean;
  };
  setFilters: Dispatch<
    SetStateAction<{
      isRunning: boolean;
      isCompleted: boolean;
      isProcessing: boolean;
    }>
  >;
};

function IvFilters({ filters, setFilters }: IvFiltersProps) {
  const { isRunning, isCompleted, isProcessing } = filters;

  const toggleFilter = (filter: string) => {
    if (filter === "isRunning") {
      setFilters((prev) => ({ ...prev, isRunning: !prev.isRunning }));
    }
    if (filter === "isCompleted") {
      setFilters((prev) => ({ ...prev, isCompleted: !prev.isCompleted }));
    }
    if (filter === "isProcessing") {
      setFilters((prev) => ({ ...prev, isProcessing: !prev.isProcessing }));
    }
  };
  return (
    <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <h3 className="font-dm_sans uppercase text-siteHeadingDark/70">
        Filters:
      </h3>
      <div className="flex items-center gap-3">
        <button
          className={clsx(
            "flex items-center gap-2 rounded-3xl border border-siteHeadingDark/25 px-3 py-1 text-xs uppercase sm:gap-3 sm:text-sm",
            isRunning ? "opacity-100" : "opacity-50",
          )}
          onClick={() => toggleFilter("isRunning")}
        >
          <span
            className={clsx(
              "block size-2 rounded-full",
              isRunning ? "bg-orange-500" : "bg-gray-500",
            )}
          ></span>
          <span className={` ${isRunning ? "opacity-100" : "opacity-50"}`}>
            Running
          </span>
        </button>
        <button
          className={clsx(
            "flex items-center gap-2 rounded-3xl border border-siteHeadingDark/25 px-3 py-1 text-xs uppercase sm:gap-3 sm:text-sm",
            isCompleted ? "opacity-100" : "opacity-50",
          )}
          onClick={() => toggleFilter("isCompleted")}
        >
          <span
            className={clsx(
              "block size-2 rounded-full",
              isCompleted ? "bg-green-500" : "bg-gray-500",
            )}
          ></span>
          <span className={` ${isCompleted ? "opacity-100" : "opacity-50"}`}>
            completed
          </span>
        </button>
        <button
          className={clsx(
            "flex items-center gap-2 rounded-3xl border border-siteHeadingDark/25 px-3 py-1 text-xs uppercase sm:gap-3 sm:text-sm",
            isProcessing ? "opacity-100" : "opacity-50",
          )}
          onClick={() => toggleFilter("isProcessing")}
        >
          <span
            className={clsx(
              "block size-2 rounded-full",
              isProcessing ? "bg-blue-500" : "bg-gray-500",
            )}
          ></span>
          <span className={` ${isProcessing ? "opacity-100" : "opacity-50"}`}>
            Processing
          </span>
        </button>
      </div>
    </div>
  );
}

export default IvFilters;
