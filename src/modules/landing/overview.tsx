import { uuid } from "@/utils/uuid";
import { Gem, Rocket, User, UserRoundPen } from "lucide-react";
import { decorativeLeaf } from "@/assets";
import Image from "next/image";

const overviewOptions = [
  {
    icon: <User color="#FFFFFF" size={20} strokeWidth={1.5} />,
    startingColor: "#98BA42",
    endingColor: "#B8D968",
    step: "01",
    label: "Create your Profile",
    description:
      "Increase your visibility in Santhali Community and get more matches by creating a detailed profile.",
  },
  {
    icon: <UserRoundPen color="#FFFFFF" size={20} strokeWidth={1.5} />,
    startingColor: "#B3243A",
    endingColor: "#D4436A",
    step: "02",
    label: "Activate Your Profile",
    description:
      "Make your profile more trustworthy and approachable in Santhali Matrimony community by attaching a photo ID.",
  },
  {
    icon: <Rocket color="#FFFFFF" size={20} strokeWidth={1.5} />,
    startingColor: "#98BA42",
    endingColor: "#A8C857",
    step: "03",
    label: "Get Connected",
    description:
      "After streamlining your chosen in Santhali Community, connect with them.",
  },
  {
    icon: <Gem color="#FFFFFF" size={20} strokeWidth={1.5} />,
    startingColor: "#B3243A",
    endingColor: "#C72350",
    step: "04",
    label: "Meet & Marry",
    description:
      "Interact with your chosen matches and meet to find if you have found your Soulmate.",
  },
];

function Overview() {
  return (
    <section className="relative overflow-hidden py-6 md:py-10 bg-linear-to-b from-[#98BA4214] to-[#FFFFFF]">
      {/* Ambient glow accents */}
      <div className="absolute top-0 left-0 w-56 h-56 rounded-full bg-[#98BA42]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-[#B3243A]/10 blur-3xl" />

      {/* Floating decorative petal */}
      <Image
        src={decorativeLeaf}
        alt=""
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-12 opacity-60 hidden md:block"
      />

      <div className="base-section relative z-10">
        <div className="space-y-2 text-center w-full lg:w-1/2 mx-auto">
          <p className="font-serif italic text-lg md:text-xl text-[#B3243A] tracking-wide">
            Let us join hands to
          </p>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1E1B16]">
            Find Your Soul Mate for Life
          </h3>
          <div className="mx-auto h-[2px] w-16 bg-gradient-to-r from-transparent via-[#98BA42] to-transparent" />
        </div>

        <div className="relative mt-10">
          {/* Connecting line across steps (desktop only) */}
          <div className="hidden lg:block absolute top-[38px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#98BA42]/30 via-[#B3243A]/30 to-[#98BA42]/30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewOptions.map((item) => (
              <div
                key={uuid()}
                className="group relative flex flex-col items-center text-center bg-white/80 backdrop-blur-sm rounded-3xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-5 py-6"
              >
                <span
                  style={{ color: item.startingColor }}
                  className="absolute top-3 right-4 text-2xl font-serif font-bold opacity-10 group-hover:opacity-20 transition-opacity"
                >
                  {item.step}
                </span>

                <div
                  style={{
                    background: `linear-gradient(135deg, ${item.startingColor}, ${item.endingColor})`,
                  }}
                  className="relative overflow-hidden rounded-2xl w-12 aspect-square flex items-center justify-center shadow-lg ring-4 ring-white group-hover:scale-105 transition-transform duration-300"
                >
                  <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-white/40 blur-md" />
                  <span className="absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-transparent" />
                  <span className="relative z-10">{item.icon}</span>
                </div>

                <h4 className="mt-4 font-serif text-lg md:text-xl font-semibold text-[#1E1B16]">
                  {item.label}
                </h4>
                <p className="mt-1.5 text-sm text-[#1E1B16]/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Overview;