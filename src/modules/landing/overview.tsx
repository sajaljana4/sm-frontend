import { uuid } from "@/utils/uuid";
import { Gem, Rocket, User, UserRoundPen } from "lucide-react";
import { decorativeLeaf } from "@/assets";
import Image from "next/image";

const overviewOptions = [
  {
    icon: <User color="#FFFFFF" size={24} strokeWidth={1.5} />,
    startingColor: "#98BA42",
    endingColor: "#B8D968",
    label: "Create your Profile",
    description:
      "Increase your visibility in Santhali Community and get more matches by creating a detailed profile.",
  },
  {
    icon: <UserRoundPen color="#FFFFFF" size={24} strokeWidth={1.5} />,
    startingColor: "#9d0039",
    endingColor: "#D4436A",
    label: "Activate Your Profile",
    description:
      "Make your profile more trustworthy and approachable in Santhali Matrimony community by attaching a photo ID.",
  },
  {
    icon: <Rocket color="#FFFFFF" size={24} strokeWidth={1.5} />,
    startingColor: "#98BA42",
    endingColor: "#A8C857",
    label: "Get Connected",
    description:
      "After streamlining your chosen in Santhali Community, connect with them.",
  },
  {
    icon: <Gem color="#FFFFFF" size={24} strokeWidth={1.5} />,
    startingColor: "#9d0039",
    endingColor: "#C72350",
    label: "Meet & Marry",
    description:
      "Interact with your chosen matches and meet to find if you have found your Soulmate.",
  },
];

function Overview() {
  return (
    <section className="relative overflow-hidden py-6 md:py-10 bg-linear-to-b from-[#ffc1071a] to-[#FFFFFF]">
      {/* Floating decorative petal */}
      <Image
        src={decorativeLeaf}
        alt=""
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-12 opacity-60 hidden md:block"
      />
      
      <div className="base-section">
        <div className="space-y-2 text-center w-full lg:w-1/2 mx-auto">
          <p className="font-serif italic text-lg md:text-xl text-[#B3243A] tracking-wide">
            Let us join hands to
          </p>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1E1B16]">
          Find Your Soul Mate for Life
          </h3>
          <div className="mx-auto h-[2px] w-16 bg-gradient-to-r from-transparent via-[#C9962C] to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {overviewOptions.map((item) => (
            <div
              key={uuid()}
              className="group flex flex-col items-center text-center bg-white/80 backdrop-blur-sm rounded-3xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-5 py-5"
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${item.startingColor}, ${item.endingColor})`,
                }}
                className="relative overflow-hidden rounded-2xl w-16 aspect-square flex items-center justify-center shadow-lg ring-4 ring-white group-hover:scale-105 transition-transform duration-300"
              >
                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-white/40 blur-md" />
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
    </section>
  );
}

export default Overview;