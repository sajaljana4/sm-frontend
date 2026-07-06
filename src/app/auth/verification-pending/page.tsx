import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageBanner from "@/modules/shared/page-banner";

export const metadata: Metadata = {
  title: "Verification Pending | Raibar",
  description:
    "Your profile is being reviewed by the Raibar team before it goes live.",
};

function Page() {
  return (
    <>
      <PageBanner
        title="VERIFICATION PENDING"
        description="Your profile is almost ready to shine"
      />

      <section className="base-section flex justify-center py-12 min-h-[50vh]">
        <div className="w-full max-w-xl bg-white rounded-2xl p-8 md:p-12 text-center animate-in fade-in-0 zoom-in-95 duration-500">
          {/* Pending icon */}
          <div className="relative mx-auto mb-8 size-24">
            <span className="absolute inset-0 rounded-full bg-linear-to-br from-[#E32C6F]/20 to-[#FF6B9D]/20 animate-ping" />
            <div className="relative flex size-24 items-center justify-center rounded-full bg-linear-to-br from-[#E32C6F] to-[#FF6B9D] shadow-lg shadow-[#E32C6F]/25">
              <svg
                className="size-11 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Your Profile is Under Review
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-3">
            Thank you for registering with Raibar! To keep our community genuine
            and safe, every new profile is reviewed before it goes live.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Please be patient — the{" "}
            <span className="font-semibold text-[#E32C6F]">Raibar team</span>{" "}
            will verify and publish your profile shortly, and we&apos;ll notify
            you as soon as it&apos;s ready.
          </p>

          <Button
            size="lg"
            className="rounded-full bg-[#E32C6F] hover:bg-[#c4225e] text-white px-8"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

export default Page;
