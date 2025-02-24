import React from "react";

function PrivacyPage() {
  return (
    <div className="relative flex w-full py-[100px]">
      <div className="mx-auto flex w-full flex-col items-start justify-between gap-4 border-t px-6 py-4 md:container">
        <h2 className="text-xl capitalize text-siteGreen md:text-2xl">
          1. Introduction
        </h2>
        <p className="font-archivo text-siteText">
          Fastrack Investments Company (“Company,” “we,” “our,” or “us”) values
          your privacy and is committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your data when you engage with our services, website, or
          platforms
        </p>
        <h2 className="text-xl capitalize text-siteGreen md:text-2xl">
          2. Information We Collect
        </h2>
        <div className="flex flex-col gap-3">
          <p className="font-archivo text-siteText">
            We may collect the following types of personal and non-personal
            information:
          </p>
          <ul className="gap1 flex flex-col">
            <li className="flex gap-3 font-archivo text-siteText">
              <span className="text-2xl text-siteGreen">*</span>
              <span className="">
                Personal details (name, email, phone number, address, etc.)
              </span>
            </li>
            <li className="flex gap-3 font-archivo text-siteText">
              <span className="text-2xl text-siteGreen">*</span>
              <span className="">
                Financial and transaction data (investment details, payment
                information)
              </span>
            </li>
            <li className="flex gap-3 font-archivo text-siteText">
              <span className="text-2xl text-siteGreen">*</span>
              <span className="">
                Technical data (IP address, device information, browsing
                behavior)
              </span>
            </li>
            <li className="flex gap-3 font-archivo text-siteText">
              <span className="text-2xl text-siteGreen">*</span>
              <span className="">Communications and inquiries</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;
