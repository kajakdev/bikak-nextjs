import Image from "next/image";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/Button";
import { Hero } from "@/components/Hero";
import { VisionSocialSection } from "@/components/VisionSocialSection";
import { CoachesSection } from "@/components/CoachesSection";
import { ContactGallerySection } from "@/components/ContactGallerySection";
import { CoachesGridSection } from "@/components/CoachesGridSection";
import { JourneyTimelineSection } from "@/components/JourneyTimelineSection";
import { JoinUsSection } from "@/components/JoinUsSection";
import { SecondaryHero } from "@/components/SecondaryHero";
import { FeatureGridSection } from "@/components/FeatureGridSection";
import { HomeHeroSlider } from "@/components/HomeHeroSlider";

export default function DesignSystem() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center">
			<Hero
				title="Víziónk"
				label="A Szigeti Bikák víziója teljesen egyedülálló Magyarországon. Olyan hosszú távú fejlesztési rendszert építünk, ahol tudatosan, évről évre formálja a gyerekeket sportolóvá és emberré. "
			/>
			
			<VisionSocialSection
				visionTitle="Víziónk"
				visionText="A Szigeti Bikák egyedülálló fejlesztési rendszerrel és egyénre szabott visszajelzésekkel támogatja a játékosok folyamatos fejlődését. Munkánkat nemzetközi minták és élvonalbeli szakmai szemlélet alapján építjük fel, hogy játékosaink már fiatal korban a legmagasabb szint elvárásaihoz szokjanak hozzá. Ismerd meg klubunk vízióját és hosszú távú fejlesztési programunkat, amely a magyar és a nemzetközi jégkorong világába is utat nyit a gyerekek előtt."
				visionImageSrc="/images/vision.jpg"
				visionImageAlt="Szigeti Bikák"
				visionHref="/vision"
				visionBtnLabel="A Bikák víziója"
				facebookHref="https://www.facebook.com/szigetibikak"
				instagramHref="https://www.instagram.com/szigetibikak"
			/>

			<CoachesSection
				title="Edzőink"
				description="A Szigeti Bikáknál olyan professzionális szakmai stáb dolgozik, amely nemzetközi tapasztalattal és elismeréssel rendelkező edzőkből áll. Edzőink nemcsak a jégen, hanem az élet más területein is példát mutatnak – értékeket, hozzáállást és jövőképet adnak át a gyerekeknek. Ismerd meg őket, és lásd, kik állnak nap mint nap a fejlődés mögött."
				ctaLabel="Ismerd meg edzőinket"
				ctaHref="/edzok"
				images={[
					{
					src: "/images/slider-1.png",
					alt: "Edzők és játékosok a jégen",
					size: "large",
					},
					{
					src: "/images/slider-2.png",
					alt: "Szigeti Bikák csapat",
					size: "small",
					},
					{
					src: "/images/slider-3.png",
					alt: "Edzés közben",
					size: "small",
					},
					{
					src: "/images/slider-1.png",
					alt: "Edzők és játékosok a jégen",
					size: "large",
					},
					{
					src: "/images/slider-2.png",
					alt: "Szigeti Bikák csapat",
					size: "small",
					},
					{
					src: "/images/slider-3.png",
					alt: "Edzés közben",
					size: "small",
					},
				]}
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
						"edzésenként 5–6 edző figyeli és segíti a fejlődésed",
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

			<JoinUsSection />

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

			<HomeHeroSlider
				slides={[
					{
					imageSrc: "/images/slider.jpg",
					imageAlt: "Szigeti Bikák U12 kupagyőzelem",
					badge: "2025 Most. U12 kupagyőzelem",
					},
					{
					imageSrc: "/images/slider.jpg",
					imageAlt: "Szigeti Bikák csapat",
					badge: "Új szezon, új célok",
					},
					{
					imageSrc: "/images/slider.jpg",
					imageAlt: "Szigeti Bikák edzés",
					badge: "Future Is Now",
					},
				]}
			/>

			<ContactGallerySection
				galleryImageSrc="/images/gallery.jpg"
				galleryImageAlt="Szigeti Bikák csapat"
				galleryHref="/galeria"
				mapImageSrc="/images/map.jpg"
				mapImageAlt="Pesterzsébet Jégcsarnok térkép"
				address="Budapest, Zodony u. 1, 1203"
				addressHref="https://maps.app.goo.gl/fEhsTxPFadxxh5bP7"
				email="szigetibikak@szigetibikak.hu"
				phone="+36 30 532 2254"
			/>

			<main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 sm:items-start">
				<Image
					className="h-[100px] w-[100px]"
					src="/logo.png"
					alt="Szigeti Bikák logo"
					width={100}
					height={100}
					priority
				/>
				<h1 className="text-3xl font-extrabold leading-10 tracking-tight mt-9 text-white">
					Typography
				</h1>
				<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
					<h1 className="heading-page text-white">
						Heading 1
					</h1>
					<h2 className="heading-section text-white">
						Heading 2
					</h2>
					<h3 className="text-xl font-bold leading-10 tracking-tight text-white">
						Heading 3
					</h3>
					<p className="eyebrow">
						Eyebrow text
					</p>
					<p className="text-white">
						Body text - Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
					<p className="text-white text-lg">
						Lead text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
				</div>
				<h1 className="text-3xl font-extrabold leading-10 tracking-tight mt-9 text-white">
					Colors
				</h1>
				<div className="flex flex-row justify-center gap-6 text-center sm:items-start sm:text-left">
					<div className="rounded flex w-full items-center justify-center bg-background p-3 m-3 text-white">
						Background Color
					</div>
					<div className="rounded flex w-full items-center justify-center bg-foreground p-3 m-3 text-white">
						Foreground Color
					</div>
					<div className="rounded flex w-full items-center justify-center bg-red p-3 m-3 text-white">
						Red Color
					</div>
					<div className="rounded flex w-full items-center justify-center bg-red-dark p-3 m-3 text-white">
						Red Dark Color
					</div>
				</div>
				<Button
					label="Button"
					href="#"
				/>
				<SectionCard
					title="Future Is Now"
					lead="A Future is Now a Szigeti Bikák egyedi egyéni fejlesztési programja, amely a játékosok képességeire építve segíti a tudatos, célzott fejlődést. "
					description="Az alapmozgásoktól egészen a legmagasabb szintű technikai kivitelezésig fejlesztünk, modern módszerekkel és innovatív eszközökkel támogatva a tanulást. Itt minden játékos személyre szabott figyelmet kap, hogy a benne rejlő maximumot hozhassa ki magából."
					ctaLabel="Fejlődj te is nálunk"
					ctaHref="#"
					imageSrc="/images/image-1.png"
					imageAlt="Future is now"
					imagePosition="right"
				/>
				<SectionCard
					eyebrow="3. pillér"
					title="Folyamatos visszajelzés és átláthatóság"
					lead="A fejlődéshez tudni kell, hol tartunk."
					description="Klubunkban egy teljesen egyedi, innovatív visszajelzőrendszer működik..."
					imageSrc="/images/image-1.png"
					imageAlt="Jégkorong edzés"
					imagePosition="right"
					layout="third"
				/>
				<SectionCard
					title="Future Is Now"
					lead="A Future is Now a Szigeti Bikák egyedi egyéni fejlesztési programja, amely a játékosok képességeire építve segíti a tudatos, célzott fejlődést. "
					description="Az alapmozgásoktól egészen a legmagasabb szintű technikai kivitelezésig fejlesztünk, modern módszerekkel és innovatív eszközökkel támogatva a tanulást. Itt minden játékos személyre szabott figyelmet kap, hogy a benne rejlő maximumot hozhassa ki magából."
					ctaLabel="Fejlődj te is nálunk"
					ctaHref="#"
					imageSrc="/images/image-1.png"
					imageAlt="Future is now"
					imagePosition="left"
				/>
			</main>
		</div>
	);
}
