import { landingHeader } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#1E1B16]">
      <style>{`
        @keyframes countUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringGlow {
          0%, 100% { filter: drop-shadow(0 0 0 rgba(152,186,66,0)); }
          50%      { filter: drop-shadow(0 0 4px rgba(152,186,66,0.3)); }
        }
        @keyframes drift {
          0%   { transform: translate(0, 0) rotate(0deg); }
          50%  { transform: translate(6px, -8px) rotate(2deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .hero-ring-glow { animation: ringGlow 4s ease-in-out infinite; }
        .hero-corner { animation: drift 9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-ring-glow, .hero-corner, .hero-kenburns, .hero-float-1, .hero-float-2 {
            animation: none !important;
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
        {/* Layered overlay for depth and legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1B16]/85 via-[#1E1B16]/60 to-[#1E1B16]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B16] via-[#1E1B16]/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#1E1B16_95%)] opacity-60" />
      </div>

      {/* Ornamental corner flourishes — thin gold linework, mandap-arch inspired */}
      <svg
        className="hero-corner absolute left-6 top-6 hidden md:block opacity-70"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden
      >
        <path
          d="M2 32 C2 13 13 2 32 2"
          stroke="#98ba42"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="32" cy="2" r="2.5" fill="#98ba42" />
      </svg>
      <svg
        className="hero-corner absolute right-6 top-6 hidden md:block opacity-70"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden
        style={{ animationDelay: "1.5s" }}
      >
        <path
          d="M54 32 C54 13 43 2 24 2"
          stroke="#98ba42"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="24" cy="2" r="2.5" fill="#98ba42" />
      </svg>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 pb-16 sm:px-6 md:py-16 md:pb-20 xl:px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center text-white max-w-3xl">
            {/* Eyebrow flanked by hairlines */}
            <div className="hero-fade-1 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#98ba42]/60" />
              <p className="font-serif italic text-base md:text-lg text-[#F1DCC9] tracking-[0.15em] text-shadow-lg">
                Marriages are made in Heaven
              </p>
              <span className="h-px w-8 bg-[#98ba42]/60" />
            </div>

            <h1 className="hero-fade-2 mt-3 font-serif text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
              We make the{" "}
              <span className="bg-gradient-to-r from-[#98ba42] to-[#B8D66E] bg-clip-text text-transparent">
                right pairs
              </span>{" "}
              meet at the{" "}
              <span className="text-[#98ba42]">right time</span>
            </h1>

            {/* Ornamental divider: diamond flanked by tapering lines */}
            <div className="hero-fade-3 mt-5 flex items-center justify-center gap-2">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#98ba42]" />
              <span className="h-2 w-2 rotate-45 bg-[#B3243A] ring-1 ring-[#98ba42]/60" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#98ba42]" />
            </div>

            <p className="hero-fade-4 mt-4 max-w-2xl text-sm md:text-base text-[#D4C4B0] leading-relaxed text-shadow-lg">
              Join thousands of happy couples who found their perfect match
              through our trusted platform. With 15+ years of experience and
              verified profiles, we make your journey to lasting love
              meaningful, secure, and successful.
            </p>

            <Button
              size="lg"
              className="hero-fade-4 group relative mt-6 inline-flex w-fit overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-[#c22c46] to-[#8a1c2d] px-11 py-5 font-semibold tracking-[0.08em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-all duration-300 hover:shadow-[0_14px_36px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                GET STARTED
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Button>
          </div>
        </div>

        {/* Stat row */}
        <div className="hero-fade-5 mt-10 flex flex-col items-center justify-center gap-3 md:mt-12 md:flex-row md:gap-0">
          {[
            { number: "12,000+", label: "Verified Profiles" },
            { number: "8,500+", label: "Success Stories" },
            { number: "15+ Years", label: "Of Trust" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="relative flex flex-1 flex-col items-center justify-center px-6 md:px-10"
            >
              {idx > 0 && (
                <span className="absolute left-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-[#98ba42]/25 md:block" />
              )}
              <p
                className="font-serif text-xl md:text-2xl font-bold text-[#B8D66E] leading-tight"
                style={{ animation: `countUp 0.6s ease-out ${idx * 0.15}s both` }}
              >
                {stat.number}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#D4C4B0] font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#98ba42]/70 to-transparent" />

      {/* Signature: interlocking rings — the union motif */}
      <svg
        className="hero-ring-glow absolute -bottom-6 left-1/2 z-10 -translate-x-1/2 hidden md:block"
        width="96"
        height="56"
        viewBox="0 0 96 56"
        fill="none"
        aria-hidden
      >
        <circle cx="36" cy="28" r="24" stroke="#98ba42" strokeWidth="1.5" />
        <circle cx="60" cy="28" r="24" stroke="#B3243A" strokeWidth="1.5" />
      </svg>
    </section>
  );
}

export default HeroSection;