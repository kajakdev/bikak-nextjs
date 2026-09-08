import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rólunk",
};

import { Hero } from "@/components/Hero";
import { SectionCard } from "@/components/SectionCard";

export default function VisionPage() {
  return (
    <>
      <Hero
        title="Víziónk"
        label="A Szigeti Bikák víziója teljesen egyedülálló Magyarországon. Olyan hosszú távú fejlesztési rendszert építünk, ahol tudatosan, évről évre formálja a gyerekeket sportolóvá és emberré."
      />

      <SectionCard
        eyebrow="1. pillér"
        title="Egy edző, egy út, egy történet"
        description={
          <>
            <p>Nálunk a gyerekek nem „kézről kézre” járnak. Az edzők már U6-os kortól egészen a kifutó korosztályig ugyanazokkal a gyerekekkel dolgoznak. Aki óvodásként elkezdi nálunk a jégkorongot, azt ugyanaz a szakmai szemlélet és edzői csapat vezeti végig az egész utánpótlás-úton.</p>
            <p>Ez a modell nemzetközi mintára épül: azokban az országokban alkalmazzák, ahol hosszú távon sikeres, stabil és erős jégkorongkultúra működik. Mi hiszünk abban, hogy az igazi fejlődéshez idő, bizalom és következetes szakmai munka kell - nem évente változó irányok.</p>
          </>
        }
        imageSrc="/images/about-1.png"
        imageAlt="Egy edző, egy út, egy történet"
        imagePosition="right"
        layout="third"
      />
      <SectionCard
        eyebrow="2. pillér"
        title="Nemzetközi mérce, mindenkinek saját út"
        description={
          <>
            <p>
              A gyerekeket nem a hazai mezőnyhöz, hanem a nemzetközi
              szinthez mérjük. Klubunkat tudatosan úgy építettük fel,
              hogy azok a játékosok, akik nemzetközi szinten szeretnének
              jégkorongozni, folyamatosan kapjanak erre lehetőséget:
              nemzetközi tornákon, túrákon, erős ellenfelek ellen,
              valódi kihívások között.
            </p>

            <div>
              <p>Ugyanakkor nálunk mindenki megtalálja a helyét:</p>

              <ul>
                <li>azok is, akik a legmagasabb szintre törnek,</li>
                <li>
                  és azok is, akik „csak” szeretnék megtanulni és
                  élvezni ezt a sportot.
                </li>
              </ul>
            </div>

            <p>
              <strong>
                Nem egyforma célokat adunk a gyerekeknek, hanem
                egyformán komolyan vesszük mindegyik útjukat.
              </strong>
            </p>

            <p>
              Hosszú távú célunk az is, hogy a nálunk nevelkedő
              játékosokat segítsük tovább a fejlődésben: hazai és
              nemzetközi akadémiákra, magasabb szintű klubokhoz. Nem
              elengedjük őket, hanem végigkísérjük ezen az úton –
              szakmailag, emberileg és kapcsolatrendszerrel is támogatva.
            </p>
          </>
        }
        imageSrc="/images/about-2.png"
        imageAlt="Nemzetközi mérce, mindenkinek saját út"
        imagePosition="right"
        layout="third"
      />
      <SectionCard
        eyebrow="3. pillér"
        title="Folyamatos visszajelzés és átláthatóság"
        description={
          <>
            <p>
              A fejlődéshez tudni kell, hol tartunk. Klubunkban egy teljesen egyedi, innovatív visszajelzőrendszer működik, amelyben:
              <ul>
                <li>a gyerekek</li>
                <li>és a szülők is</li>
              </ul>
              folyamatos képet kapnak a szakmai és mentális fejlődésről.
            </p>
            <p>Nem találgatunk, nem homályos mondatokkal dolgozunk: mérünk, visszajelzünk, irányt mutatunk. Ez a rendszer adja meg azt a biztonságot, hogy mindenki tudja, mi történik a jégen - és miért.</p>
          </>
        }
        imageSrc="/images/about-3.png"
        imageAlt="Folyamatos visszajelzés és átláthatóság"
        imagePosition="right"
        layout="third"
      />
      <SectionCard
        title="A szülők szerepe - Közösséget építünk"
        description={
          <>
            <p>A víziónk nem működik szülők nélkül. Hiszünk abban, hogy a gyerek csak akkor tud igazán fejlődni, ha mögötte stabil, támogató közeg áll.</p>
            <p>
              Ezért:
              <ul>
                <li>tudatosan építjük a szülői közösséget,</li>
                <li>előadásokat, beszélgetéseket, csapatépítő programokat szervezünk,</li>
                <li>nyíltan, transzparensen kommunikálunk minden fontos kérdésről.</li>
              </ul>
            </p>
            <p>
              A Szigeti Bikák nem csak egy klub. Egy közösség, ahol gyerek, edző és szülő együtt dolgozik ugyanazért a célért.
            </p>
          </>
        }
        imageSrc="/images/about-4.png"
        imageAlt="A szülők szerepe - Közösséget építünk"
        imagePosition="right"
        layout="half"
      />
      <SectionCard
        title="A mi víziónk"
        description={
          <>
            <p>
              Nem rövid távra építünk. <br />
              Nem gyors sikerekre. <br />
              Hanem egy olyan rendszerre, amely évek múlva is erős játékosokat, stabil embereket és összetartó közösséget ad.
            </p>
            <p>
              Ha hiszel a hosszú távú munkában, a nemzetközi szemléletben és az értékalapú sportban, akkor a Szigeti Bikák a te helyed.
            </p>
            <p>
              <strong>Csatlakozz hozzánk, és építsük együtt a jövő jégkorongját!</strong>
            </p>
          </>
        }
        ctaLabel="Csatlakozz hozzánk"
        ctaHref="#"
        imageSrc="/images/about-5.png"
        imageAlt="A mi víziónk"
        imagePosition="right"
        layout="half"
      />
    </>
  );
}