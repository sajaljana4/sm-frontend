import Image from "next/image";
import Link from "next/link";
import { footerBackground, smLogo } from "@/assets";
import {
  Diamond,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Heart,
} from "lucide-react";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/packages", label: "Packages" },
  { href: "/how-it-works", label: "How it Works" },
];

const menuLinks = [
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact us" },
  { href: "/feedback", label: "Feedback" },
];

const socials = [
  { href: "#", label: "Facebook", icon: Diamond },
  { href: "#", label: "Instagram", icon: Diamond },
  { href: "#", label: "YouTube", icon: Diamond },
  { href: "#", label: "X", icon: Diamond },
];

function Footer() {
  return (
    <footer className="relative w-full overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-[#B3243A] via-[#C9962C] to-[#B3243A]" />

      <div
        style={{ backgroundImage: `url(${footerBackground.src})` }}
        className="relative bg-cover bg-no-repeat bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E1B16]/96 via-[#1E1B16]/92 to-[#0D0A07]/98" />

        {/* Decorative rings */}
        <svg
          className="pointer-events-none absolute -right-8 -top-16 opacity-[0.06]"
          width="200"
          height="130"
          viewBox="0 0 96 56"
          fill="none"
        >
          <circle cx="36" cy="28" r="24" stroke="#C9962C" strokeWidth="2" />
          <circle cx="60" cy="28" r="24" stroke="#B3243A" strokeWidth="2" />
        </svg>
        <svg
          className="pointer-events-none absolute -left-10 bottom-0 opacity-[0.05]"
          width="160"
          height="104"
          viewBox="0 0 96 56"
          fill="none"
        >
          <circle cx="36" cy="28" r="24" stroke="#C9962C" strokeWidth="2" />
          <circle cx="60" cy="28" r="24" stroke="#B3243A" strokeWidth="2" />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-white">
          {/* CTA Section */}
          <div className="relative mb-16 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-[#C9962C]/40 bg-gradient-to-r from-[#C9962C]/10 to-[#B3243A]/10 backdrop-blur-md px-8 py-9 md:px-12 md:py-10 shadow-[0_0_60px_-15px_rgba(201,150,44,0.35)]">
            <span className="absolute top-0 left-8 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#C9962C] to-[#B3243A] shadow-lg ring-4 ring-[#1E1B16]">
              <Heart size={18} className="text-white" />
            </span>
            <div className="text-center md:text-left flex-1">
              <p className="font-serif italic text-[#E8B366] text-base">
                Your journey to forever begins here
              </p>
              <h3 className="font-serif text-lg md:text-xl font-bold mt-2 leading-snug">
                Find Your Perfect Match Today
              </h3>
            </div>
            <Link
              href="/register"
              className="group relative shrink-0 inline-flex items-center gap-2 overflow-hidden bg-gradient-to-r from-[#B3243A] to-[#C9302E] text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:from-[#C9962C] hover:to-[#E8B366]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
            {/* Brand Section */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-4">
              <div className="inline-block">
                <Image
                  src={smLogo}
                  alt="Raibar Matrimony"
                  width={120}
                  height={60}
                  className="w-20 object-contain"
                />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed pr-2">
                Dedicated matrimonial platform for the Santali community. Find
                your perfect match with curated search and trusted profiles.
              </p>

              {/* Compact tag/badge — was the bulky bordered box */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#C9962C]/10 border border-[#C9962C]/30 pl-2 pr-3 py-1.5">
                <ShieldCheck size={13} className="text-[#C9962C] shrink-0" />
                <span className="text-[11px] font-medium tracking-wide text-[#E8B366]/90">
                  Matrimonial purposes only
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-widest uppercase text-white relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 h-[2px] w-8 bg-gradient-to-r from-[#C9962C] to-transparent" />
              </h3>
              <ul className="space-y-3 pt-2">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-[#C9962C] transition-colors duration-200 text-sm font-medium flex items-center gap-2 group"
                    >
                      <span className="inline-block w-1 h-1 bg-[#C9962C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Menu */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-widest uppercase text-white relative inline-block">
                Menu
                <span className="absolute -bottom-2 left-0 h-[2px] w-8 bg-gradient-to-r from-[#C9962C] to-transparent" />
              </h3>
              <ul className="space-y-3 pt-2">
                {menuLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-[#C9962C] transition-colors duration-200 text-sm font-medium flex items-center gap-2 group"
                    >
                      <span className="inline-block w-1 h-1 bg-[#C9962C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-widest uppercase text-white relative inline-block">
                Get in Touch
                <span className="absolute -bottom-2 left-0 h-[2px] w-8 bg-gradient-to-r from-[#C9962C] to-transparent" />
              </h3>
              <ul className="space-y-3 pt-2">
                <li>
                  <Link
                    href="tel:+919749858463"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C9962C]/15 group-hover:bg-[#C9962C]/25 transition-colors">
                      <Phone size={14} className="text-[#C9962C]" />
                    </span>
                    <span>+91 97498 58463</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:hello@raibar.com"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C9962C]/15 group-hover:bg-[#C9962C]/25 transition-colors">
                      <Mail size={14} className="text-[#C9962C]" />
                    </span>
                    <span>hello@raibar.com</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 py-8 border-t border-white/10">
            <p className="text-sm font-semibold text-white">Connect with us</p>
            <div className="flex items-center gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9962C]/40 text-gray-400 hover:text-white hover:bg-[#C9962C] hover:border-[#C9962C] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C9962C]/30"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-gray-500">
            <p>
              © 2026 RAIBAR. All rights reserved. — Finding soulmates in the
              Santali community.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="hover:text-[#C9962C] transition-colors"
              >
                Terms & Conditions
              </Link>
              <span className="w-px h-3 bg-gray-700" />
              <Link
                href="/privacy"
                className="hover:text-[#C9962C] transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;