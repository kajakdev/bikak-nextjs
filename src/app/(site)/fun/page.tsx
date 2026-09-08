import { FeatureGridSection } from "@/components/FeatureGridSection";
import { SecondaryHero } from "@/components/SecondaryHero";
import { SectionCard } from "@/components/SectionCard";

export default function FunPage() {
  return (
    <>
        <SecondaryHero
            title="Future Is Now Program"
            label="A Szigeti Bikák által megalkotott egyedi készségfejlesztő program - személyre szabva, nemzetközi szinten mérve."
            backgroundImage="/alt-hero.png"
            badgeImage="/future-is-now-logo.png"
            badgeAlt="Future Is Now Hockey Program"
        />

        <FeatureGridSection
          items={[
            {
            value: 6,
            lines: [
              "maximum 6 játékos",
              "kerül egy csoportba",
            ],
            },
            {
            value: 1,
            lines: [
              "1 edző / 1 csoport",
              "teljes figyelem",
            ],
            },
            {
            value: 9,
            lines: [
              "hónap fejlődés",
              "szeptember - májusig",
            ],
            },
          ]}
        />

        <SectionCard
          eyebrow="Mi ez a program"
          title="Future is now! program"
          description={
            <>
              <p>A Future Skills a Szigeti Bikák által megalkotott és működtetett egyedi készségfejlesztő program, amelynek célja, hogy a játékosok egyéni technikai kivitelezését nemzetközi szinthez mérve fejlessze a lehető legmagasabb szintre. Ez nem egy általános edzés, hanem egy tudatosan felépített, személyre szabott fejlesztési rendszer.</p>
              <p>A programban a gyerekek folyamatosan találkoznak a legújabb nemzetközi trendekkel, modern módszerekkel és innovatív technológiákkal. A cél nem az, hogy „mindenki ugyanazt csinálja”, hanem az, hogy minden játékos azt gyakorolja, amire neki a legnagyobb szüksége van.</p>
            </>
          }
          ctaLabel="Fejlődj te is nálunk"
					ctaHref="#"
          imageSrc="/images/image-1.png"
          imagePosition="right"
          layout="half"
        />
        <SectionCard
          eyebrow="hogyan működik?"
          title="Nem még egy edzés - Egyénre szabott fejlesztés"
          description={
            <>
            <p>A Future Skills edzéseken a gyerekeket minden héten szint szerint csoportokra bontjuk. Így:</p>
            <ul> 
              <li>mindenki a saját tudásszintjének megfelelő társakkal dolgozik</li>
              <li>a gyakorlatok nem túl könnyűek és nem túl nehezek</li>
              <li>a fejlődés valóban maximálisan kihasznált</li>
            </ul>
            <p>Egy csoportban legfeljebb 6 játékos dolgozik együtt egy edzővel, ami lehetővé teszi az állandó figyelmet, javítást és személyes visszajelzést.</p>
            </>
          }
          ctaLabel="Fejlődj te is nálunk"
					ctaHref="#"
          imageSrc="/images/fun-2.png"
          imagePosition="left"
          layout="half"
        />
        <SectionCard
          eyebrow="mitől működik?"
          title="Az igazi különlegesség"
          description={
            <>
            <p>A Future Skills egyik legnagyobb ereje, hogy nem külsős edzők dolgoznak a gyerekekkel, hanem azok a szakemberek, akik:</p>
            <ul> 
              <li>látják őket mérkőzéseken</li>
              <li>ismerik őket edzésről</li>
              <li>pontosan tudják, miben kell fejlődniük</li>
            </ul>
            <p>Ezért a fejlesztés nem sablonos, hanem valóban személyre szabott: minden játékos azt kapja, amire neki van szüksége ahhoz, hogy magasabb szintre lépjen - akár magyar, akár nemzetközi szinten.</p>
            </>
          }
          ctaLabel="Fejlődj te is nálunk"
					ctaHref="#"
          imageSrc="/images/image-1.png"
          imagePosition="right"
          layout="half"
        />
        <SectionCard
          eyebrow="Mi jelenti a fejlődést?"
          title="Folyamatosság = fejlődés"
          description={
            <>
            <p>A Future Skills nem alkalmi program. <br />Szezonokon átívelő rendszer, amely szeptembertől májusig folyamatosan működik. Azok a gyerekek fejlődnek a legtöbbet, akik:</p>
            <ul> 
              <li>rendszeresen részt vesznek</li>
              <li>hétről hétre dolgoznak</li>
              <li>hosszú távon elköteleződnek a program mellett</li>
            </ul>
            <p>A különbség látványos: technikában, magabiztosságban, játéksebességben és döntéshozatalban is.</p>
            </>
          }
          ctaLabel="Fejlődj te is nálunk"
					ctaHref="#"
          imageSrc="/images/fun-3.png"
          imagePosition="left"
          layout="half"
        />
        <SectionCard
          eyebrow="Ki vehet részt rajta?"
          title="Kinek szól?"
          description={
            <>
            <p>Elsősorban a Szigeti Bikák játékosainak, akik szeretnének:</p>
            <ul> 
              <li>gyorsabban fejlődni</li>
              <li>magasabb szintre lépni,</li>
              <li>nemzetközi mércéhez igazodni</li>
            </ul>
            <p>Ugyanakkor a program nyitott: ha érdekel a Future Skills, nem kell bikás játékosnak lenned - jelentkezhetsz a weboldalon keresztül, és megmutathatod, mire vagy képes</p>
            </>
          }
          ctaLabel="Fejlődj te is nálunk"
					ctaHref="#"
          imageSrc="/images/image-1.png"
          imagePosition="right"
          layout="half"
        />
    </>
  );
}