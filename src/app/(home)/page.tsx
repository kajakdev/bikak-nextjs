import { Header } from "@/components/Header";
import { HomeHeroSlider } from "@/components/HomeHeroSlider";
import { VisionSocialSection } from "@/components/VisionSocialSection";
import { CoachesSection } from "@/components/CoachesSection";
import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { ContactGallerySection } from "@/components/ContactGallerySection";
import { LatestNewsSection } from "@/components/LatestNewsSection";

import {
  getLatestNews,
  getHomePageContent,
} from "@/lib/wordpress";

export default async function HomePage() {
  const [news, homeContent] = await Promise.all([
    getLatestNews(),
    getHomePageContent(),
  ]);

  console.log(
    "FLEXIBLE CONTENT BLOKKOK:",
    JSON.stringify(homeContent.blocks, null, 2)
  );

  return (
    <>
      {/* HERO SLIDER – WORDPRESS */}
      <HomeHeroSlider slides={homeContent.heroSlides} />

      <Header />

      <main>
        {/* VÍZIÓNK – WORDPRESS */}
        <VisionSocialSection
          visionTitle="Víziónk"
          visionText={homeContent.vision.text}
          visionImageSrc={homeContent.vision.imageSrc}
          visionImageAlt={homeContent.vision.imageAlt}
          visionHref="/vizionk"
          visionBtnLabel="A Bikák víziója"
          facebookHref="https://www.facebook.com/szigetibikakse"
          instagramHref="https://www.instagram.com/szigeti_bikak"
        />

        {/* EDZŐINK – WORDPRESS */}
        <CoachesSection
          title="Edzőink"
          description={homeContent.coaches.text}
          ctaLabel="Ismerd meg edzőinket"
          ctaHref="/edzok"
          images={homeContent.coaches.images}
        />

        {/* FLEXIBLE CONTENT – WORDPRESS */}
        <FlexibleContentRenderer
          blocks={homeContent.blocks}
        />

        {/* LEGFRISSEBB HÍREK – WORDPRESS */}
        <LatestNewsSection news={news} />

        {/* KAPCSOLAT / GALÉRIA */}
        <ContactGallerySection
          galleryImageSrc="/images/gallery.jpg"
          galleryImageAlt="Szigeti Bikák csapat"
          galleryHref="https://www.facebook.com/groups/1461173688912451"
          mapImageSrc="/images/map.jpg"
          mapImageAlt="Pesterzsébet Jégcsarnok térkép"
          address="Budapest, Zodony u. 1, 1203"
          addressHref="https://maps.app.goo.gl/fEhsTxPFadxxh5bP7"
          email="szigetibikak@szigetibikak.hu"
          phone="+36 30 532 2254"
        />
      </main>
    </>
  );
}