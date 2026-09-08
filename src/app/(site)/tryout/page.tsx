import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tryout",
};

import { Hero } from "@/components/Hero";
import { TryoutFormSection } from "@/components/TryoutFormSection";

export default function TryoutPage() {
  return (
    <>
        <Hero
          title="Tryout"
          label="Gyere és próbáld ki magad a Szigeti Bikák edzésein! Várjuk a játékosok jelentkezését az U8-as korosztálytól egészen az U19-es korosztályig."
        />
        
        <TryoutFormSection />
    </>
  );
}