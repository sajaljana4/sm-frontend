"use client";
import { landingHeader, landingHeader1 } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

// Hero slide images
const heroImages = [landingHeader, landingHeader1];

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
        .hero-ring-glow { animation: ringGlow 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-ring-glow, .hero-kenburns, .hero-float-1, .hero-float-2 {
            animation: none !important;
          }
        }
        /* Ken Burns effect for subtle motion between slides */
        @keyframes kenburns {
          0% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.06) translateY(-2%); }
          100% { transform: scale(1) translateY(0); }
        }
        .hero-kenburns { animation: kenburns 20s ease-in-out infinite; transform-origin: center; }
        /* make slide opacity transitions align with Swiper speed */
        .swiper-slide { transition: opacity 1.2s ease !important; }
      `}</style>

      {/* Background image slider */}
      <div className="absolute inset-0 h-full w-full">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1200}
          autoplay={{ delay: 8000, disableOnInteraction: false, waitForTransition: true }}
          loop
          allowTouchMove={false}
          className="h-full w-full"
        >
          {heroImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full w-full">
                <Image
                  src={img}
                  alt="Hero section background"
                  className="hero-kenburns h-full w-full object-cover"
                  priority={idx === 0}
                  fill
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Layered overlay for depth and legibility */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#1E1B16]/85 via-[#1E1B16]/60 to-[#1E1B16]/30" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#1E1B16] via-[#1E1B16]/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,#1E1B16_95%)] opacity-60" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 py-12 pb-16 sm:px-6 md:py-16 md:pb-20 xl:px-4">
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
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#98ba42]/70 to-transparent z-20" />

      {/* Signature: interlocking rings — the union motif */}
      <svg
        className="hero-ring-glow absolute -bottom-6 left-1/2 z-20 -translate-x-1/2 hidden md:block"
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