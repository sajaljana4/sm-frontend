import HeroSection from "@/modules/landing/hero-section";
import JourneySectionForDesktop from "@/modules/landing/journey/desktop";
import JourneySectionForMobile from "@/modules/landing/journey/mobile";
import Overview from "@/modules/landing/overview";
import PackageSectionForLanding from "@/modules/landing/package-section";
import TrustSectionForLanding from "@/modules/landing/trust-section";
import StatSection from "@/modules/shared/stat-section";
import SuccessStories from "@/modules/shared/success-stories";
import WeddingBazarBanner from "@/modules/shared/wedding-bazar/banner";

function Page() {
  return (
    <section>
      <HeroSection />
      <Overview />
      <div className="md:hidden">
        <JourneySectionForMobile />
      </div>
      <div className="hidden md:block">
        <JourneySectionForDesktop />
      </div>
      <PackageSectionForLanding />
      <SuccessStories />
      <TrustSectionForLanding />
      <WeddingBazarBanner />
      <StatSection />
    </section>
  );
}

export default Page;
