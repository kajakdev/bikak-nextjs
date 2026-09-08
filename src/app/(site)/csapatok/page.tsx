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
        imageSrc="/images/u8.png"
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
        imageSrc="/images/u8.png"
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
        imageSrc="/images/u8.png"
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
        imageSrc="/images/u8.png"
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
        imageSrc="/images/u8.png"
        imagePosition="right"
        layout="half"
      />
    </>
  );
}