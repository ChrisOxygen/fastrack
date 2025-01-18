import { VscWorkspaceTrusted } from "react-icons/vsc";
import { LuTrophy } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import Image from "next/image";
import CustomButton from "../ui/CustomButton";

function AboutHero() {
  return (
    <section className="mt-[90px] w-screen border-t">
      <div className="flex flex-col gap-8 px-6 py-24 sm:py-24 md:gap-12 lg:flex-row lg:px-16">
        <div className="flex w-full flex-col justify-center gap-3 overflow-hidden rounded-2xl bg-cover bg-center sm:h-[40rem] lg:w-[50%]">
          <div
            className="h-96 w-full bg-cover bg-center md:h-2/3"
            style={{
              backgroundImage: 'url("/assets/fastrack-about-11.webp")',
            }}
          ></div>
          <div className="hidden flex-row gap-3 md:flex md:h-1/3">
            <Image
              src="/assets/fastrack-about-11.webp"
              alt=""
              className="w-1/2 object-cover"
              width={1000}
              height={1000}
            />
            <Image
              src="/assets/fastrack-about-11.webp"
              alt=""
              className="w-1/2 object-cover"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-start justify-start space-y-2 text-start md:justify-center lg:w-[50%]">
          <h5 className="text-[12px] font-light uppercase tracking-widest text-siteOrange md:text-sm">
            ABOUT OUR COMPANY
          </h5>
          <h3 className="font-wix w-full text-3xl font-semibold sm:w-[75%] md:w-1/2 md:text-4xl lg:w-full">
            We Dont Make Deals, We Make Commitments.
          </h3>
          <p className="py-6 tracking-wider text-stone-500">
            For the past three years, Fast Track investment has established
            itself as a trusted partner in wealth management. Clients place
            their capital with us to receive consistent, structured returns,
            disbursed on a weekly or monthly basis. Our team of seasoned
            professionals manages investments with a focus on sustainable growth
            and risk management. With a proven track record of transparent
            operations and reliable income generation, Fast track investment
            provides clients with a secure pathway to financial growth and
            stability. Invest with us and experience a commitment to
            professionalism and performance.
          </p>

          <div className="">
            <ul className="space-y-3">
              <li className="flex flex-row items-center gap-2">
                <BsPeople className="rounded-full border-[1px] border-stone-200 p-3 text-5xl text-siteOrange" />
                <span className="text-[16px] font-semibold">
                  Trusted by thousands
                </span>
              </li>

              <li className="flex flex-row items-center gap-2">
                <LuTrophy className="rounded-full border-[1px] border-stone-200 p-3 text-5xl text-siteOrange" />
                <span className="text-[16px] font-semibold">
                  Certificate awarded
                </span>
              </li>

              <li className="flex flex-row items-center gap-2">
                <VscWorkspaceTrusted className="rounded-full border-[1px] border-stone-200 p-3 text-5xl text-siteOrange" />
                <span className="text-[16px] font-semibold">
                  Secure payment process
                </span>
              </li>
            </ul>
          </div>

          <div className="group">
            <CustomButton
              href="/signup"
              text="Get Started"
              iconPosition="left"
              bgColor="green"
              hoverBgColor="orange"
              textColor="white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
