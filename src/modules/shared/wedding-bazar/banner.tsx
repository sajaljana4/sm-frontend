import { Button } from "@/components/ui/button";
import { uuid } from "@/utils/uuid";
import { Camera, Martini, ShieldCheck, Store, ArrowRight } from "lucide-react";

const backgroundImage =
  "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const features = [
  {
    icon: <Camera strokeWidth={1} color="#fff" size={48} />,
    description:
      "Photographers, Makeup artists, Caterers and more. Hire best vendors!",
  },
  {
    icon: <Martini strokeWidth={1} color="#fff" size={48} />,
    description: "Trusted wedding market place from matrimony.com group",
  },
  {
    icon: <ShieldCheck strokeWidth={1} color="#fff" size={48} />,
    description: "2.8 Lakh+ trusted vendors across 40+ cities",
  },
];

function WeddingBazarBanner() {
  return (
    <div className="">
      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="w-full h-60 md:h-120 bg-cover bg-bottom bg-no-repeat relative mt-30 md:mt-0"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#8F0035]/80 via-[#8F0035]/40 to-transparent" />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex flex-col items-center px-4">
          <div className="bg-white/90 backdrop-blur-md w-fit mx-auto flex items-center justify-center gap-4 p-4 rounded-2xl shadow-xl border border-white/40">
            <div className="bg-gradient-to-br from-[#E32C6F] to-[#B3243A] p-2 rounded-lg shadow-lg">
              <Store color="#fff" size={24} />
            </div>
            <div className="text-nowrap">
              <h6 className="font-serif font-bold text-[#E32C6F] text-lg">
                WeddingBazaar
              </h6>
              <p className="text-sm text-gray-700">
                Only in{" "}
                <span className="font-bold text-[#1E1B16]">
                  www.raibar.co.in
                </span>
              </p>
            </div>
          </div>
          <p className="hidden lg:block text-white text-2xl md:text-3xl font-serif font-bold py-6 drop-shadow-lg">
            Our very own Wedding Planning Platform
          </p>
        </div>
      </section>
      <section className="w-full bg-gradient-to-r from-[#8F0035] via-[#A8003F] to-[#8F0035]">
        <div className="base-section">
          <h4 className="text-center font-serif font-bold text-white text-2xl md:text-3xl pt-3 pb-8 w-full lg:hidden mx-auto">
            Our very own Wedding Planning Platform
          </h4>

          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-evenly">
            {features.map((feature, idx) => (
              <div
                key={uuid()}
                className="group flex w-full md:w-90 h-fit md:h-24 justify-center items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-3 rounded-full bg-white/20 group-hover:bg-white/30 transition-all duration-300 flex-shrink-0">
                  {feature.icon}
                </div>
                <p className="text-white text-sm md:text-base leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              size="lg"
              className="hero-fade-4 group relative mt-6 mx-auto inline-flex w-fit overflow-hidden rounded-full bg-gradient-to-r from-[#98BA42] to-[#98BA42] px-12 py-6 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore WeddingBazaar
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#C9962C] to-[#E8B366] transition-transform duration-500 group-hover:translate-x-0" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WeddingBazarBanner;
