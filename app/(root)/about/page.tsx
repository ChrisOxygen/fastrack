import AboutHeader from "@/components/aboutpage/AboutHeader";
import AboutHero from "@/components/aboutpage/AboutHero";
import InvestorsCarousel from "@/components/aboutpage/InvestorsCarousel";
import PartnerLogos from "@/components/aboutpage/PartnerLogos";
import TeamMembers from "@/components/aboutpage/TeamMembers";
import React from "react";

function AboutPage() {
  return (
    <div className="w-screen">
      {/* <AboutHeader /> */}
      <AboutHero />

      <TeamMembers />

      <InvestorsCarousel />

      <PartnerLogos />
    </div>
  );
}

export default AboutPage;
