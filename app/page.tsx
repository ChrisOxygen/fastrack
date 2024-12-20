import HeroSection from "@/components/hompage/HeroSection";
import InvestorstAndPartners from "@/components/hompage/InvestorstAndPartners";
import CustomButton from "@/components/ui/CustomButton";
import Image from "next/image";
import { CgArrowRight } from "react-icons/cg";

import { motion } from "framer-motion";
import BuildPortfolioSect from "@/components/hompage/BuildPortfolioSect";

function LandingPage() {
  console.log("LandingPage");
  return (
    <main className="flex w-full flex-col">
      <HeroSection />
      <InvestorstAndPartners />
      <BuildPortfolioSect />
    </main>
  );
}

export default LandingPage;
