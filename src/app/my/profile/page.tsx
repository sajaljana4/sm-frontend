"use client";

import { useState, type ComponentType } from "react";
import {
  Coffee,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  ImageIcon,
  MapPin,
  Ruler,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

import PersonalSection from "@/modules/profile/sections/personal-section";
import PhotosSection from "@/modules/profile/sections/photos-section";
import AddressSection from "@/modules/profile/sections/address-section";
import ReligionSection from "@/modules/profile/sections/religion-section";
import PhysicalSection from "@/modules/profile/sections/physical-section";
import EducationSection from "@/modules/profile/sections/education-section";
import LifestyleSection from "@/modules/profile/sections/lifestyle-section";
import FamilySection from "@/modules/profile/sections/family-section";
import PartnerPreferenceSection from "@/modules/profile/sections/partner-preference-section";

type SectionId =
  | "personal"
  | "photos"
  | "address"
  | "religion"
  | "physical"
  | "education"
  | "lifestyle"
  | "family"
  | "partner";

const SECTIONS: {
  id: SectionId;
  label: string;
  icon: LucideIcon;
  Component: ComponentType;
}[] = [
  { id: "personal", label: "Personal", icon: UserRound, Component: PersonalSection },
  { id: "photos", label: "Profile Photos", icon: ImageIcon, Component: PhotosSection },
  { id: "address", label: "Address", icon: MapPin, Component: AddressSection },
  { id: "religion", label: "Religion & Community", icon: HandHeart, Component: ReligionSection },
  { id: "physical", label: "Physical", icon: Ruler, Component: PhysicalSection },
  { id: "education", label: "Education", icon: GraduationCap, Component: EducationSection },
  { id: "lifestyle", label: "Lifestyle", icon: Coffee, Component: LifestyleSection },
  { id: "family", label: "Family", icon: Users, Component: FamilySection },
  { id: "partner", label: "Partner Preferences", icon: HeartHandshake, Component: PartnerPreferenceSection },
];

function Page() {
  const { profile, fetchingProfile } = useAuth();
  const [active, setActive] = useState<SectionId>("personal");

  const ActiveSection =
    SECTIONS.find((s) => s.id === active)?.Component ?? PersonalSection;

  return (
    <div className="base-page space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Profile Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your profile information and partner preferences.
        </p>
      </div>
      <div className="h-px w-full bg-border" />

      {fetchingProfile && !profile ? (
        <div className="flex items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#E32C6F]" />
        </div>
      ) : (
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-60 lg:shrink-0">
            <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                    active === id
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="whitespace-nowrap">{label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Active section */}
          <section className="min-w-0 flex-1">
            {/* key forces a fresh mount per section so defaults re-read from the profile atom */}
            <ActiveSection key={active} />
          </section>
        </div>
      )}
    </div>
  );
}

export default Page;
