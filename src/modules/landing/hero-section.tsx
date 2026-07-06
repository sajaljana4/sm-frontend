import { landingHeader } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#1E1B16]">
      <style>{`
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {/* Background image with slow zoom */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={landingHeader}
          alt="Hero section background"
          className="hero-kenburns h-full w-full object-cover"
          priority
          fill
        />
        {/* Improved gradient overlay - less opaque to show image better */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1B16]/75 via-[#1E1B16]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B16]/60 via-transparent to-transparent" />
      </div>

      {/* Floating decorative petals */}
      {/* <Image
        src={decorativeLeaf}
        alt=""
        aria-hidden
        className="hero-float-1 absolute top-12 right-[5%] w-16 opacity-60 hidden md:block"
      />
      <Image
        src={decorativeLeaf}
        alt=""
        aria-hidden
        className="hero-float-2 absolute bottom-24 left-[3%] w-12 opacity-50 hidden md:block"
      /> */}

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-30 xl:px-4">
        {/* Main Content Grid */}
        <div className="flex flex-col items-center justify-center">
          {/* Text Content - Centered */}
          <div className="flex flex-col justify-center text-center text-white max-w-3xl">
            <p className="hero-fade-1 font-serif italic text-lg md:text-xl text-[#F1DCC9] tracking-wide text-shadow-lg">
              Marriages are made in Heaven
            </p>

            <h1 className="hero-fade-2 mt-3 font-serif text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              We make the{" "}
              <span className="bg-gradient-to-r from-[#C9962C] to-[#E8B366] bg-clip-text text-transparent">
                right pairs
              </span>{" "}
              meet at the <span className="text-[#C9962C]">right time</span>
            </h1>

            <div className="hero-fade-3 hero-shimmer mt-4 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#C9962C] to-transparent" />

            <p className="hero-fade-4 mt-4 max-w-3xl mx-auto text-md text-[#D4C4B0] leading-relaxed text-shadow-lg">
              Join thousands of happy couples who found their perfect match
              through our trusted platform. With 15+ years of experience and
              verified profiles, we are here to make your journey to lasting love
              meaningful, secure, and successful.
            </p>

            <Button size="lg" className="hero-fade-4 group relative mt-6 mx-auto inline-flex w-fit overflow-hidden rounded-full bg-gradient-to-r from-[#9d0039] to-[#E32C6F] px-12 py-6 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer">
              <span className="relative z-10 flex items-center gap-2">
                GET STARTED
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#C9962C] to-[#E8B366] transition-transform duration-500 group-hover:translate-x-0" />
            </Button>
          </div>
        </div>

        {/* Horizontal Stats Bar */}
        <div className="hero-fade-5 mt-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {[
            { number: "12,000+", label: "Verified Profiles", icon: "✓" },
            { number: "8,500+", label: "Success Stories", icon: "💕" },
            { number: "15+ Years", label: "Of Trust", icon: "🏆" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-1 md:flex-none md:w-1/3 items-center justify-center px-3 py-3 md:py-6 group relative"
            >
              {/* Divider line between items (hidden on mobile and after last item) */}
              {idx < 2 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gradient-to-b from-transparent via-[#C9962C]/40 to-transparent" />
              )}

              <div className="text-center">
                <span className="text-3xl md:text-4xl block mb-1.5 transition-transform duration-300 group-hover:scale-110">
                  {stat.icon === "✓" ? (
                    <svg
                      className="inline-block w-8 h-8 md:w-10 md:h-10 text-white animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    stat.icon
                  )}
                </span>
                <p 
                  className="font-serif text-xl md:text-2xl font-bold text-[#E8B366] leading-tight mb-0.5"
                  style={{
                    animation: `countUp 0.6s ease-out ${idx * 0.15}s both`,
                  }}
                >
                  {stat.number}
                </p>
                <p className="text-xs uppercase tracking-widest text-[#D4C4B0] font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9962C] to-transparent" />

      {/* Signature: interlocking rings — the union motif */}
      <svg
        className="absolute -bottom-6 left-1/2 z-10 -translate-x-1/2 hidden md:block"
        width="96"
        height="56"
        viewBox="0 0 96 56"
        fill="none"
        aria-hidden
      >
        <circle
          className="ring-a"
          cx="36"
          cy="28"
          r="24"
          stroke="#C9962C"
          strokeWidth="3"
        />
        <circle
          className="ring-b"
          cx="60"
          cy="28"
          r="24"
          stroke="#B3243A"
          strokeWidth="3"
        />
      </svg>
    </section>
  );
}

export default HeroSection;
