import { EvaluationPillarsSection } from "@/components/EvaluationPillarsSection";
import { FeatureGridSection } from "@/components/FeatureGridSection";
import { MonthlyProcessSection } from "@/components/MonthlyProcessSection";
import { SecondaryHero } from "@/components/SecondaryHero";
import { SectionCard } from "@/components/SectionCard";

export default function ReaktPage() {
  return (
    <>
        <SecondaryHero
            title="reakt - visszajelzés, ami valódi irányt mutat"
            label="Havi szakmai és mentális értékelés. Követhető fejlődés. Személyes edzői iránymutatás."
            backgroundImage="/alt-hero-2.png"
        />

        <FeatureGridSection
          items={[
            {
              iconSrc: "/calendar.svg",
              lines: [
                "Havi visszajelzés",
                "Minden hónapban friss",
                "értékelés",
              ],
            },
            {
              iconSrc: "/development.svg",
              lines: [
                "Két értékelési pillér",
                "Mentális állapot és",
                "készségfejlődés",
              ],
            },
            {
              iconSrc: "/progress.svg",
              lines: [
                "Követhető fejlődési út",
                "Korábbi teljesítményed",
                "mérve",
              ],
            },
          ]}
        />

        <MonthlyProcessSection
          eyebrow="Így működik"
          title="Havi rendszerességgel"
          items={[
            {
              iconSrc: "/evaluation.svg",
              description:
                "Az edzői stáb minden hónapban értékeli a játékosokat",
            },
            {
              iconSrc: "/notification.svg",
              description:
                "e-mail értesítést kapsz",
            },
            {
              iconSrc: "/feedback.svg",
              description:
                "belépve az aktuális havi visszajelzést látod részletesen",
            },
            {
              iconSrc: "/statistics.svg",
              description:
                "alatta grafikonon követheted a korábbi hónapok eredményeit",
            },
          ]}
        />

        <EvaluationPillarsSection
          title="Az értékelés két pillére"
          left={{
            title: "Mentális állapot",
            description:
              "A mentális visszajelzés mindig az adott hónap összképét mutatja. Nem hasonlítjuk össze a korábbi hónapokkal - azt nézzük: milyen volt a gyermek ebben a hónapban.",
            listTitle: "Értékelt területek:",
            items: [
              "Figyelem edzésen és mérkőzésen",
              "Csapatszellem, közösségen belüli viselkedés",
              "Edzésmunka, hozzáállás",
              "Pályán kívüli viselkedés, öltözői hozzáállás",
            ],
          }}
          right={{
            title: "Skill fejlődés",
            description:
              "A jégkorongos képességeket 5 fő területre bontjuk, és mindig a gyermek saját korábbi teljesítményéhez mérjük. Nem másokhoz hasonlítjuk - hanem önmagához.",
            listTitle: "Értékelt készségek:",
            items: [
              "Korongkezelés",
              "Korcsolyázás technika és sebesség",
              "Lövés technika és hatékonyság",
              "Passz és csapatjáték",
              "Játékérzék, játék olvasása",
            ],
            footer:
              "Így pontosan látod, miben lépett előre a gyermeked - és hol kell extra figyelem.",
          }}
        />

        <SectionCard
          eyebrow="Közvetlen értékelés első kézből"
          title="Szöveges értékelés - a valódi iránytű"
          description={
            <>
            <p>Minden értékeléshez tartozik egy részletes edzői szöveg:</p>
            <ul> 
              <li>mi működött jól</li>
              <li>hol történt fejlődés</li>
              <li>min kell dolgozni a következő időszakban,</li>
              <li>mire kell figyelni mentálisan és szakmailag.</li>
            </ul>
            <p>Ez az a rész, ahol a számok mögé nézünk - és valódi tartalmat adunk a fejlődésnek.</p>
            </>
          }
          imageSrc="/images/fun-2.png"
          imagePosition="left"
          layout="half"
        />
        <SectionCard
          eyebrow="Részletes és átlátható"
          title="Grafikonok - több nézőpont, egy kép"
          description={
            <>
            <p>A rendszer több viszonyítási pontot mutat:</p>
            <ul> 
              <li>saját előző hónaphoz képest</li>
              <li>saját éves átlag</li>
              <li>korosztályos átlag</li>
              <li>havi „TOP átlag” - a legerősebb teljesítmények</li>
            </ul>
            <p>Így pontosan látod</p>
            <ul> 
              <li>hol tart most a gyermeked</li>
              <li>honnan indult</li>
              <li>korosztályos átlag</li>
              <li>merre halad</li>
            </ul>
            </>
          }
          imageSrc="/images/image-1.png"
          imagePosition="right"
          layout="half"
        />
        <SectionCard
          eyebrow="elérhető más klubok számára is"
          title="nem csak a Szigeti Bikáknak"
          description={
            <>
            <p>A REAKT rendszert a Szigeti Bikák fejlesztette ki, de nem csak saját klubunk számára elérhető. <br />Ha te is szeretnél</p>
            <ul> 
              <li>átlátható visszajelző rendszert</li>
              <li>strukturált fejlődéskövetést,</li>
              <li>modern, szülőbarát értékelést a klubodban</li>
            </ul>
            <p>akkor a REAKT megoldást kínál.</p>
            <p>Vedd fel velünk a kapcsolatot, és ismerd meg a részleteket!</p>
            </>
          }
          ctaLabel="Kapcsolatfelvétel"
					ctaHref="#"
          imageSrc="/images/fun-2.png"
          imagePosition="left"
          layout="half"
        />
    </>
  );
}