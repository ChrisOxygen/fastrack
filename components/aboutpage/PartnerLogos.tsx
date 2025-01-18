import { PARTENER_LOGOS } from "@/constants";
import Image from "next/image";

function PartnerLogos() {
  return (
    <div className="my-12 flex w-full overflow-hidden py-4">
      <div className="animate-scroll flex">
        {/* Duplicate logos to create seamless infinite scroll */}
        {[...PARTENER_LOGOS, ...PARTENER_LOGOS].map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt={`Partner logo ${index}`}
            className="mx-4 h-24 w-auto rounded-xl bg-gray-100 px-14 py-8"
            width={500}
            height={500}
          />
        ))}
      </div>
    </div>
  );
}

export default PartnerLogos;
