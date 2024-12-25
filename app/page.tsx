import HeroSection from "@/components/hompage/HeroSection";
import InvestorstAndPartners from "@/components/hompage/InvestorstAndPartners";
import CustomButton from "@/components/ui/CustomButton";
import Image from "next/image";
import { CgArrowRight } from "react-icons/cg";

import { motion } from "framer-motion";
import BuildPortfolioSect from "@/components/hompage/BuildPortfolioSect";
import OurNumberSection from "@/components/hompage/OurNumberSection";
import PackagePricing from "@/components/hompage/PackagePricing";
import FiveMinsSection from "@/components/hompage/FiveMinsSection";

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
    </main>
  );
}

export default LandingPage;
