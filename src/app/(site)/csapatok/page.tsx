import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Csapatok",
};

import { Hero } from "@/components/Hero";
import { SectionCard } from "@/components/SectionCard";

export default function TeamsPage() {
  return (
    <>
      <Hero
        title="Csapataink"
        label="A Szigeti Bikák víziója teljesen egyedülálló Magyarországon. Olyan hosszú távú fejlesztési rendszert építünk, amely nem kampányszerűen, hanem tudatosan, évről évre formálja a gyerekeket sportolóvá és emberré. Munkánk három erős alappillérre épül, amelyek együtt adják azt a nemzetközi szemléletű klubmodellt, amelyben hiszünk."
      />

      <SectionCard
        title="U8"
        description={
          <>
            <p><strong>Bajnokság: </strong>Piros, Sárga, Kék</p>
            <p>Edzők:
              <ul>
                <li>Csehy Zsombor</li>
                <li>Lévay Pál</li>
                <li>Szabó Zsolt</li>
                <li>Veres János</li>
                <li>Balogh Bettina</li>
                <li>Balogh Brigitta</li>
                <li>Horváth André</li>
              </ul>
            </p>
          </>
        }
        images={[
          {
            src: "/images/teams/U8_01.jpg",
            alt: "U8",
          },
          {
            src: "/images/teams/U8_02.jpg",
            alt: "U8",
          },
          {
            src: "/images/teams/U8_03.jpg",
            alt: "U8",
          },
        ]}
        imagePosition="right"
        layout="half"
      />
      <SectionCard
        title="U10"
        description={
          <>
            <p><strong>Bajnokság: </strong>Piros, Sárga, Kék</p>
            <p>Edzők:
              <ul>
                <li>Kövesi Balázs</li>
                <li>Oláh Nándor</li>
                <li>Galló Illés</li>
                <li>Pajor Balázs</li>
                <li>Horváth André</li>
              </ul>
            </p>
          </>
        }
        images={[
          {
            src: "/images/teams/U10_01.jpg",
            alt: "U10",
          },
          {
            src: "/images/teams/U10_02.jpg",
            alt: "U10",
          },
          {
            src: "/images/teams/U10_03.jpg",
            alt: "U10",
          },
        ]}
        imagePosition="left"
        layout="half"
      />
      <SectionCard
        title="U12"
        description={
          <>
            <p><strong>Bajnokság: </strong>Piros, Sárga, Kék, RSHL (SLO)</p>
            <p>Edzők:
              <ul>
                <li>Galló Illés</li>
                <li>Oláh Nándor</li>
                <li>Pajor Balázs</li>
                <li>Horváth André</li>
              </ul>
            </p>
          </>
        }
        images={[
          {
            src: "/images/teams/U12_01.jpg",
            alt: "U12",
          },
          {
            src: "/images/teams/U12_02.jpg",
            alt: "U12",
          },
          {
            src: "/images/teams/U12_03.jpg",
            alt: "U12",
          },
        ]}
        imagePosition="right"
        layout="half"
      />
      <SectionCard
        title="U14"
        description={
          <>
            <p><strong>Bajnokság: </strong>B1</p>
            <p>Edzők:
              <ul>
                <li>Csehy Zsombor</li>
                <li>Galló Illés</li>
                <li>Modok Levente</li>
                <li>Horváth André</li>
              </ul>
            </p>
          </>
        }
        images={[
          {
            src: "/images/teams/U14_01.jpg",
            alt: "U14",
          },
          {
            src: "/images/teams/U14_02.jpg",
            alt: "U14",
          },
          {
            src: "/images/teams/U14_03.jpg",
            alt: "U14",
          },
        ]}
        imagePosition="left"
        layout="half"
      />
      <SectionCard
        title="U19"
        description={
          <>
            <p><strong>Bajnokság: </strong>B1</p>
            <p>Edzők:
              <ul>
                <li>Szappanos Dávid</li>
                <li>Ábrahám Péter</li>
                <li>Modok Levente</li>
                <li>Horváth André</li>
              </ul>
            </p>
          </>
        }
        images={[
          {
            src: "/images/teams/U19_01.jpg",
            alt: "U19",
          },
          {
            src: "/images/teams/U19_02.jpg",
            alt: "U19",
          },
          {
            src: "/images/teams/U19_03.jpg",
            alt: "U19",
          },
        ]}
        imagePosition="right"
        layout="half"
      />
    </>
  );
}