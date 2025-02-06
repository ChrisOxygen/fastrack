"use client";

import { use, useEffect, useState } from "react";

import { AUTH_SLIDE_ITEMS } from "@/constants";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";

function AuthSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      setApi={setApi}
      opts={{
        loop: true,
      }}
      className="mb-7 flex w-full flex-col items-center gap-8"
    >
      <CarouselContent className="">
        {AUTH_SLIDE_ITEMS.map((slideText, index) => (
          <CarouselItem
            key={index}
            className="flex w-full grow items-center justify-center"
          >
            <h3 className="max-w-[550px] text-center text-3xl md:text-5xl">
              {slideText}
            </h3>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
  <CarouselNext /> */}
      <div className="flex w-full max-w-[300px] items-center gap-4">
        {AUTH_SLIDE_ITEMS.map((slideText, index) => {
          return (
            <span
              key={index}
              className={clsx(
                "h-2 basis-1/3 rounded-xl",
                current === index + 1 ? "bg-white" : "bg-white/50",
              )}
            ></span>
          );
        })}
      </div>
    </Carousel>
  );
}

export default AuthSlider;
