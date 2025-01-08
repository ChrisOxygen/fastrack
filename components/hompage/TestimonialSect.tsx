import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { TESTIMONIALS } from "@/constants";

import { Card, CardContent } from "@/components/ui/card";

import { BiArrowBack, BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import TestimonialCard from "../TestimonialCard";

function TestimonialSect() {
  return (
    <div className="relative flex w-full py-[100px]">
      <Carousel className="max-w-screen mx-auto flex w-full flex-col items-start justify-between gap-4 px-6 md:container">
        <span className="rounded bg-siteGreen/5 px-4 py-1 font-semibold uppercase text-siteGreen">
          Testimonials
        </span>
        <div className="flex w-full flex-col justify-between gap-5 lg:flex-row lg:items-center lg:gap-16">
          <h3 className="text-3xl font-bold md:text-5xl">
            Don’t Believe Us? People Talk About It
          </h3>
          <div className="hidden items-center justify-end gap-4 lg:flex">
            <CarouselPrevious className="relative left-0 right-0 grid size-16 transform-none place-items-center rounded-full border border-siteGreen text-3xl text-siteGreen" />
            <CarouselNext className="relative left-0 right-0 grid size-16 transform-none place-items-center rounded-full border border-siteGreen text-3xl text-siteGreen" />
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-start justify-between gap-6 lg:flex-row">
          <CarouselContent className="w-full">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </CarouselContent>
        </div>
        <div className="flex items-center justify-end gap-4 lg:hidden">
          <CarouselPrevious className="relative left-0 right-0 grid size-16 transform-none place-items-center rounded-full border border-siteGreen text-3xl text-siteGreen" />
          <CarouselNext className="relative left-0 right-0 grid size-16 transform-none place-items-center rounded-full border border-siteGreen text-3xl text-siteGreen" />
        </div>
      </Carousel>
    </div>
  );
}

export default TestimonialSect;
