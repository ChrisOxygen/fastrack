import { PARTENER_LOGOS } from "@/constants";
import Image from "next/image";

function PartnerLogos() {
  return (
    <div className="my-12 flex w-full overflow-hidden bg-siteGreen py-[60px] md:py-[100px]">
      <div className="animate-scroll flex w-full px-10">
        {/* Duplicate logos to create seamless infinite scroll */}
        {[...PARTENER_LOGOS, ...PARTENER_LOGOS].map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt={`Partner logo ${index}`}
            className="mx-8 h-32 w-auto rounded-xl px-4 py-4 opacity-50 brightness-0 invert transition-all hover:opacity-100"
            width={152}
            height={36}
          />
        ))}
      </div>
    </div>
  );
}

export default PartnerLogos;
