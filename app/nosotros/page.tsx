import { PageHero, About, ContactCTA } from "../V2Page";

export const metadata = {
  title: "Nosotros — Sibaikole",
  description: "Estudio dominicano de arquitectura, construcción y remodelación. Fundado en Santo Domingo en 2009.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre Sibaikole"
        title={<>Más de 15 años <br />construyendo en RD.</>}
        sub="Conoce el equipo detrás de cada obra, los principios que guían nuestro trabajo y los números que respaldan nuestra trayectoria."
      />
      <About />
      <ContactCTA />
    </>
  );
}
