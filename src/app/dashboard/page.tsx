import DailyRecommendations from "@/modules/home/daily-recommendations";
import PartnerFindingSection from "@/modules/home/partner-finding-section";
import ProfileVisitors from "@/modules/home/profile-visitors";
import PartnerSearchSection from "@/modules/home/search-section";
import TrustSectionForLanding from "@/modules/landing/trust-section";
import PageBanner from "@/modules/shared/page-banner";
import StatSection from "@/modules/shared/stat-section";
import SuccessStories from "@/modules/shared/success-stories";
import UpgradeMembershipBanner from "@/modules/shared/upgrade-membership-banner";
import WeddingBazarBanner from "@/modules/shared/wedding-bazar/banner";

function Page() {
  return (
    <>
      <PageBanner
        title="Welcome"
        description="Your journey to finding your perfect match starts here"
      />
      <div className="-mt-22 relative z-10 -mb-6">
        <PartnerSearchSection />
      </div>
      <ProfileVisitors />
      <DailyRecommendations />
      <UpgradeMembershipBanner />
      <PartnerFindingSection />
      <SuccessStories />
      <TrustSectionForLanding />
      <WeddingBazarBanner />
      <StatSection />
    </>
  );
}

export default Page;
