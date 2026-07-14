"use client";
import { smLogo } from "@/assets";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getAuthToken, removeAuthToken } from "@/utils/cookie-storage";
import {
  Phone,
  User,
  Heart,
  List,
  Package,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BASE_MEDIA_URL } from "@/services/config/query-urls";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

function Header() {
  const router = useRouter();
  const { openLoginModal, profile, refetchProfile, setProfile } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const fetchProfile = async () => {
    const token = await getAuthToken();
    if (!token || profile) return;
    refetchProfile();
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await removeAuthToken();
      setProfile(null);
      setIsMenuOpen(false);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Failed to logout", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-100 lg:h-20">
      {/* Slim brand ribbon */}
      <div className="h-1 w-full bg-gradient-to-r from-[#B3243A] via-[#98BA42] to-[#B3243A]" />

      <div className="bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(30,27,22,0.06)]">
        <div className="flex justify-between items-center gap-4 base-section py-2.5 md:py-3">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="shrink-0">
              <Image
                src={smLogo}
                width={200}
                height={200}
                alt="sm logo"
                className="w-20 md:w-24 transition-opacity hover:opacity-80"
              />
            </Link>

            <div className="hidden xl:block h-8 w-px bg-black/10" />

            <p className="hidden xl:block font-serif italic text-sm text-[#1E1B16]/50 tracking-wide">
              India&apos;s Trusted Santhali Matrimony
            </p>
          </div>

          <div className="flex items-center gap-3 md:gap-6 justify-end w-full text-sm">
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 mr-2">
              {[
                { href: "/dashboard", label: "Home", show: !!profile },
                { href: "/", label: "Home", show: !profile },
                { href: "/about-us", label: "About", show: true },
                { href: "/packages", label: "Packages", show: true },
                { href: "/contact", label: "Contact", show: true },
              ]
                .filter((item) => item.show)
                .map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className={`group relative py-1 font-medium transition-colors ${
                        isActive
                          ? "text-[#B3243A]"
                          : "text-[#1E1B16]/65 hover:text-[#B3243A]"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute -bottom-0.5 left-1/2 h-[1.5px] -translate-x-1/2 bg-[#98BA42] transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  );
                })}
            </nav>

            <Link
              href="tel:+91 97498 58463"
              className="hidden lg:flex items-center gap-2 rounded-full border border-[#B3243A]/20 pl-2 pr-4 py-1.5 text-[#1E1B16]/80 transition-colors hover:bg-[#98BA42]/10 cursor-pointer"
            >
              <span className="relative flex h-7 w-7 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B3243A]/30" />
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#B3243A]/10">
                  <Phone size={13} className="icon-blink text-[#B3243A]" />
                </span>
              </span>
              <span className="font-medium">+91 97498 58463</span>
            </Link>

            {profile ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 rounded-full border border-transparent p-1 pr-2 transition-colors hover:border-[#98BA42]/30 hover:bg-[#98BA42]/10 focus:outline-none focus:ring-2 focus:ring-[#B3243A]/20"
                >
                  <Avatar className="w-9 h-9 border-2 border-[#98BA42]/50 shadow-sm">
                    <AvatarImage
                      src={
                        profile.profileImages?.[0]
                          ? `${BASE_MEDIA_URL}/${profile.profileImages[0]}`
                          : undefined
                      }
                      alt="avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-[#B3243A] text-white font-semibold">
                      {profile.firstName
                        ? profile.firstName.charAt(0).toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown
                    size={16}
                    className={`text-[#1E1B16]/40 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden flex flex-col py-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-black/5 flex flex-col gap-0.5 bg-[#98BA42]/10">
                      <p className="font-semibold text-[#1E1B16] truncate text-base">
                        {profile.firstName
                          ? `${profile.firstName} ${profile.lastName || ""}`.trim()
                          : "User"}
                      </p>
                      <p className="text-xs text-[#1E1B16]/50 truncate">
                        {profile.email || "No email available"}
                      </p>
                      <p className="text-xs text-[#1E1B16]/50 truncate mt-0.5">
                        {profile.phone || "No phone available"}
                      </p>
                    </div>

                    <div className="flex flex-col py-1">
                      <Link
                        href="/my/profile"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#98BA42]/10 text-sm text-[#1E1B16]/75 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User size={18} className="text-[#B3243A]" />
                        Profile
                      </Link>
                      <Link
                        href="/my/interests"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#98BA42]/10 text-sm text-[#1E1B16]/75 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Heart size={18} className="text-[#B3243A]" />
                        My Interests
                      </Link>
                      <Link
                        href="/my/shortlists"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#98BA42]/10 text-sm text-[#1E1B16]/75 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <List size={18} className="text-[#B3243A]" />
                        Shortlisted
                      </Link>
                      <Link
                        href="/packages"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#98BA42]/10 text-sm text-[#1E1B16]/75 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Package size={18} className="text-[#B3243A]" />
                        Packages
                      </Link>
                    </div>

                    <div className="border-t border-black/5 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-sm text-red-600 transition-colors font-medium"
                      >
                        <LogOut size={18} className="text-red-500" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                className="bg-[#B3243A] hover:bg-[#9A1F32] active:bg-[#821A2A] text-white font-semibold px-7 rounded-full shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] cursor-pointer"
                onClick={openLoginModal}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
