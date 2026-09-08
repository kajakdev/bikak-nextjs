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
          role: "Szakmai igazgató, vezető edző U12",
          imageSrc: "/images/coaches/illes.jpg",
          },
          {
          name: "Edző neve",
          role: "Vezető edző U10",
          imageSrc: "/images/coaches/illes.jpg",
          },
          {
          name: "Edző neve",
          role: "Edző U8",
          imageSrc: "/images/coaches/illes.jpg",
          },
          {
          name: "Edző neve",
          role: "Kapusedző",
          imageSrc: "/images/coaches/illes.jpg",
          },
          {
          name: "Edző neve",
          role: "Erőnléti edző",
          imageSrc: "/images/coaches/illes.jpg",
          },
          {
          name: "Edző neve",
          role: "Edző U14",
          imageSrc: "/images/coaches/illes.jpg",
          },
        ]}
      />
    </>
  );
}