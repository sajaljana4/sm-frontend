import type { ReactNode } from "react";
import {
  BadgeCheck,
  Briefcase,
  Cake,
  GraduationCap,
  Heart,
  Languages,
  MapPin,
  Quote,
  Ruler,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserType } from "@/types/common/user.type";
import {
  calculateAge,
  formatHeight,
  fullName,
  humanize,
  humanizeList,
} from "@/utils/profile-format";
import ProfileGallery from "./profile-gallery";
import InterestActions from "./interest-actions";
import ShortlistActions from "./shortlist-actions";

type IconType = React.ComponentType<{ className?: string }>;

// ── Small presentational building blocks ─────────────────────────
function Fact({
  icon: Icon,
  label,
  value,
}: Readonly<{ icon: IconType; label: string; value: ReactNode }>) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted/40 px-3 py-2.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E32C6F]/10 text-[#E32C6F]">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  icon: Icon,
  className,
  children,
}: Readonly<{
  title: string;
  icon: IconType;
  className?: string;
  children: ReactNode;
}>) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border/60 bg-white p-6 shadow-sm",
        className,
      )}
    >
      <div className="mb-5 flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#E32C6F]/10 text-[#E32C6F]">
          <Icon className="size-5" />
        </span>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Fields({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
      {children}
    </dl>
  );
}

function Field({
  label,
  value,
}: Readonly<{ label: string; value?: ReactNode }>) {
  const empty = value === undefined || value === null || value === "";
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm font-medium text-foreground">
        {empty ? "—" : value}
      </dd>
    </div>
  );
}

function Chips({ items }: Readonly<{ items: string[] }>) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">—</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full bg-[#E32C6F]/10 px-3 py-1 text-xs font-medium text-[#E32C6F]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ChipGroup({
  label,
  items,
}: Readonly<{ label: string; items: string[] }>) {
  return (
    <div>
      <p className="mb-2 text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <Chips items={items} />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────
export default function UserDetails({ user }: Readonly<{ user: UserType }>) {
  const name = fullName(user);
  const age = calculateAge(user.dob);
  const height = formatHeight(user.physicalInformation?.height);

  const phys = user.physicalInformation;
  const edu = user.education;
  const occ = user.occupation;
  const life = user.lifeStyle;
  const fam = user.familyInformation;
  const addr = user.address;
  const pref = user.partnerPreference;
  const children = user.children;

  const location =
    [addr?.city, addr?.state, user.currentLocation?.country]
      .filter(Boolean)
      .join(", ") || "Location not specified";

  const familyLocation = fam?.familyLocationSameAsProfile
    ? "Same as profile"
    : (fam?.familyLocation ?? "—");

  return (
    <section className="base-section">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
        {/* Photo gallery */}
        <div className="h-fit lg:sticky lg:top-24">
          <ProfileGallery images={user.profileImages} alt={name} />
        </div>

        {/* Summary + detail cards */}
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                    {name}
                  </h1>
                  {user.isPublished && (
                    <BadgeCheck className="size-6 text-[#E32C6F]" />
                  )}
                </div>
                <p className="mt-1 text-muted-foreground">
                  {[
                    age ? `${age} yrs` : null,
                    user.gender ? humanize(user.gender) : null,
                    phys?.height ? height : null,
                  ]
                    .filter(Boolean)
                    .join("  •  ")}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" /> {location}
                </p>
              </div>

              {/* Top-right: profile badge + shortlist bookmark */}
              <div className="flex flex-wrap items-center gap-2">
                {user.profileFor && (
                  <span className="rounded-full bg-[#E32C6F]/10 px-3 py-1 text-xs font-semibold text-[#E32C6F]">
                    Profile for {humanize(user.profileFor)}
                  </span>
                )}
                <ShortlistActions
                  targetUserId={user._id}
                  initialShortlist={user.shortlistStatus}
                  targetName={name}
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Fact icon={Cake} label="Age" value={age ? `${age}` : "—"} />
              <Fact icon={Ruler} label="Height" value={height} />
              <Fact
                icon={GraduationCap}
                label="Education"
                value={humanize(edu?.highestQualification)}
              />
              <Fact
                icon={Briefcase}
                label="Works in"
                value={humanize(occ?.employedIn)}
              />
            </div>

            <div className="mt-6 w-full">
              <InterestActions
                targetUserId={user._id}
                initialInterest={user.interestStatus}
                targetName={name}
              />
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <InfoCard title="About" icon={Quote}>
              <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                {user.bio}
              </p>
            </InfoCard>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Basic */}
            <InfoCard title="Basic Details" icon={User}>
              <Fields>
                <Field label="Profile For" value={humanize(user.profileFor)} />
                <Field label="Gender" value={humanize(user.gender)} />
                <Field
                  label="Marital Status"
                  value={humanize(user.maritalStatus)}
                />
                <Field label="Religion" value={humanize(user.religion)} />
                <Field
                  label="Mother Tongue"
                  value={humanize(user.motherTongue)}
                />
                <Field label="Caste" value={humanize(user.caste)} />
                <Field label="Sub Caste" value={humanize(user.subCaste)} />
                <Field label="Gothra" value={humanize(user.gothra)} />
              </Fields>
            </InfoCard>

            {/* Physical */}
            <InfoCard title="Physical Attributes" icon={Ruler}>
              <Fields>
                <Field label="Height" value={height} />
                <Field
                  label="Weight"
                  value={phys?.weight ? `${phys.weight} kg` : undefined}
                />
                <Field label="Body Type" value={humanize(phys?.bodyType)} />
                <Field label="Complexion" value={humanize(phys?.complexion)} />
                <Field
                  label="Physical Status"
                  value={humanize(phys?.physicalStatus)}
                />
              </Fields>
            </InfoCard>

            {/* Education & Career */}
            <InfoCard title="Education & Career" icon={GraduationCap}>
              <Fields>
                <Field
                  label="Qualification"
                  value={humanize(edu?.highestQualification)}
                />
                <Field label="Year of Passing" value={edu?.yearOfPassing} />
                <Field label="Employed In" value={humanize(occ?.employedIn)} />
                <Field
                  label="Annual Income"
                  value={humanize(occ?.annualIncome)}
                />
              </Fields>
            </InfoCard>

            {/* Lifestyle */}
            <InfoCard title="Lifestyle" icon={Sparkles}>
              <Fields>
                <Field label="Diet" value={humanize(life?.diet)} />
                <Field label="Smoking" value={humanize(life?.smoking)} />
                <Field label="Drinking" value={humanize(life?.drinking)} />
                <Field label="Children" value={children?.noOfChildren ?? 0} />
                {!!children?.noOfChildren && (
                  <Field
                    label="Living With"
                    value={children?.livingWithMe ? "Yes" : "No"}
                  />
                )}
              </Fields>
            </InfoCard>

            {/* Location */}
            <InfoCard title="Location" icon={MapPin}>
              <Fields>
                <Field label="Address" value={addr?.addressLine} />
                <Field label="City" value={addr?.city} />
                <Field label="Post Office" value={addr?.po} />
                <Field label="State" value={addr?.state} />
                <Field label="Postal Code" value={addr?.postalCode} />
                <Field label="Country" value={addr?.country} />
                <Field
                  label="Currently In"
                  value={user.currentLocation?.country}
                />
              </Fields>
            </InfoCard>

            {/* Family */}
            <InfoCard title="Family" icon={Users}>
              <Fields>
                <Field
                  label="Father's Status"
                  value={humanize(fam?.fatherStatus)}
                />
                <Field
                  label="Mother's Status"
                  value={humanize(fam?.motherStatus)}
                />
                <Field
                  label="Family Class"
                  value={humanize(fam?.familyClass)}
                />
                <Field label="Family Type" value={humanize(fam?.familyType)} />
                <Field label="Food Type" value={humanize(fam?.foodType)} />
                <Field
                  label="Brothers"
                  value={
                    fam
                      ? `${fam.numberOfBrothers ?? 0} (${fam.numberOfBrothersMarried ?? 0} married)`
                      : undefined
                  }
                />
                <Field
                  label="Sisters"
                  value={
                    fam
                      ? `${fam.numberOfSisters ?? 0} (${fam.numberOfSistersMarried ?? 0} married)`
                      : undefined
                  }
                />
                <Field label="Family Location" value={familyLocation} />
                <Field
                  label="Ancestral Origin"
                  value={fam?.familyAncestralOrigin}
                />
              </Fields>
            </InfoCard>

            {/* Interests */}
            <InfoCard title="Interests & Languages" icon={Languages}>
              <div className="flex flex-col gap-5">
                <ChipGroup
                  label="Known Languages"
                  items={humanizeList(user.knownLanguages)}
                />
                <ChipGroup
                  label="Hobbies & Interests"
                  items={humanizeList(user.hobbiesAndInterests)}
                />
                <ChipGroup label="Sports" items={humanizeList(user.sports)} />
              </div>
            </InfoCard>

            {/* Partner Preferences */}
            {pref && (
              <InfoCard
                title="Partner Preferences"
                icon={Heart}
                className="md:col-span-2"
              >
                <Fields>
                  <Field
                    label="Age"
                    value={`${pref.preferredAgeMin} - ${pref.preferredAgeMax} yrs`}
                  />
                  <Field
                    label="Height"
                    value={`${pref.preferredHeightMin} - ${pref.preferredHeightMax} cm`}
                  />
                  <Field label="Manglik" value={humanize(pref.manglik)} />
                  <Field
                    label="Drinking"
                    value={humanize(pref.drinkingHabits)}
                  />
                  <Field label="Smoking" value={humanize(pref.smokingHabits)} />
                </Fields>

                <div className="mt-5 flex flex-col gap-5 border-t border-border/60 pt-5">
                  <ChipGroup
                    label="Marital Status"
                    items={humanizeList(pref.maritalStatus)}
                  />
                  <ChipGroup
                    label="Education"
                    items={humanizeList(pref.preferredEducation)}
                  />
                  <ChipGroup
                    label="Employment"
                    items={humanizeList(pref.employedIn)}
                  />
                  <ChipGroup
                    label="Annual Income"
                    items={humanizeList(pref.annualIncome)}
                  />
                  <ChipGroup
                    label="Physical Status"
                    items={humanizeList(pref.physicalStatus)}
                  />
                  <ChipGroup
                    label="Eating Habits"
                    items={humanizeList(pref.eatingHabits)}
                  />
                  <ChipGroup
                    label="Religion"
                    items={humanizeList(pref.religion)}
                  />
                  <ChipGroup
                    label="Mother Tongue"
                    items={humanizeList(pref.motherTongue)}
                  />
                  <ChipGroup label="Caste" items={humanizeList(pref.caste)} />
                </div>
              </InfoCard>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
