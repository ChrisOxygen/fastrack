import { FiHeadphones } from "react-icons/fi";

function ContactSupportBox() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-siteHeadingDark/25 px-7 py-6 text-siteHeadingDark">
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="font-syne text-2xl font-bold">Contact Support</span>
        <span className="font-dm_sans text-sm">
          we respond in less that 2hours
        </span>
      </div>
      <button className="flex items-center justify-center gap-2 rounded-lg bg-[#1A5B4C] px-5 py-2 text-white shadow-sm">
        <span className="">
          <FiHeadphones />
        </span>
        Open a ticket
      </button>
    </div>
  );
}

export default ContactSupportBox;
