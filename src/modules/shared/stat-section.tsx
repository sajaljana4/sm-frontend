"use client";

import Image from "next/image";
import { playStore, appStore, appImage } from "@/assets";
import { Star, Download } from "lucide-react";

function StatSection() {
  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-b from-[#E8FFD9] to-white overflow-hidden">
      {/* Ambient decorative glow */}
      <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-[#98BA42]/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#B3243A]/10 blur-3xl" />

      <div className="base-section relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: App Image */}
          <div className="relative flex justify-center md:justify-end">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#98BA42]/15 to-[#B3243A]/10 blur-2xl" />
            <Image
              src={appImage}
              alt="Santhali Matrimony App"
              className="relative w-full max-w-3xl h-auto rounded-2xl"
              priority
            />
          </div>

          {/* Right: Download Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#98BA42]/40 bg-[#98BA42]/10 px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#98BA42] animate-pulse" />
                <p className="font-serif italic text-sm md:text-base text-[#B3243A] tracking-wide">
                  Stay Connected
                </p>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1E1B16]">
                Download the app for{" "}
                <span className="text-[#98BA42]">quick mobile search</span>{" "}
                and more details.
              </h3>

              <p className="text-sm md:text-base text-[#666] leading-relaxed">
                Get instant access to thousands of verified profiles, manage
                your matches on the go, and stay connected with your potential
                soulmate anytime, anywhere.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6 py-1">
              <div className="flex items-center gap-1.5">
                <Star size={16} className="fill-[#98BA42] text-[#98BA42]" />
                <span className="text-sm font-semibold text-[#1E1B16]">
                  4.8
                </span>
                <span className="text-xs text-[#999]">rating</span>
              </div>
              <span className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-1.5">
                <Download size={16} className="text-[#C9302E]" />
                <span className="text-sm font-semibold text-[#1E1B16]">
                  50K+
                </span>
                <span className="text-xs text-[#999]">downloads</span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3 py-4">
              {[
                "Browse verified profiles instantly",
                "Real-time match notifications",
                "Secure messaging & video calls",
                "Advanced profile filters",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#98BA42] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm text-[#1E1B16]">{feature}</span>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-0">
              {/* Google Play */}
              <a
                href="#"
                className="inline-block rounded-lg hover:shadow-lg hover:shadow-[#98BA42]/20 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
              >
                <Image
                  src={playStore}
                  alt="Get it on Google Play"
                  height={56}
                  width={180}
                  className="h-10 w-auto rounded-lg"
                />
              </a>

              {/* App Store */}
              <a
                href="#"
                className="inline-block rounded-lg hover:shadow-lg hover:shadow-[#B3243A]/20 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
              >
                <Image
                  src={appStore}
                  alt="Download on App Store"
                  height={56}
                  width={180}
                  className="h-10 w-auto rounded-lg"
                />
              </a>
            </div>

            <p className="text-xs text-[#999] pt-2">
              Available on iOS and Android • Free to download
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatSection;