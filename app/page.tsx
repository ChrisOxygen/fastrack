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
    <main className="flex w-full flex-col overflow-x-hidden">
      <HeroSection />
      <InvestorstAndPartners />
      <BuildPortfolioSect />
      <OurNumberSection />
      <PackagePricing />
      <FiveMinsSection />
      <WhyUsSection />
      <TestimonialSect />
      <CtaFooter />
    </main>
  );
}

export default LandingPage;
