import { uuid } from "@/utils/uuid";
import { CircleCheckBig, Sparkles, UserLock } from "lucide-react";
import Image from "next/image";

const image1 =
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const image2 =
  "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const features = [
  {
    title: "100% Verified Profiles",
    description:
      "Every application is manually reviewed by our concierge team to ensure authenticity.",
    icon: <CircleCheckBig color="#FFFFFF" size={20} />,
  },
  {
    title: "Privacy First Philosophy",
    description:
      "Your data and photographs are never shared or indeed. You control who sees your story..",
    icon: <UserLock color="#FFFFFF" size={20} />,
  },
  {
    title: "Premium Community",
    description:
      "Join a focused circle of individuals who are ready for marriage and meaningful commitment.",
    icon: <Sparkles color="#FFFFFF" size={20} />,
  },
];

function TrustSectionForLanding() {
  return (
    <>
      <div className="base-section mt-12">
        <div className="space-y-4 text-center ">
          <p className="font-serif italic text-lg md:text-xl text-[#B3243A] tracking-wide">
            Secured & Verified
          </p>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1E1B16]">
            Built on Trust, Guarded with Care
          </h3>
          <div className="mx-auto h-[2px] w-16 bg-gradient-to-r from-transparent via-[#C9962C] to-transparent" />
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-light">
            We understand that finding a life partner requires more than an
            algorithm. It requires a sanctuary where security and privacy are
            paramount.
          </p>
        </div>
      </div>

      <section className="base-section relative pb-24">
        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {/* Features Card */}
          <div className="bg-gradient-to-br from-[#E8476B] to-[#B3243A] rounded-3xl p-8 shadow-xl space-y-6">
            {features.map((feature) => (
              <div key={uuid()} className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-white/40 flex-shrink-0 flex items-center justify-center w-12 h-12">
                  {feature.icon}
                </div>
                <div className="flex flex-col gap-1 text-white flex-grow">
                  <h4 className="font-semibold text-base">{feature.title}</h4>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="relative w-full max-w-sm mx-auto">
            <div className="absolute inset-0 border-6 border-[#E8476B] rounded-2xl -z-10" />
            <Image
              src={image1}
              alt="trust and security"
              width={320}
              height={320}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Desktop Layout - Images, Card, Images */}
        <div className="hidden md:grid md:grid-cols-12 gap-0 items-center relative">
          {/* Left Image */}
          <div className="col-span-3 flex justify-end pr-6">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 border-[6px] border-[#E8476B] rounded-2xl z-20 -rotate-3" />
              <Image
                src={image1}
                alt="verified profiles"
                width={176}
                height={224}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Center Features Card */}
          <div className="col-span-6 bg-gradient-to-br from-[#E8476B] to-[#B3243A] rounded-3xl p-10 shadow-2xl z-10">
            <div className="space-y-6">
              {features.map((feature) => (
                <div key={uuid()} className="flex gap-4">
                  <div className="p-2 rounded-full bg-white/40 flex-shrink-0 flex items-center justify-center w-10 h-10">
                    {feature.icon}
                  </div>
                  <div className="flex flex-col gap-2 text-white">
                    <h4 className="font-serif font-bold text-lg leading-tight">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-white/90 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="col-span-3 flex justify-start pl-6">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 border-[6px] border-[#E8476B] rounded-2xl z-20 rotate-3" />
              <Image
                src={image2}
                alt="privacy protected"
                width={176}
                height={224}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TrustSectionForLanding;
