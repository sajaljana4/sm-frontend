import { sample1, sample2 } from "@/assets";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

function JourneySectionForDesktop() {
  return (
    <div className="relative w-full pt-6">
      {/* Cream backdrop - back most layer */}
      <div className="absolute right-0 top-0 w-[62%] h-[74%] bg-gradient-to-tl from-[#FFF5D3] to-white -z-20 rounded-sm" />

      {/* Pink outline box - frames the image2 + button area */}
      

      <section className="base-section max-w-7xl relative grid grid-cols-2 gap-4 pt-16 pb-16">
        <div className="absolute right-[2%] top-[50%] w-[80%] h-[32%] border-[6px] border-[#F4C6CE] -z-10 rounded-sm" />
        {/* Left Section: image sits higher, button trails below-right of it */}
        <div className="relative space-y-7 w-full">
          <div className="bg-white w-[95%] aspect-square shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15)] overflow-hidden p-3 rounded-sm">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={sample1}
                fill
                alt="Wedding ceremony hands with bangles"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Section: text on top, image staggered lower to overlap pink box */}
        <div className="w-full space-y-3 pt-2">
          <span className="inline-block font-serif italic text-lg md:text-xl text-[#B3243A] tracking-wide">
            Begin Your Story
          </span>
          <p className="text-2xl md:text-3xl font-serif font-bold text-[#1E1B16] mb-4">
            Start your journey to find your Soulmate with us and enjoy{" "}
            <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#9d0039] to-[#9d0039] bg-clip-text text-transparent">Lifetime of Companionship</span>
          </p>

          <p className="text-sm lg:text-base text-gray-600 leading-relaxed max-w-md">
            If you are thinking of getting married, then this is the right time.
            Find your true match in the Santhali Community with us and
            experience the bliss of love filled marital relationship.
          </p>
          <div className="flex pr-6 mt-4 lg:mt-6">
            <Button
              size="lg"
              className="cursor-pointer group bg-[#98BA42] hover:bg-[#a8c857] text-white px-8 py-6 text-sm font-semibold tracking-wider rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              REGISTER NOW
              <ArrowRight
                size={16}
                className="ml-1 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </div>

          <div className="bg-white w-[80%] aspect-square shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15)] overflow-hidden p-3 rounded-sm mt-10 lg:mt-14">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={sample2}
                fill
                alt="Couple in traditional wedding attire"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JourneySectionForDesktop;
