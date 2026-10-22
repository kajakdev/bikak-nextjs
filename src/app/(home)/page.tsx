import { Header } from "@/components/Header";
import { HomeHeroSlider } from "@/components/HomeHeroSlider";
import { VisionSocialSection } from "@/components/VisionSocialSection";
import { CoachesSection } from "@/components/CoachesSection";
import { SectionCard } from "@/components/SectionCard";
import { ContactGallerySection } from "@/components/ContactGallerySection";
import { LatestNewsSection } from "@/components/LatestNewsSection";
import { getLatestNews } from "@/lib/wordpress";

export default async function HomePage() {
  const news = await getLatestNews();

  return (
    <>
      <HomeHeroSlider
        slides={[
          {
            imageSrc: "/images/slider.jpg",
            imageAlt: "Szigeti Bikák U12 kupagyőzelem",
            badge: "2025 MOST. U12 KUPAGYŐZELEM",
          },
          {
            imageSrc: "/images/slider.jpg",
            imageAlt: "Szigeti Bikák csapat",
            badge: "Új szezon, új célok",
          },
        ]}
      />

      <Header />

      <main>
        <VisionSocialSection
            visionTitle="Víziónk"
            visionText="A Szigeti Bikák egyedülálló fejlesztési rendszerrel és egyénre szabott visszajelzésekkel támogatja a játékosok folyamatos fejlődését. Munkánkat nemzetközi minták és élvonalbeli szakmai szemlélet alapján építjük fel, hogy játékosaink már fiatal korban a legmagasabb szint elvárásaihoz szokjanak hozzá. Ismerd meg klubunk vízióját és hosszú távú fejlesztési programunkat, amely a magyar és a nemzetközi jégkorong világába is utat nyit a gyerekek előtt."
            visionImageSrc="/images/vision.jpg"
            visionImageAlt="Szigeti Bikák"
            visionHref="/rolunk"
            visionBtnLabel="A Bikák víziója"
            facebookHref="https://www.facebook.com/szigetibikakse"
            instagramHref="https://www.instagram.com/szigeti_bikak"
        />

        <CoachesSection
            title="Edzőink"
            description="A Szigeti Bikáknál olyan professzionális szakmai stáb dolgozik, amely nemzetközi tapasztalattal és elismeréssel rendelkező edzőkből áll. Edzőink nemcsak a jégen, hanem az élet más területein is példát mutatnak – értékeket, hozzáállást és jövőképet adnak át a gyerekeknek. Ismerd meg őket, és lásd, kik állnak nap mint nap a fejlődés mögött."
            ctaLabel="Ismerd meg edzőinket"
            ctaHref="/edzok"
            images={[
                {
                src: "/images/coaches/edzok_eletkepek_01.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_02.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_03.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_04.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_06.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_07.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_08.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_09.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_10.jpg",
                alt: "Edzőink munka közben",
                size: "small",
                },
                {
                src: "/images/coaches/edzok_eletkepek_11.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_12.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_13.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_14.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_15.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_16.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_17.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_18.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
                {
                src: "/images/coaches/edzok_eletkepek_19.jpg",
                alt: "Edzőink munka közben",
                size: "large",
                },
            ]}
        />
        <SectionCard
          title="Future is now"
          lead="A Future is Now a Szigeti Bikák egyedi egyéni fejlesztési programja, amely a játékosok képességeire építve segíti a tudatos, célzott fejlődést."
          description={
            <p>
              Az alapmozgásoktól egészen a legmagasabb szintű
              technikai kivitelezésig fejlesztünk, modern
              módszerekkel és innovatív eszközökkel támogatva
              a tanulást. Itt minden játékos személyre szabott
              figyelmet kap, hogy a benne rejlő maximumot
              hozhassa ki magából.
            </p>
          }
          images={[
            {
              src: "/images/fun_intro_01.jpg",
              alt: "Future is Now",
            },
            {
              src: "/images/fun_intro_02.jpg",
              alt: "Future is Now",
            },
            {
              src: "/images/fun_intro_03.jpg",
              alt: "Future is Now",
            },
          ]}
          badgeImage="/future-is-now-logo.png"
          badgeAlt="Future is Now Hockey Program"
          imagePosition="right"
          layout="half"
          ctaLabel="Fejlődj te is nálunk"
          ctaHref="/fun"
        />
        <SectionCard
          title="Reakt"
          lead="A REAKT rendszerrel a szülők minden hónapban személyre szabott visszajelzést kapnak gyermekük fejlődéséről. "
          description={
            <p>
              Nemcsak a technikai tudást mérjük, hanem a hozzáállást, a munkamorált, a mentális állapotot és az előrelépés irányát is. Átlátható, érthető és valódi képet adunk arról, hol tart a gyerek - és merre halad tovább.
            </p>
          }
          images={[
            {
              src: "/images/reakt_intro_01.jpg",
              alt: "Reakt",
            },
            {
              src: "/images/reakt_intro_02.jpg",
              alt: "Reakt",
            },
            {
              src: "/images/reakt_intro_03.jpg",
              alt: "Reakt",
            },
          ]}
          badgeImage="/reakt.svg"
          badgeAlt="Reakt"
          imagePosition="left"
          layout="half"
          ctaLabel="Wow, ilyen van?"
          ctaHref="/reakt"
        />
        <SectionCard
          title="Korisuli"
          lead="Ide jön a Korisuli szöveg intro része"
          description={
            <p>
              Az alapmozgásoktól egészen a legmagasabb szintű
              technikai kivitelezésig fejlesztünk, modern
              módszerekkel és innovatív eszközökkel támogatva
              a tanulást. Itt minden játékos személyre szabott
              figyelmet kap, hogy a benne rejlő maximumot
              hozhassa ki magából.
            </p>
          }
          images={[
            {
              src: "/images/korisuli_intro_01.jpg",
              alt: "Korisuli",
            },
            {
              src: "/images/korisuli_intro_02.jpg",
              alt: "Korisuli",
            },
            {
              src: "/images/korisuli_intro_03.jpg",
              alt: "Korisuli",
            },
          ]}
          badgeImage="/korisuli-logo.png"
          badgeAlt="Korisuli"
          imagePosition="right"
          layout="half"
          ctaLabel="Próbáld ki te is"
          ctaHref="/korisuli"
        />
        <LatestNewsSection news={news} />
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