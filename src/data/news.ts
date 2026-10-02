import type { NewsItem } from "@/types/news";

export const news: NewsItem[] = [
  {
    id: 1,
    title: "Tornát nyertünk Losoncon",
    slug: "tornat-nyertunk-losoncon",
    imageSrc: "/news/losonc.jpg",
    imageAlt: "Szigeti Bikák csapata a losonci tornán",
    excerpt:
      "Nagyszerű hétvégét zárt a csapatunk Losoncon.",
    date: "2026-09-28",
    href: "/hirek/tornat-nyertunk-losoncon",
    content: `
      A Szigeti Bikák csapata nagyszerű teljesítménnyel
      zárta a losonci tornát.

      A játékosok az egész hétvége során fegyelmezetten,
      nagy energiával és igazi csapatként játszottak.

      Gratulálunk minden játékosnak és edzőnek!
    `,
  },
  {
    id: 2,
    title: "Újabb sikeres hétvégén vagyunk túl",
    slug: "ujabb-sikeres-hetvege",
    imageSrc: "/news/hetvege.jpg",
    imageAlt: "Szigeti Bikák mérkőzés",
    excerpt:
      "Ismét eseménydús hétvégét zártak csapataink.",
    date: "2026-09-20",
    href: "/hirek/ujabb-sikeres-hetvege",
    content: `
      Újabb mozgalmas hétvégén vannak túl a Szigeti Bikák.

      Csapataink több mérkőzésen is jégre léptek,
      ahol rengeteg értékes tapasztalatot szereztek.

      Köszönjük a szülők és szurkolók támogatását!
    `,
  },
  {
    id: 3,
    title: "Elkezdődött az új szezon",
    slug: "elkezdodott-az-uj-szezon",
    imageSrc: "/news/szezon.jpg",
    imageAlt: "Szigeti Bikák szezonnyitó",
    excerpt:
      "Újra megtelt élettel a jégpálya.",
    date: "2026-09-10",
    href: "/hirek/elkezdodott-az-uj-szezon",
    content: `
      Elkezdődött az új jégkorongszezon.

      A játékosok újult energiával tértek vissza a jégre,
      és már javában zajlanak az edzések.

      Hajrá Bikák!
    `,
  },
];