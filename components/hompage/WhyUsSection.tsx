function WhyUsSection() {
  return (
    <div className="relative flex h-full w-full bg-siteGreen py-[100px] after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:bg-[url('/assets/why-us-img.webp')] after:bg-center lg:after:w-1/3 xl:after:w-1/2">
      <div className="mx-auto flex w-full flex-col items-center justify-between gap-24 px-6 md:container lg:flex-row">
        <div className="flex w-full flex-col items-start gap-10 lg:w-2/3 xl:w-1/2">
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Why Choose{" "}
            <span className="font-syne italic text-siteOrange">Us</span>
          </h2>
          <div className="flex flex-col gap-5 pr-0 lg:pr-40">
            <div className="mb-11 flex flex-col gap-3 border-b border-white/30 pb-11 last:mb-0 last:border-b-0 last:pb-0">
              <span className="w-max rounded bg-siteOrange/30 px-4 py-1 font-semibold uppercase text-siteOrange">
                ⁠Expertise and Innovation
              </span>
              <p className="text-lg text-white">
                Leverage the knowledge of seasoned financial experts combined
                with cutting-edge AI technology for personalized insights,
                strategic management, and optimized returns.
              </p>
            </div>
            <div className="mb-11 flex flex-col gap-3 border-b border-white/30 pb-11 last:mb-0 last:border-b-0 last:pb-0">
              <span className="w-max rounded bg-siteOrange/30 px-4 py-1 font-semibold uppercase text-siteOrange">
                ⁠Diverse and Accessible Options
              </span>
              <p className="text-lg text-white">
                Explore a wide range of investment opportunities tailored to
                your goals, with affordable entry points for both beginners and
                experienced investors.
              </p>
            </div>
            <div className="mb-11 flex flex-col gap-3 border-b border-white/30 pb-11 last:mb-0 last:border-b-0 last:pb-0">
              <span className="w-max rounded bg-siteOrange/30 px-4 py-1 font-semibold uppercase text-siteOrange">
                ⁠Transparency and Security
              </span>
              <p className="text-lg text-white">
                Enjoy peace of mind with clear fee structures, open
                communication, and top-tier security measures to protect your
                investments and data.
              </p>
            </div>
            <div className="mb-11 flex flex-col gap-3 border-b border-white/30 pb-11 last:mb-0 last:border-b-0 last:pb-0">
              <span className="w-max rounded bg-siteOrange/30 px-4 py-1 font-semibold uppercase text-siteOrange">
                Dedicated Support
              </span>
              <p className="text-lg text-white">
                Access 24/7 customer service and educational resources,
                empowering you to make informed decisions and achieve long-term
                financial success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyUsSection;
