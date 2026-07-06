"use client";

import Image from "next/image";
import { playStore, appStore, appImage } from "@/assets";

function StatSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#E8FFD9] to-[#FFFFFF]">
      <div className="base-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: App Image */}
          <div className="flex justify-center md:justify-end">
            <Image
              src={appImage}
              alt="Santhali Matrimony App"
              className="w-full max-w-3xl h-auto"
              priority
            />
          </div>

          {/* Right: Download Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="font-serif italic text-lg md:text-xl text-[#B3243A] tracking-wide">
                Stay Connected
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1E1B16]">
                Download the app for{" "}
                <span className="text-[#9d0039]">quick mobile search</span> and
                more details.
              </h3>

              <p className="text-sm md:text-base text-[#666] leading-relaxed">
                Get instant access to thousands of verified profiles, manage
                your matches on the go, and stay connected with your potential
                soulmate anytime, anywhere.
              </p>
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
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#98BA42] to-[#C9962C] flex items-center justify-center flex-shrink-0">
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
                className="inline-block hover:opacity-80 transition-opacity duration-300 w-full sm:w-auto"
              >
                <Image
                  src={playStore}
                  alt="Get it on Google Play"
                  height={56}
                  width={180}
                  className="h-10 w-auto"
                />
              </a>

              {/* App Store */}
              <a
                href="#"
                className="inline-block hover:opacity-80 transition-opacity duration-300 w-full sm:w-auto"
              >
                <Image
                  src={appStore}
                  alt="Download on App Store"
                  height={56}
                  width={180}
                  className="h-10 w-auto"
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
