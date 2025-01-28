import AboutHeader from "@/components/aboutpage/AboutHeader";
import AboutHero from "@/components/aboutpage/AboutHero";
import InvestorsCarousel from "@/components/aboutpage/InvestorsCarousel";
import TeamMembers from "@/components/aboutpage/TeamMembers";
import TestimonialSect from "@/components/aboutpage/TestimonialSect";
import React from "react";

function AboutPage() {
  return (
    <div className="w-screen">
      {/* <AboutHeader /> */}
      <AboutHero />

      <TeamMembers />

      <InvestorsCarousel />

      <TestimonialSect />
    </div>
  );
}

export default AboutPage;
