import { packageSectionBackground } from "@/assets";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Heart, Check } from "lucide-react";

function PackageSectionForLanding() {
  return (
    <div
      className="relative w-full py-12 md:py-16 bg-center bg-cover bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${packageSectionBackground.src})`,
      }}
    >
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E1B16]/80 via-[#2a2620]/75 to-[#1E1B16]/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#B3243A]/20 to-[#98BA42]/15" />

      {/* Animated decorative elements */}
      <div className="absolute top-10 left-5 md:left-20 w-40 h-40 rounded-full bg-gradient-to-br from-[#98BA42] to-transparent blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-10 right-5 md:right-20 w-48 h-48 rounded-full bg-gradient-to-tl from-[#B3243A] to-transparent blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-r from-[#98BA42]/10 to-[#B3243A]/10 blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="base-section relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#98BA42]/40 bg-[#98BA42]/10 px-3.5 py-1.5">
              <Sparkles size={14} className="text-[#98BA42]" />
              <span className="text-xs md:text-sm font-serif italic text-[#B7D67A] tracking-wide">
                Custom Solutions
              </span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
              Didn&apos;t Find Your{" "}
              <span className="bg-gradient-to-r from-[#98BA42] to-[#C9302E] bg-clip-text text-transparent">
                Perfect Package?
              </span>
            </h2>

            <p className="text-sm md:text-base text-[#D4C4B0] leading-relaxed">
              We understand every love story is unique. Let us create a
              customized membership plan tailored to your needs.
            </p>

            {/* Quick Benefits */}
            <div className="space-y-3 pt-2">
              {[
                "Verified & Authentic Profiles",
                "Flexible Payment Options",
                "Lifetime Support",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 group/item">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#98BA42]/15 group-hover/item:bg-[#98BA42]/25 transition-colors">
                    <Check
                      className="w-3.5 h-3.5 text-[#98BA42]"
                      strokeWidth={3}
                    />
                  </span>
                  <span className="text-sm text-[#D4C4B0]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#98BA42] via-[#B3243A] to-[#98BA42] rounded-xl blur-lg opacity-25 group-hover:opacity-45 transition-opacity duration-300 animate-pulse" />

            <div className="relative bg-gradient-to-br from-[#1E1B16] to-[#2a2620] rounded-xl p-6 md:p-8 border border-white/10 group-hover:border-[#98BA42]/50 shadow-xl group-hover:shadow-2xl group-hover:shadow-[#98BA42]/10 transition-all duration-300">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#98BA42]/20 to-[#B3243A]/20 mb-4">
                <Heart className="w-7 h-7 text-[#C9302E] group-hover:scale-110 transition-transform" />
              </span>

              <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-serif">
                Let Us Create Your Perfect Plan
              </h3>

              <p className="text-xs md:text-sm text-[#D4C4B0] mb-6 leading-relaxed">
                Tell us your requirements and we&apos;ll design the ideal plan
                for your journey.
              </p>

              <Button
                size="lg"
                className="max-w-[300px] group/btn relative overflow-hidden rounded-full bg-gradient-to-r from-[#B3243A] to-[#C9302E] px-6 py-4 cursor-pointer font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-[#C9302E]/30 transition-all duration-300 text-sm"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  REQUEST CUSTOM PRICE
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover/btn:translate-x-0.5"
                  />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#98BA42] to-[#B7D67A] transition-transform duration-500 group-hover/btn:translate-x-0" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageSectionForLanding;