import HeroSection from "@/components/hompage/HeroSection";
import InvestorstAndPartners from "@/components/hompage/InvestorstAndPartners";

import BuildPortfolioSect from "@/components/hompage/BuildPortfolioSect";
import OurNumberSection from "@/components/hompage/OurNumberSection";
import PackagePricing from "@/components/hompage/PackagePricing";
import FiveMinsSection from "@/components/hompage/FiveMinsSection";
import WhyUsSection from "@/components/hompage/WhyUsSection";
import TestimonialSect from "@/components/hompage/TestimonialSect";
import CtaFooter from "@/components/CtaFooter";

function LandingPage() {
  console.log("LandingPage");
  return (
    <div className="flex w-full flex-col">
      <HeroSection />
      <InvestorstAndPartners />
      <BuildPortfolioSect />
      <OurNumberSection />
      <PackagePricing />
      <FiveMinsSection />
      <WhyUsSection />
      <TestimonialSect />
    </div>
  );
}

export default LandingPage;
