import Image from "next/image";

function OurNumberSection() {
  return (
    <div
      className="block overflow-x-hidden bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: "url('/assets/portfolioBg.webp')",
      }}
    >
      <div className="relative grid w-full place-items-center bg-white/80 py-[100px] backdrop-blur-3xl">
        <div className="mx-auto flex w-full flex-col items-center gap-10 px-6 md:container lg:gap-20">
          <h2 className="text-center text-3xl font-bold md:text-5xl">
            See our <br className="md:hidden" />
            <span className="font-syne italic text-siteGreen">numbers</span>
          </h2>
          <div className="flex w-full flex-col items-center justify-between gap-10 lg:flex-row lg:gap-20">
            <div className="flex flex-col items-center gap-1 md:gap-3">
              <span className="font-syne text-4xl font-medium md:text-6xl">
                600k +
              </span>
              <span className="text-2xl text-siteGreen md:text-3xl">Users</span>
            </div>
            <div className="flex flex-col items-center gap-1 md:gap-3">
              <span className="font-syne text-4xl font-medium md:text-6xl">
                $42m +
              </span>
              <span className="text-2xl text-siteGreen md:text-3xl">
                Paid out to users
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 md:gap-3">
              <div className="flex items-center gap-2">
                <span className="block font-syne text-4xl font-medium leading-none md:text-6xl">
                  530 +
                </span>
                <div className="grid place-items-center">
                  {/* <Image
                    className="w-[130px] lg:w-[150px]"
                    src="/assets/countries.webp"
                    alt="star"
                    width={170}
                    height={67}
                  /> */}
                </div>
              </div>
              <span className="text-2xl text-siteGreen md:text-3xl">
                Paid out to users
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurNumberSection;
