import { sample1, sample2 } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function JourneySectionForMobile() {
  return (
    <section className="base-section pt-0 flex flex-col gap-6 items-center relative">
      <div className="absolute top-10 left-0 w-full h-full bg-linear-to-b from-[#FFF5D3] via-[#EBEBEB] to-white -z-1 " />
      <Image
        src={sample1}
        width={1024}
        height={1024}
        alt="sample1"
        className="aspect-square px-4"
      />
      <p className="text-center text-[20px] font-medium">
        Start your journey to find your Soulmate with us and enjoy
        <br />
        <span className="font-bold">Lifetime of Companionship</span>
      </p>
      <div className="flex flex-col gap-4 items-center bg-[#FFE9D6] p-4 pb-120 rounded-xl">
        <p className="text-center">
          If you are thinking of getting married, then this is the right time.
          Find your true match in the Santhali Community with us and experience
          the bliss of love filled marital relationship.
        </p>
        <Button size={"lg"} className="bg-[#0688A2] text-white px-4">
          REGISTER NOW
        </Button>
      </div>

      <div className="relative w-full -mt-120">
        <div className="w-full aspect-square border-14 border-[#f9367d] opacity-25 rounded-2xl" />
        <Image
          src={sample2}
          width={1024}
          height={1024}
          alt="sample image"
          className="w-full aspect-square object-cover absolute top-10 px-10"
        />
      </div>
    </section>
  );
}

export default JourneySectionForMobile;
