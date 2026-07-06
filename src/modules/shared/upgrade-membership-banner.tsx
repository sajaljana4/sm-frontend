import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { premiumSectionGirl } from "@/assets";

const FEATURES = [
  "Call/WhatsApp access",
  "Unlimited chats",
  "Better responses",
  "Match horoscopes",
];

function UpgradeMembershipBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#FFF9DB] via-[#FFF4B8] to-[#FFEEA0] border border-yellow-200/60">
      <div className="base-section py-0">
        <div className="flex flex-col md:flex-row items-center gap-0">
          {/* Woman Image */}
          <div className="relative w-40 h-48 md:w-48 md:h-56 shrink-0 self-end">
            <Image
              src={premiumSectionGirl}
              alt="Upgrade to premium membership"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 160px, 192px"
            />
          </div>

          {/* Upgrade Text */}
          <div className="flex flex-col items-center md:items-start px-4 py-4 md:py-0 shrink-0">
            <span className="text-xl md:text-2xl font-bold text-gray-800">
              Upgrade to
            </span>
            <span className="text-3xl md:text-4xl font-extrabold text-[#E93375] leading-tight">
              PREMIUM
            </span>
            <span className="text-3xl md:text-4xl font-extrabold text-[#E93375] leading-tight">
              MEMBERSHIP
            </span>
          </div>

          {/* Starburst Badge */}
          <div className="flex flex-col items-center justify-center px-6 py-4 shrink-0">
            <span className="text-sm md:text-base text-gray-600 font-medium mb-1">Get up to</span>
            <div className="relative flex items-center justify-center">
              {/* Starburst SVG */}
              <svg
                viewBox="0 0 120 120"
                className="w-36 h-36 md:w-45 md:h-45"
                fill="none"
              >
                <path
                  d="M60 0 L67 22 L78 5 L78 28 L93 15 L86 37 L105 30 L92 48 L113 48 L95 60 L113 72 L92 72 L105 90 L86 83 L93 105 L78 92 L78 115 L67 98 L60 120 L53 98 L42 115 L42 92 L27 105 L34 83 L15 90 L28 72 L7 72 L25 60 L7 48 L28 48 L15 30 L34 37 L27 15 L42 28 L42 5 L53 22 Z"
                  fill="white"
                  stroke="#E5E7EB"
                  strokeWidth="0.5"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl md:text-5xl font-extrabold text-[#E93375] leading-none">
                  60%
                </span>
                <span className="text-base md:text-lg font-bold text-[#E93375]">
                  OFF
                </span>
              </div>
            </div>
            <span className="text-sm md:text-base text-gray-600 font-medium mt-1">
              on your subscription
            </span>
          </div>

          {/* Features List */}
          <div className="flex flex-col gap-2.5 px-4 py-4 md:py-0 flex-1">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-gray-600 shrink-0" />
                <span className="text-base text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="px-6 py-4 md:py-0 shrink-0">
            <Button className="bg-[#E93375] hover:bg-[#d42761] text-white font-bold rounded-full px-10 py-6 text-lg cursor-pointer shadow-md hover:shadow-lg transition-all">
              VIEW PLAN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradeMembershipBanner;
