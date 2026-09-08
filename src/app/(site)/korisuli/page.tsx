import { Hero } from "@/components/Hero";
import { JourneyTimelineSection } from "@/components/JourneyTimelineSection";
import { SectionCard } from "@/components/SectionCard";
import { JoinUsSection } from "@/components/JoinUsSection";

export default function JoinUsPage() {
  return (
    <>
        <Hero
          title="Legyél te is jégkorongos"
          label="Az utad a jégre - lépésről lépésre. Egy útra hívunk, ahol minden gyerek a saját tempójában, biztonságosan és élményeken keresztül jut el a jégtől a csapatjátékig."
        />

        <JourneyTimelineSection
          steps={[
            {
            number: 1,
            title: "Az első élmény a jégen",
            description:
              "Ha még sosem korcsolyáztál, vagy csak most ismerkedsz a jéggel, itt kezdődik minden.",
            bullets: [
              "az egyensúlyt",
              "a csúszást, fékezést, fordulást",
              "és azt, hogy a jég barát, nem ellenség",
            ],
            closing:
              "Minden szombaton várjuk a legkisebbeket is, biztonságos környezetben, sok játékkal, nevetéssel és sikerélménnyel.",
            imageSrc: "/images/journey/step-1.png",
            imageAlt: "Korisuli",
            },
            {
            number: 2,
            title: "Találkozás a jégkoronggal",
            description:
              "Ha már magabiztosan állsz a korcsolyán, jöhet a következő szint.",
            bullets: [
              "megismerkedsz az ütővel és a koronggal",
              "tanulod a lövést, passzolást, vezetést",
              "és közben rengeteget játszunk",
            ],
            closing:
              "Itt dől el, hogy beleszeretsz-e a jégkorongba. A cél nem a teljesítmény, hanem az élmény.",
            imageSrc: "/images/journey/step-2.png",
            imageAlt: "Hoki suli",
            },
            {
            number: 3,
            title: "A játék igazi világa",
            description:
              "Ha megszeretted a sportot, belépsz a csapatba.",
            bullets: [
              "edzésenként 5-6 edző figyeli és segíti a fejlődésed",
              "csapatban tanulsz, küzdesz, nyersz és veszítesz",
              "barátságok születnek, élmények gyűlnek",
            ],
            closing:
              "Ez már nem csak sport, hanem közösség, élmény, életforma.",
            imageSrc: "/images/journey/step-3.png",
            imageAlt: "Csapat",
            },
            {
            number: 4,
            title: "A te történeted",
            description:
              "Innen már a saját utad következik.",
            bullets: [
              "versenyszerű jégkorong",
              "hobbi és közösségi sport",
              "egyéni fejlődési utak",
            ],
            closing:
              "A Szigeti Bikáknál minden játékos megtalálhatja a saját útját.",
            imageSrc: "/images/journey/step-4.png",
            imageAlt: "Saját út",
            },
          ]}
        />

        <SectionCard
          title="Ez a te utad lehet"
          description={
            <>
              <p>A jég, az ütő, a csapat, a közösség.</p>
              <p>Egy hely, ahol tanulsz, fejlődsz, barátokat szerzel és élményeket gyűjtesz.</p>
              <p><strong>Ha szeretnél jégkorongos lenni, nálunk jó helyen kezded.</strong></p>
            </>
          }
          ctaLabel="Csatlakozz hozzánk"
					ctaHref="#"
          imageSrc="/images/korisuli.png"
          imageAlt="Ez a te utad lehet"
          imagePosition="right"
          layout="half"
        />
        
        <JoinUsSection />
    </>
  );
}