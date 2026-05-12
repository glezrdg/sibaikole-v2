import { PageHero, Works, ContactCTA } from "../V2Page";

export const metadata = {
  title: "Proyectos — Sibaikole",
  description: "Portafolio de obras entregadas en retail, hospitalidad y comercial.",
};

export default function ProyectosPage() {
  return (
    <>
      <PageHero
        eyebrow="Portafolio"
        title={<>Lo que hemos construido.</>}
        sub="Una selección de las obras entregadas en retail, hospitalidad y comercial. Filtra por categoría para ver casos parecidos al tuyo."
      />
      <Works />
      <ContactCTA />
    </>
  );
}
