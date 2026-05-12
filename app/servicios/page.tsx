import { PageHero, Services, ContactCTA } from "../V2Page";

export const metadata = {
  title: "Servicios — Sibaikole",
  description: "Diseño arquitectónico, construcción y remodelación de alta calidad para proyectos que perduran.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title={<>De la idea a la entrega.</>}
        sub="Tres servicios, una misma firma. Diseño arquitectónico, ejecución de obra y remodelación bajo el mismo equipo técnico de principio a fin."
      />
      <Services />
      <ContactCTA />
    </>
  );
}
