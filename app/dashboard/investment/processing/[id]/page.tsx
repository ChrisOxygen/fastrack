"use client";

import { notify } from "@/components/ReferEarnBox";
import copy from "copy-to-clipboard";
import { useParams, useRouter } from "next/navigation";
import { FiCopy } from "react-icons/fi";

function ProcessingPage() {
  const { id } = useParams();
  const router = useRouter();

  function handleCopy() {
    copy(id as string);

    notify("Investment ID copied");
  }
  return (
    <section className="grid h-full w-full grid-rows-[1fr] place-content-center place-items-center">
      <div className="flex flex-col items-center gap-5">
        <div className="flex w-full max-w-[500px] flex-col items-center gap-2 rounded-xl border bg-slate-50 px-5 py-8 text-center">
          <h3 className="text-3xl font-bold uppercase text-siteGreen">
            We are working on it
          </h3>
          <p className="font-dm_sans">
            Your Investment is Being Processed. this process should be complete
            under 2 days, if it takes longer then that, contact the admin with
            the investment id below
          </p>
          <span className="rounded-xl bg-green-800/25 px-4 py-2 font-dm_sans font-bold text-green-800">
            {id}
          </span>
          <button
            className="flex items-center justify-center gap-2 rounded-lg bg-[#1A5B4C] px-5 py-2 text-white shadow-sm"
            onClick={function () {
              handleCopy();
            }}
          >
            <FiCopy />
            Copy Investment ID
          </button>
        </div>
        <button
          className="flex items-center justify-center gap-2 rounded-lg bg-[#1A5B4C] px-5 py-2 text-white shadow-sm"
          onClick={() => router.push("/dashboard/investment")}
        >
          View all investments
        </button>
      </div>
    </section>
  );
}

export default ProcessingPage;
