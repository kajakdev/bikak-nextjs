import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edzők",
};

import { Hero } from "@/components/Hero";
import { CoachesGridSection } from "@/components/CoachesGridSection";

export default function CoachesPage() {
  return (
    <>
      <Hero
        title="Edzőink"
        label="A Szigeti Bikáknál az edzői munka nem csak szakma, hanem hivatás. Egyetlen alapelvünk van: nálunk csak olyan edző dolgozhat, aki valóban szeret a gyerekekkel foglalkozni."
      />

      <CoachesGridSection
        intro={`Edzőink hisznek a példamutatásban. Nemcsak a jégen, hanem emberileg is irányt mutatnak: munkamorálban, hozzáállásban, tiszteletben és kitartásban. Amit a gyerekek látnak tőlük nap mint nap, az nem csak technika, hanem életminta is.

        A szakmai fejlődés számunkra nem választás, hanem kötelesség. Edzőink folyamatosan képzik magukat nemzetközi irányelvek alapján, külföldi tapasztalatokból tanulnak, figyelik a modern jégkorong legjobb módszereit. Így egy olyan dinamikus, fejlődő edzői csapatunk van, amely egyszerre erős szakmailag és emberileg is – és ebből a gyerekek profitálnak a legtöbbet.`}
        coaches={[
          {
          name: "Galló Illés",
          role: "Szakmai igazgató, vezető edző U14",
          imageSrc: "/images/coaches/szb_edzok_illes.jpg",
          },
          {
          name: "Niko Souoroniemi",
          role: "U19 edző",
          imageSrc: "/images/coaches/szb_edzok_niko.jpg",
          },
          {
          name: "Szappanos Dávid",
          role: "U19 vezetőedző",
          imageSrc: "/images/coaches/szb_edzok_szapi.jpg",
          },
          {
          name: "Csehy Zsombor",
          role: "U14 edző / u8 vezetőedző",
          imageSrc: "/images/coaches/szb_edzok_zsombi.jpg",
          },
          {
          name: "Oláh Nándor",
          role: "U12 vezetőedző",
          imageSrc: "/images/coaches/szb_edzok_nandi.jpg",
          },
          {
          name: "Kövesi Balázs",
          role: "U10 vezetőedző",
          imageSrc: "/images/coaches/szb_edzok_kavics.jpg",
          },
          {
          name: "Lévai Pál",
          role: "U8 edző",
          imageSrc: "/images/coaches/szb_edzok_pali_bacsi.jpg",
          },
          {
          name: "Ábrahám Péter",
          role: "u10 edző / u12 edző",
          imageSrc: "/images/coaches/ceti.jpg",
          },
          {
          name: "Pajor Balázs",
          role: "U10 edző",
          imageSrc: "/images/coaches/szb_edzok_bazsi.jpg",
          },
          {
          name: "Horváth André",
          role: "kapus vezetőedző",
          imageSrc: "/images/coaches/szb_edzok_andre.jpg",
          },
          {
          name: "Nagy Kristóf",
          role: "Kapusedző",
          imageSrc: "/images/coaches/szb_edzok_kiko.jpg",
          },
          {
          name: "Modok Levente",
          role: "Erőnléti edző",
          imageSrc: "/images/coaches/szb_edzok_modi.jpg",
          },
          {
          name: "Szabó Zsolt",
          role: "U8 edző",
          imageSrc: "/images/coaches/szb_edzok_zsolt.jpg",
          },
          {
          name: "Veres János",
          role: "Korisuli / u8 edző",
          imageSrc: "/images/coaches/szb_edzok_jana.jpg",
          },
          {
          name: "Vajda Virág",
          role: "Korisuli / u8 edző",
          imageSrc: "/images/coaches/szb_edzok_virag.jpg",
          },
          {
          name: "Balogh Bettina",
          role: "Korisuli / u8 edző",
          imageSrc: "/images/coaches/szb_edzok_bogi.jpg",
          },
          {
          name: "Balogh Brigitta",
          role: "Korisuli / u8 edző",
          imageSrc: "/images/coaches/szb_edzok_brigi.jpg",
          },
        ]}
      />
    </>
  );
}