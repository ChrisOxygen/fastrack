import HeroSection from "@/components/hompage/HeroSection";
// import InvestorstAndPartners from "@/components/hompage/InvestorstAndPartners";

import BuildPortfolioSect from "@/components/hompage/BuildPortfolioSect";
import OurNumberSection from "@/components/hompage/OurNumberSection";
import PackagePricing from "@/components/hompage/PackagePricing";
import FiveMinsSection from "@/components/hompage/FiveMinsSection";
import WhyUsSection from "@/components/hompage/WhyUsSection";
import TestimonialSect from "@/components/hompage/TestimonialSect";
import CtaFooter from "@/components/CtaFooter";
import HeaderScroll from "@/components/HeaderScroll";
import PartnerLogos from "@/components/hompage/PartnerLogos";

function LandingPage() {
  console.log("LandingPage");
  return (
    <div className="flex w-full flex-col">
      <HeroSection />
      <HeaderScroll />
      <PartnerLogos />
      {/* <InvestorstAndPartners /> */}
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
