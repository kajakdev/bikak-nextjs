import { Hero } from "@/components/Hero";
import { JoinUsSection } from "@/components/JoinUsSection";
import { LocationSection } from "@/components/LocationSection";

export default function JoinUsPage() {
  return (
    <>
        <Hero
          title="Kapcsolat"
          label="A jégen kezdődik, de messze túlmutat rajta. A Szigeti Bikáknál U8-tól U19-ig kísérjük a fiatalokat a jégkorong első lépéseitől a versenysportig."
        />

        <LocationSection
            title="Szigeti Bikák SE"
            address="1203 Budapest, Zodony u. 1,"
            email="szigetibikak@szigetibikak.hu"
            phone="+36 30 532 2254"
            venueName="Pesterzsébet Jégcsarnok"
            venueLink="https://ul.waze.com/ul?ll=47.43210090%2C19.09799337&navigate=yes&zoom=17&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
            directionsText="A Pesterzsébeti Jégcsarnok (címe: Budapest, Zodony utca 1.) legkönnyebben a Soroksári út / Helsinki út felől autóval, vagy a közeli Pesterzsébet vasútállomásnál megálló 119-es, 151-es, 223E, 224-es vagy 36-os autóbusszal, illetve a H6-os HÉV-vel közelíthető meg. A megállótól mindössze 2 perc séta."
            mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2698.930978279772!2d19.094854576304083!3d47.432789199964155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741c2a9f7943221%3A0x9ea2a2b01c7809d1!2sPesterzs%C3%A9bet%20J%C3%A9gcsarnok!5e0!3m2!1shu!2shu!4v1788821240263!5m2!1shu!2shu"
        />
        
        <JoinUsSection />
    </>
  );
}