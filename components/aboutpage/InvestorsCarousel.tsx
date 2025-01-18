"use client";

import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { INVESTORS } from "@/constants";
import Image from "next/image";

function InvestorsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleInvestors = 4; // Number of testimonials visible at once
  const maxIndex = INVESTORS.length - visibleInvestors;

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <div className="mb-10 flex flex-col items-start space-y-2 px-6 pt-16 text-start sm:pt-24 md:mb-16 md:items-center md:text-center">
        <h5 className="text-[12px] font-light uppercase tracking-wider text-siteOrange md:text-sm">
          Our Team Experts
        </h5>
        <h3 className="font-wix w-full text-3xl font-semibold sm:w-[75%] md:w-1/2 md:text-4xl">
          Meet the Experts Behind Your Financial Growth
        </h3>
      </div>

      <div className="relative overflow-hidden lg:mx-12">
        <div
          className="flex px-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleInvestors)}%)`,
          }}
        >
          {INVESTORS.map((investor, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 p-4 lg:max-w-[25%]"
            >
              <div>
                <Image
                  src={investor.img}
                  alt={`Image of ${investor.name}, an ${investor.role}`}
                  className="h-96 w-full object-cover sm:h-[300px]"
                  width={500}
                  height={500}
                />
              </div>
              <div className="flex flex-col justify-center gap-0 bg-[rgb(0,72,56)] px-4 py-3">
                <h3 className="text-lg font-semibold tracking-normal text-stone-50">
                  {investor.name}
                </h3>
                <p className="text-sm text-stone-300">{investor.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20 mt-8 flex justify-center space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`rounded-full border-[1px] border-siteGreen p-2 text-lg font-thin text-siteGreen transition-all duration-300 ease-in-out hover:scale-125 ${
            currentIndex === 0 ? "cursor-not-allowed opacity-20" : ""
          }`}
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className={`rounded-full border-[1px] border-siteGreen p-2 text-lg font-thin text-siteGreen transition-all duration-300 ease-in-out hover:scale-125 ${
            currentIndex >= maxIndex ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}

export default InvestorsCarousel;
