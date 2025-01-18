import { TEAM_MEMBERS } from "@/constants";
import Image from "next/image";

function TeamMembers() {
  return (
    <div className="bg-[#EDF5F4] px-6 py-16 sm:py-24">
      <div className="mb-10 flex flex-col items-start space-y-2 text-start md:mb-16 md:items-center md:text-center">
        <h5 className="text-[12px] font-light uppercase tracking-wider text-siteOrange md:text-sm">
          Our Team Experts
        </h5>
        <h3 className="font-wix w-full text-3xl font-semibold sm:w-[75%] md:w-1/2 md:text-4xl">
          Meet the Our Experts Behind Your Financial Growth
        </h3>
      </div>
      <div className="flex flex-col gap-12 sm:flex sm:flex-row sm:flex-wrap sm:justify-center md:gap-x-6 md:gap-y-16">
        {TEAM_MEMBERS.map((member, i) => (
          <div
            key={i}
            className="relative space-y-5 rounded-2xl bg-white p-3 sm:w-[45%] md:w-[30%] lg:w-[22%]"
          >
            <div className="relative z-10 -mb-14">
              <Image
                src={member.img}
                alt={member.name}
                className="h-full w-full rounded-xl object-cover sm:h-[340px]"
                width={500}
                height={500}
              />
            </div>

            <div className="relative z-30 w-11/12 space-y-1 rounded-tr-xl bg-white py-3 pb-4 pl-8">
              <h3 className="text-xl font-bold tracking-wide text-stone-800">
                {member.name}
              </h3>
              <h5 className="text-[15px] font-medium tracking-wider text-siteOrange">
                {member.role}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamMembers;
