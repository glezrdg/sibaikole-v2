import { PageHero, Contact } from "../V2Page";

export const metadata = {
  title: "Contáctanos — Sibaikole",
  description: "Hablemos de tu proyecto. Respondemos en 24–48h.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contáctanos"
        title={<>Hablemos de <br />tu proyecto.</>}
        sub="Llámanos, escríbenos o visítanos. Respondemos en menos de 48 horas hábiles."
      />
      <Contact />
    </>
  );
}
