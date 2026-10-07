import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import FusionHero from '@/components/sections/FusionHero';
import ExperienceModes from '@/components/sections/ExperienceModes';
import FeaturedShowcase from '@/components/sections/FeaturedShowcase';
import CulinaryJourney from '@/components/sections/CulinaryJourney';
import TableGrillStory from '@/components/sections/TableGrillStory';
import InteractiveExperiences from '@/components/sections/InteractiveExperiences';
import MenuDiscovery from '@/components/sections/MenuDiscovery';
import ExperienceValues from '@/components/sections/ExperienceValues';
import HomeDining from '@/components/sections/HomeDining';
import AtmosphereGallery from '@/components/sections/AtmosphereGallery';
import GiftMembership from '@/components/sections/GiftMembership';
import ReservationVisit from '@/components/sections/ReservationVisit';

/**
 * Exactly 14 top-level components:
 *  01 SiteHeader · 02 FusionHero · 03 ExperienceModes · 04 FeaturedShowcase · 05 CulinaryJourney
 *  06 TableGrillStory (Brunch Signature Story) · 07 InteractiveExperiences · 08 MenuDiscovery
 *  09 ExperienceValues · 10 HomeDining · 11 AtmosphereGallery · 12 GiftMembership
 *  13 ReservationVisit · 14 SiteFooter
 * (Numbering in the brief counts the hero as 02; "12 sections" = 02–13.)
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <FusionHero />
        <ExperienceModes />
        <FeaturedShowcase />
        <CulinaryJourney />
        <TableGrillStory />
        <InteractiveExperiences />
        <MenuDiscovery />
        <ExperienceValues />
        <HomeDining />
        <AtmosphereGallery />
        <GiftMembership />
        <ReservationVisit />
      </main>
      <SiteFooter />
    </>
  );
}
