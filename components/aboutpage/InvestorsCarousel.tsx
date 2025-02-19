"use client";

import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { INVESTORS } from "@/constants";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <div className="mx-auto flex w-full flex-col items-center justify-between gap-4 px-6 md:container">
      <div className="mb-10 flex flex-col items-start space-y-2 px-6 pt-16 text-start sm:pt-24 md:mb-16 md:items-center md:text-center">
        <h5 className="text-[12px] font-light uppercase tracking-wider text-siteOrange md:text-sm">
          Our Investors
        </h5>
        <h3 className="font-wix w-full text-3xl font-semibold sm:w-[75%] md:w-1/2 md:text-4xl">
          Meet the Investors Behind Your Financial Growth
        </h3>
      </div>

      <div className="flex w-full items-center justify-center">
        <Carousel
          opts={{
            align: "start",
          }}
          className="flex w-full max-w-[1000px] flex-col items-center gap-6"
        >
          <CarouselContent>
            {INVESTORS.map((investor, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div key={index} className="w-full flex-shrink-0">
                  <Image
                    src={investor.img}
                    alt={`Image of ${investor.name}, an ${investor.role}`}
                    className="m-w-[250px] h-[300px] w-full object-cover"
                    width={800}
                    height={800}
                  />

                  <div className="flex flex-col justify-center gap-0 bg-[rgb(0,72,56)] px-4 py-3">
                    <h3 className="text-lg font-semibold tracking-normal text-stone-50">
                      {investor.name}
                    </h3>
                    <p className="font-syne text-[15px] font-medium tracking-wider text-siteOrange">
                      {investor.role}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-10 flex items-center gap-3">
            <CarouselPrevious className="rounded-full border-[1px] border-siteGreen p-8 text-lg font-thin text-siteGreen transition-all duration-300 ease-in-out hover:scale-125" />
            <CarouselNext className="rounded-full border-[1px] border-siteGreen p-8 text-lg font-thin text-siteGreen transition-all duration-300 ease-in-out hover:scale-125" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default InvestorsCarousel;
