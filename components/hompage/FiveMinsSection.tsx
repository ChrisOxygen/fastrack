import Image from "next/image";
import CustomButton from "../ui/CustomButton";

function FiveMinsSection() {
  return (
    <div className="relative flex w-full bg-gray-50 py-[100px]">
      <div className="mx-auto flex w-full flex-col items-center justify-between gap-24 px-6 md:container lg:flex-row">
        <div className="hidden place-items-center lg:grid">
          <Image
            className="max-w-[500px]"
            src="/assets/fastrack-full-img.webp"
            alt="star"
            width={800}
            height={1615}
          />
        </div>
        <div className="flex flex-col gap-20">
          <h3 className="text-6xl font-bold text-siteGreen">
            It takes 5 minutes
          </h3>
          <div className="flex flex-col gap-10">
            <div className="relative flex items-start gap-16 after:absolute after:bottom-[-33px] after:left-[20px] after:h-3/4 after:w-1 after:bg-siteOrange after:content-['']">
              <span className="text-4xl font-bold text-siteOrange">01</span>
              <div className="flex flex-col gap-5">
                <h4 className="text-4xl font-bold">Sign up, Its free</h4>
                <p className="text-xl text-siteText">
                  Sign up and login to your dashbord to make an investment Sign
                  up and login to your dashbord to make an investment
                </p>
              </div>
            </div>
            <div className="relative flex items-start gap-16 after:absolute after:bottom-[-33px] after:left-[20px] after:h-3/4 after:w-1 after:bg-siteOrange after:content-['']">
              <span className="text-4xl font-bold text-siteOrange">02</span>
              <div className="flex flex-col gap-5">
                <h4 className="text-4xl font-bold">
                  2. Find best investment package
                </h4>
                <p className="text-xl text-siteText">
                  Sign up for an account with your name, email and phone number.
                </p>
              </div>
            </div>
            <div className="relative flex items-start gap-16">
              <span className="text-4xl font-bold text-siteOrange">03</span>
              <div className="flex flex-col gap-5">
                <h4 className="text-4xl font-bold">
                  3. Start earning on investments
                </h4>
                <p className="text-xl text-siteText">
                  Sign up for an account with your name, email and phone number.
                </p>
              </div>
            </div>

            <CustomButton
              text="Get Started Today"
              bgColor="green"
              hoverBgColor="orange"
              textColor="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiveMinsSection;
