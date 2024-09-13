import Link from "next/link";
import { useState } from "react";
import { BiShowAlt } from "react-icons/bi";

function ViewTransDetails({ transactionId }: { transactionId: string }) {
  return (
    <Link
      href={`/dashboard/transaction/${transactionId}`}
      className="grid h-10 w-10 place-items-center text-3xl text-siteHeadingDark/40 hover:text-green-700"
    >
      <BiShowAlt />
    </Link>
  );
}

export default ViewTransDetails;
