import { CarouselItem } from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";

import {
  BiArrowBack,
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiSolidQuoteRight,
  BiSolidStar,
} from "react-icons/bi";

type TestimonialCardProps = {
  testimonial: {
    name: string;
    position: string;
    testimonial: string;
  };
};

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { name, position, testimonial: testimony } = testimonial;
  return (
    <CarouselItem className="lg:basis-1/2 xl:basis-1/3">
      <div className="relative flex min-h-[350px] w-full flex-col items-start gap-4 rounded-2xl bg-siteGreen/10 p-6">
        <div className="flex items-center gap-2 text-2xl text-yellow-500">
          <BiSolidStar />
          <BiSolidStar />
          <BiSolidStar />
          <BiSolidStar />
          <BiSolidStar />
        </div>
        <p className="text-[ #6E7676] font-archivo text-[18px] font-medium">
          {testimony}
        </p>
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">{name}</span>
          <span className="text-md text-siteText">{position}</span>
        </div>
        <span className="absolute bottom-0 right-0 text-[100px] font-bold text-white">
          <BiSolidQuoteRight />
        </span>
      </div>
    </CarouselItem>
  );
}

export default TestimonialCard;
