"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const C = {
  paper: "#F5F2EC",        // crema base (color marca)
  paperLight: "#FAF8F2",
  warm: "#E5DDC9",         // crema cálida (para fondos secundarios — antes era oliva)
  ink: "#0F0E0C",          // negro marca
  inkSoft: "#3A3936",
  mute: "#7A7672",
  red: "#590100",          // vino marca
  redSoft: "#7A1F1F",      // vino más claro
  redDeep: "#3D0001",      // vino más profundo (para fondos)
  dark: "#0B0B0B",         // negro fondo
  darkPanel: "#161513",
  darkRule: "rgba(245,242,236,0.14)",
  // Aliases legacy (eliminados conceptualmente — solo paper/warm/red/dark)
  olive: "#E5DDC9",        // alias → warm (fondos crema cálida)
  oliveLight: "#F0E9D7",   // crema cálida light (eyebrows/labels sobre dark)
};

export const NAV = [
  { label: "Inicio",      href: "/" },
  { label: "Servicios",   href: "/servicios" },
  { label: "Proyectos",   href: "/proyectos" },
  { label: "Nosotros",    href: "/nosotros" },
  { label: "Contáctanos", href: "/contacto" },
];

const SERVICES = [
  { n: "01", title: "Diseño Arquitectónico", sub: "Diseño",        desc: "Creamos diseños únicos y funcionales que reflejan la visión y necesidades de cada cliente.", image: "/images/diseno-arquitectonico.png" },
  { n: "02", title: "Construcción",          sub: "Ejecución",     desc: "Ejecutamos proyectos con los más altos estándares de calidad y seguridad.",                  image: "/images/construccion.png" },
  { n: "03", title: "Remodelación",          sub: "Intervención",  desc: "Transformamos espacios existentes para darles nueva vida y funcionalidad.",                  image: "/images/bar-remodelacion.png" },
];

type Project = {
  id: string;
  title: string;
  program: "Retail" | "Hospitalidad" | "Comercial";
  year: string;
  area: string;
  image: string;
};

const PROJECTS: Project[] = [
  { id: "lynk-and-go",  title: "Lynk & Co",    program: "Retail",       year: "2025", area: "640 m²",   image: "/projects/lynk and go/lynk1.webp" },
  { id: "crowne-plaza", title: "Crowne Plaza", program: "Hospitalidad", year: "2024", area: "1.200 m²", image: "/projects/crown plaza/foto3.webp" },
  { id: "jumbo-car",    title: "Jumbo Car",    program: "Retail",       year: "2024", area: "420 m²",   image: "/projects/jumbo car la caleta/jumbo26.webp" },
  { id: "bcdc",         title: "BCDC",         program: "Comercial",    year: "2019", area: "920 m²",   image: "/projects/bcdc/bcdc4.webp" },
  { id: "pedidosya",    title: "PedidosYa",    program: "Comercial",    year: "2023", area: "380 m²",   image: "/projects/PedidosYa/foto5.webp" },
  { id: "aniomis",      title: "Aniomis",      program: "Comercial",    year: "2021", area: "260 m²",   image: "/projects/aniomis/ani10.webp" },
];

const EXPERTISE = [
  { n: "01", title: "Entendemos qué quiere ser el espacio",    desc: "Antes de dibujar, escuchamos. Programa, uso real, normativa y contexto definen el partido de cada proyecto." },
  { n: "02", title: "Resolvemos el proyecto antes de la obra", desc: "Iteramos en planos hasta cerrar plantas, secciones y volumetría. La obra arranca con todas las decisiones técnicas tomadas." },
  { n: "03", title: "Ejecutamos sin tercerizar el criterio",   desc: "Dirección de obra propia, coordinación de oficios y control técnico continuo hasta la entrega y post-entrega." },
];

const VALUES = [
  { icon: "◆", title: "Equipo profesional",     desc: "Equipo de profesionales altamente cualificados en arquitectura, dirección de obra y oficios especializados." },
  { icon: "▲", title: "Materiales de calidad",  desc: "Trabajamos con materiales de primera calidad, seleccionados por durabilidad en clima caribeño." },
  { icon: "●", title: "Plazos y presupuestos",  desc: "Cumplimiento de plazos y presupuestos acordados. Sin sobrecostos ni promesas que rompen la confianza." },
];

const PROCESS = [
  { n: "01", title: "Levantamiento", weeks: "1–2 sem.",  desc: "Medición, contexto, programa y normativa. Base topográfica y diagnóstico técnico del sitio." },
  { n: "02", title: "Anteproyecto",  weeks: "3–5 sem.",  desc: "Plantas, secciones y volumetría. Iteración con el cliente hasta congelar el partido del proyecto." },
  { n: "03", title: "Ejecución",     weeks: "8–32 sem.", desc: "Dirección de obra, control técnico y coordinación de oficios. Reportes semanales con avance y consumo." },
  { n: "04", title: "Entrega",       weeks: "1–2 sem.",  desc: "Recepción formal, planos as-built, manual de uso y acompañamiento post-entrega los primeros meses." },
];

const TEAM = [
  { role: "Dirección y diseño",  count: "03" },
  { role: "Arquitectura",        count: "04" },
  { role: "Construcción",        count: "05" },
];

const CLIENTS = ["PedidosYa", "Crowne Plaza", "Lynk & Co", "Jumbo Car", "BCDC", "Aniomis"];

const STATS = [
  { v: "60+",  k: "Proyectos completados" },
  { v: "15+",  k: "Años en operación" },
  { v: "12+",  k: "Equipo técnico" },
];

const TESTIMONIALS = [
  { n: "01", quote: "El equipo transformó nuestra casa en el hogar de nuestros sueños. Precisión, calidad y compromiso de principio a fin.",   author: "María González · Proyecto residencial", rating: 5 },
  { n: "02", quote: "Entregaron nuestro proyecto comercial a tiempo y dentro del presupuesto acordado. Profesionalismo en cada etapa de la obra.", author: "Carlos Rodríguez · Sector comercial",    rating: 5 },
  { n: "03", quote: "Valoramos enormemente la precisión y la calidad con la que ejecutaron cada detalle. Sin sobresaltos, sin sorpresas.",      author: "Laura Martínez · Cliente",               rating: 5 },
];

const FAQ = [
  { n: "01", q: "¿En qué sectores trabaja Sibaikole?",                  a: "Retail, hospitalidad y comercial son nuestros frentes principales. Estamos abiertos a residencial alto-medio." },
  { n: "02", q: "¿Hacen sólo diseño o también construyen?",             a: "Ambos. Diseñamos, dirigimos y construimos bajo el mismo control técnico — sin tercerizar el criterio." },
  { n: "03", q: "¿Trabajan fuera de Santo Domingo?",                    a: "Sí. Hemos ejecutado obra en distintas provincias del país. Para fuera de RD evaluamos caso por caso." },
  { n: "04", q: "¿Cuánto tarda un proyecto?",                           a: "Depende del alcance: anteproyecto 3–5 sem., ejecución 8–32 sem. Damos cronograma realista desde el inicio." },
  { n: "05", q: "¿Cuál es el ticket mínimo para trabajar con ustedes?", a: "No tenemos ticket mínimo rígido. Evaluamos por encaje técnico y agenda. Escríbenos con el alcance básico." },
  { n: "06", q: "¿Acompañan después de la entrega?",                    a: "Sí. Manual de uso, planos as-built y acompañamiento post-entrega los primeros meses." },
];

const NEWS = [
  { date: "Mar. 2026", tag: "Estudio",   title: "Construir en clima tropical sin perder la línea.",                       image: "/projects/lynk and go/lynk1.webp" },
  { date: "Feb. 2026", tag: "Proyecto",  title: "Anatomía de un showroom: Lynk & Co resuelto en 640 m².",                 image: "/projects/jumbo car la caleta/jumbo26.webp" },
  { date: "Ene. 2026", tag: "Bitácora",  title: "Por qué nuestra dirección de obra es propia, no tercerizada.",            image: "/projects/bcdc/bcdc4.webp" },
  { date: "Dic. 2025", tag: "Estudio",   title: "10 detalles que separan una obra bien hecha de una que no.",              image: "/projects/crown plaza/foto3.webp" },
  { date: "Nov. 2025", tag: "Proyecto",  title: "Crowne Plaza: cómo intervinimos el lobby sin cerrar el hotel.",           image: "/projects/PedidosYa/foto5.webp" },
  { date: "Oct. 2025", tag: "Bitácora",  title: "Cuándo conviene contratar diseño y obra por separado (y cuándo no).",     image: "/projects/aniomis/ani10.webp" },
];

// ─────────────────────────────────────────────────────────────
// Atoms
// ─────────────────────────────────────────────────────────────
export function EyebrowLabel({ children, color = C.red }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-3" style={{ color }}>
      <span className="block w-8 h-px" style={{ background: color }} />
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 12,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        {children}
      </span>
    </span>
  );
}

export function Button({ href, children, variant = "solid-dark", onClick, className = "" }: { href?: string; children: React.ReactNode; variant?: "solid-dark" | "solid-light" | "ghost-dark" | "ghost-light" | "olive"; onClick?: () => void; className?: string }) {
  const styles: React.CSSProperties =
    variant === "solid-dark"  ? { background: C.ink,   color: C.paper, border: `1px solid ${C.ink}` }
    : variant === "solid-light" ? { background: C.paper, color: C.ink,   border: `1px solid ${C.paper}` }
    : variant === "ghost-dark"  ? { background: "transparent", color: C.ink,   border: `1px solid ${C.ink}` }
    : variant === "ghost-light" ? { background: "transparent", color: C.paper, border: `1px solid ${C.paper}` }
    : { background: C.red, color: C.paper, border: `1px solid ${C.red}` };

  const inner = (
    <span
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full transition-all hover:opacity-85 ${className}`}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.02em",
        ...styles,
      }}
    >
      {children}
    </span>
  );
  return href ? <a href={href}>{inner}</a> : <button onClick={onClick}>{inner}</button>;
}

// ─────────────────────────────────────────────────────────────
// Top utility bar + main header
// ─────────────────────────────────────────────────────────────
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top utility bar (only when not scrolled) */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
            style={{ background: "rgba(11,11,11,0.78)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${C.darkRule}` }}
          >
            <div className="px-5 md:px-10 py-2.5 flex items-center justify-between text-[12px]" style={{ color: "rgba(245,242,236,0.78)" }}>
              <div className="flex items-center gap-5">
                <span className="hidden sm:inline">Síguenos:</span>
                <a href="https://www.instagram.com/sibaikole" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
                <a href="https://www.facebook.com/people/Siba-Ikole-Dise%C3%B1os-y-Construciones/100083310222111/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
                <a href="https://www.linkedin.com/company/siba-ikole/about/" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <a href="mailto:sibaikole@gmail.com" className="hover:text-white inline-flex items-center gap-2">
                  <span>✉</span> sibaikole@gmail.com
                </a>
                <span className="inline-flex items-center gap-2">
                  <span>◉</span> Av. Gustavo Mejía Ricart, Santo Domingo
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main header */}
      <header
        style={{
          background: scrolled ? "rgba(245,242,236,0.95)" : "rgba(11,11,11,0.5)",
          backdropFilter: "blur(14px) saturate(140%)",
          borderBottom: `1px solid ${scrolled ? "rgba(11,11,11,0.08)" : C.darkRule}`,
          transition: "background 280ms ease, border-color 280ms ease",
        }}
      >
        <div className="px-5 md:px-10 py-4 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/sibaikole-mark.png"
              alt="Sibaikole"
              width={44}
              height={44}
              priority
              className="h-9 w-auto"
              style={{ filter: scrolled ? "brightness(0)" : "brightness(0) invert(1)" }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: "0.02em",
                color: scrolled ? C.ink : C.paper,
              }}
            >
              Sibaikole<span style={{ color: C.red }}>.</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: scrolled ? C.ink : C.paper,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2.5" style={{ color: scrolled ? C.ink : C.paper }}>
              <span
                className="w-9 h-9 grid place-items-center rounded-full"
                style={{ background: C.red, color: C.paper, fontSize: 14 }}
                aria-hidden
              >
                ☎
              </span>
              <div className="leading-tight">
                <div style={{ fontSize: 10, opacity: 0.65, letterSpacing: "0.08em", textTransform: "uppercase" }}>¿Necesitas ayuda?</div>
                <a href="tel:+18296379960" className="hover:opacity-70" style={{ fontSize: 14, fontWeight: 500 }}>+1 (829) 637-9960</a>
              </div>
            </div>
            <Button href="#contact" variant={scrolled ? "solid-dark" : "solid-light"}>
              Cotizar →
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO — fondo oscuro + headline + 2 CTAs + foto asomando hacia abajo
// ─────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", minHeight: 720, background: C.dark, color: C.paper }}
    >
      {/* Background video */}
      <div className="absolute inset-0" style={{ background: C.dark }}>
        <video
          src="/projects/lynk and go/lynk1_compressed.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ background: C.dark }}
        />
      </div>

      {/* Dark overlay for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,11,11,0.7) 0%, rgba(11,11,11,0.35) 30%, rgba(11,11,11,0.35) 60%, rgba(11,11,11,0.8) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(122,31,31,0.15) 0%, rgba(11,11,11,0) 70%)",
        }}
      />

      {/* Content centered */}
      <div className="relative z-10 h-full flex items-center justify-center px-5 md:px-10">
        <div className="max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <EyebrowLabel color={C.oliveLight}>Estudio · Santo Domingo</EyebrowLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 leading-[1.05] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "clamp(2.4rem, 6vw, 5.4rem)",
              color: C.paper,
              textShadow: "0 2px 24px rgba(0,0,0,0.45)",
            }}
          >
            Transformamos espacios<br />
            con <span style={{ color: C.oliveLight, fontStyle: "italic", fontWeight: 400 }}>precisión y elegancia</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-6 max-w-xl mx-auto text-[15px] leading-[1.65]"
            style={{ color: "rgba(245,242,236,0.85)", textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}
          >
            Diseño arquitectónico, construcción y remodelación de alta calidad para proyectos que perduran. Más de 15 años de experiencia en Santo Domingo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10 flex items-center justify-center gap-4 flex-wrap"
          >
            <Button href="#works" variant="solid-light">Ver proyectos</Button>
            <a href="tel:+18296379960" className="inline-flex items-center gap-3 group">
              <span
                className="w-11 h-11 grid place-items-center rounded-full"
                style={{ background: C.red, color: C.paper, fontSize: 16 }}
              >
                ☎
              </span>
              <span className="leading-tight text-left">
                <span className="block" style={{ fontSize: 11, opacity: 0.75, letterSpacing: "0.1em", textTransform: "uppercase" }}>Habla con nosotros</span>
                <span className="block group-hover:underline" style={{ fontSize: 14, fontWeight: 500, color: C.paper }}>(829) 637-9960</span>
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden
      >
        <div className="w-px h-10" style={{ background: C.paper, opacity: 0.5 }} />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CLIENT STRIP — logos / nombres en línea
// ─────────────────────────────────────────────────────────────
export function ClientStrip() {
  return (
    <section style={{ background: C.paper, color: C.ink }}>
      <div className="px-5 md:px-10 py-14 md:py-16">
        <div className="max-w-[1480px] mx-auto">
          <div className="text-center mb-8">
            <EyebrowLabel color={C.mute}>Han confiado en nuestro criterio</EyebrowLabel>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-6">
            {CLIENTS.map((c) => (
              <div
                key={c}
                className="text-center"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 18,
                  fontWeight: 500,
                  color: C.inkSoft,
                  opacity: 0.7,
                  letterSpacing: "-0.01em",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// ABOUT — split + valores + stats + equipo
// ─────────────────────────────────────────────────────────────
export function About() {
  return (
    <section id="about" className="px-5 md:px-10 py-20 md:py-28" style={{ background: C.paper, color: C.ink }}>
      <div className="max-w-[1480px] mx-auto">
        {/* Intro split */}
        <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="col-span-12 md:col-span-6">
            <p className="text-[16px] leading-[1.7]" style={{ color: C.inkSoft }}>
              Sibaikole nació en Santo Domingo en 2009. Diseñamos, dirigimos y construimos bajo la misma firma, con foco en proyectos que perduren. Atendemos retail, hospitalidad, comercial y residencial, con dirección de obra propia y un solo criterio: hacer las cosas bien desde la primera línea hasta la entrega final.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Dirección de obra propia, no tercerizada",
                "Control técnico continuo hasta la entrega",
                "Manual de uso y acompañamiento post-entrega",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px]" style={{ color: C.ink }}>
                  <span
                    className="mt-1 w-5 h-5 grid place-items-center rounded-full flex-shrink-0"
                    style={{ background: C.red, color: C.paper, fontSize: 11 }}
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href="#contact" variant="solid-dark">Cotizar tu proyecto →</Button>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="relative w-full overflow-hidden rounded-[6px]" style={{ aspectRatio: "5 / 4" }}>
              <Image
                src="/projects/crown plaza/foto3.webp"
                alt="Estudio Sibaikole"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={92}
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="mt-20 md:mt-28">
          <div className="max-w-2xl mb-10">
            <EyebrowLabel>Por qué trabajar con nosotros</EyebrowLabel>
            <h3
              className="mt-5 leading-[1.1] tracking-[-0.015em]"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(1.7rem, 3vw, 2.4rem)" }}
            >
              Lo que diferencia nuestro trabajo.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map((v) => (
              <article
                key={v.title}
                className="p-6 rounded-[10px] transition-transform hover:-translate-y-1"
                style={{ background: C.paperLight, border: `1px solid rgba(11,11,11,0.07)` }}
              >
                <div
                  className="w-11 h-11 rounded-full grid place-items-center mb-5"
                  style={{ background: C.red, color: C.paper, fontSize: 16 }}
                  aria-hidden
                >
                  {v.icon}
                </div>
                <h4
                  className="leading-tight"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 16 }}
                >
                  {v.title}
                </h4>
                <p className="mt-3 text-[13.5px] leading-[1.55]" style={{ color: C.inkSoft }}>{v.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Stats + team strip */}
        <div className="mt-16 md:mt-20 rounded-[12px] overflow-hidden grid grid-cols-12" style={{ background: C.olive, color: C.ink }}>
          {STATS.map((s, i) => (
            <div
              key={s.k}
              className="col-span-6 md:col-span-3 p-7 md:p-9"
              style={{
                borderRight: i < STATS.length ? `1px solid rgba(11,11,11,0.15)` : "none",
                borderBottom: `1px solid rgba(11,11,11,0.15)`,
              }}
            >
              <div
                className="leading-none tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(2.2rem, 3.6vw, 3.2rem)" }}
              >
                {s.v}
              </div>
              <div className="mt-3 text-[13px]" style={{ color: C.inkSoft }}>{s.k}</div>
            </div>
          ))}
          <div className="col-span-12 md:col-span-3 p-7 md:p-9" style={{ borderBottom: `1px solid rgba(11,11,11,0.15)` }}>
            <div className="text-[12px] mb-3" style={{ color: C.inkSoft, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
              Equipo · 12 personas
            </div>
            <ul className="space-y-1.5 text-[13px]" style={{ color: C.ink }}>
              {TEAM.map((t) => (
                <li key={t.role} className="flex items-center justify-between">
                  <span>{t.role}</span>
                  <span style={{ color: C.inkSoft, fontFamily: "var(--font-mono)" }}>{t.count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 p-7 md:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ background: C.warm }}>
            <p className="text-[14px] max-w-2xl" style={{ color: C.ink }}>
              <strong>15 años</strong> entregando obra real en Santo Domingo y el resto del país. De estudios chicos a hoteles de cadena, sin perder el control técnico.
            </p>
            <Button href="#works" variant="solid-dark">Ver portafolio →</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SERVICES — fondo oliva con 3 cards
// ─────────────────────────────────────────────────────────────
export function Services() {
  return (
    <section id="services" className="px-5 md:px-10 py-20 md:py-28" style={{ background: C.olive, color: C.ink }}>
      <div className="max-w-[1480px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              className="rounded-[10px] p-6 md:p-7 transition-transform hover:-translate-y-1"
              style={{ background: C.paper, color: C.ink }}
            >
              <div className="relative w-full overflow-hidden rounded-[6px] mb-5" style={{ aspectRatio: "5 / 4" }}>
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={88}
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 w-12 h-12 rounded-full grid place-items-center" style={{ background: C.red, color: C.paper, fontWeight: 600, fontSize: 14 }}>
                  {s.n}
                </div>
              </div>
              <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: C.mute, fontWeight: 500 }}>
                Servicio {s.n} · {s.sub}
              </div>
              <h3
                className="mt-2 leading-[1.1]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "clamp(1.4rem, 2.2vw, 1.7rem)",
                }}
              >
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6]" style={{ color: C.inkSoft }}>{s.desc}</p>
            </article>
          ))}
        </div>

        {/* PROCESO */}
        <div className="mt-20 md:mt-28">
          <div className="max-w-2xl mb-10">
            <EyebrowLabel color={C.ink}>Nuestro proceso</EyebrowLabel>
            <h3
              className="mt-5 leading-[1.1] tracking-[-0.015em]"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(1.7rem, 3vw, 2.4rem)" }}
            >
              Cuatro fases. Una sola firma.
            </h3>
          </div>

          <div className="rounded-[12px] overflow-hidden" style={{ background: C.paper }}>
            <ul>
              {PROCESS.map((p, i) => (
                <li
                  key={p.n}
                  className="grid grid-cols-12 gap-4 md:gap-6 items-center px-6 md:px-8 py-6 md:py-7"
                  style={{ borderTop: i > 0 ? `1px solid rgba(11,11,11,0.08)` : "none" }}
                >
                  <div className="col-span-2 md:col-span-1">
                    <span
                      className="w-10 h-10 rounded-full grid place-items-center"
                      style={{ background: C.red, color: C.paper, fontWeight: 600, fontSize: 13 }}
                    >
                      {p.n}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-3">
                    <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)" }}>
                      {p.title}
                    </h4>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <p className="text-[14px] leading-[1.55]" style={{ color: C.inkSoft }}>{p.desc}</p>
                  </div>
                  <div className="col-span-12 md:col-span-2 md:text-right">
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: C.red, letterSpacing: "0.04em" }}>
                      {p.weeks}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise as 3 bullets */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
            {EXPERTISE.map((e) => (
              <div key={e.n} className="p-6 rounded-[10px]" style={{ background: C.paperLight }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: C.red, fontWeight: 500, letterSpacing: "0.08em" }}>{e.n}</span>
                <h4 className="mt-3 leading-tight" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 16 }}>{e.title}</h4>
                <p className="mt-3 text-[13.5px] leading-[1.55]" style={{ color: C.inkSoft }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// ─────────────────────────────────────────────────────────────
// WORKS — bento 4 fotos + 2 (panorámica)
// ─────────────────────────────────────────────────────────────
export function Works() {
  const [filter, setFilter] = useState<"Todo" | Project["program"]>("Todo");
  const filtered = filter === "Todo" ? PROJECTS : PROJECTS.filter((p) => p.program === filter);

  return (
    <section id="works" className="px-5 md:px-10 py-20 md:py-28" style={{ background: C.paper, color: C.ink }}>
      <div className="max-w-[1480px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <Button href="/contacto" variant="ghost-dark">Cotizar proyecto similar →</Button>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["Todo","Retail","Hospitalidad","Comercial"] as const).map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-full transition-colors"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: active ? C.paper : C.ink,
                  background: active ? C.ink : "transparent",
                  border: `1px solid ${active ? C.ink : "rgba(11,11,11,0.18)"}`,
                }}
              >
                {f} <span style={{ color: active ? "rgba(245,242,236,0.6)" : C.mute, marginLeft: 4 }}>
                  {f === "Todo" ? PROJECTS.length : PROJECTS.filter(p => p.program === f).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bento grid */}
        <motion.div layout className="grid grid-cols-12 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              // Asymmetric layout: first 4 portrait, rest panoramic
              const isPanoramic = i >= 4 || filtered.length <= 2;
              return (
                <motion.div
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className={isPanoramic ? "col-span-12 sm:col-span-6 lg:col-span-6" : "col-span-12 sm:col-span-6 lg:col-span-3"}
                >
                  <ProjectCard project={p} aspect={isPanoramic ? "16/9" : "3/4"} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[14px]" style={{ color: C.mute }}>
            No hay proyectos en esta categoría todavía.
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, aspect }: { project: Project; aspect: string }) {
  return (
    <Link href="#works" className="group block">
      <div className="relative w-full overflow-hidden rounded-[6px]" style={{ aspectRatio: aspect }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          quality={92}
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-65 group-hover:opacity-90"
          style={{ background: "linear-gradient(to top, rgba(11,11,11,0.92) 0%, rgba(11,11,11,0) 55%)" }}
        />
        <div className="absolute bottom-5 left-5 right-5 text-left" style={{ color: C.paper }}>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: C.oliveLight, fontWeight: 500 }}>
            {project.program} · {project.year}
          </div>
          <div
            className="mt-1.5 leading-tight"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(1.25rem, 1.9vw, 1.6rem)",
            }}
          >
            {project.title}
          </div>
          <div className="mt-1 text-[12px]" style={{ color: "rgba(245,242,236,0.75)" }}>{project.area}</div>
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// TESTIMONIALS — dark with 2 cards
// ─────────────────────────────────────────────────────────────
export function Testimonials() {
  return (
    <section className="px-5 md:px-10 py-20 md:py-28" style={{ background: C.dark, color: C.paper }}>
      <div className="max-w-[1480px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <EyebrowLabel color={C.oliveLight}>Clientes</EyebrowLabel>
          <h2
            className="mt-5 leading-[1.05] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
              color: C.paper,
            }}
          >
            La obra terminada<br />habla por nosotros.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.n}
              className="rounded-[10px] p-7 md:p-8"
              style={{ background: C.darkPanel, border: `1px solid ${C.darkRule}` }}
            >
              <div className="flex items-start gap-5">
                <div
                  className="w-14 h-14 rounded-full grid place-items-center flex-shrink-0"
                  style={{ background: C.red, color: C.paper, fontWeight: 600, fontSize: 18 }}
                >
                  {t.n}
                </div>
                <div>
                  <p className="text-[15px] leading-[1.65]" style={{ color: "rgba(245,242,236,0.82)" }}>“{t.quote}”</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span style={{ fontWeight: 500, fontSize: 14, color: C.paper }}>{t.author}</span>
                    <span style={{ color: C.red, letterSpacing: "0.2em", fontSize: 14 }} aria-label={`${t.rating} estrellas`}>
                      {"★".repeat(t.rating)}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT — section dedicada (form + info cards + FAQ + ubicación)
// ─────────────────────────────────────────────────────────────
export function Contact() {
  const [open, setOpen] = useState<string | null>("01");
  const half = Math.ceil(FAQ.length / 2);
  const cols = [FAQ.slice(0, half), FAQ.slice(half)];

  const infoCards = [
    { icon: "☎", label: "Teléfono",  value: "+1 (829) 637-9960",        href: "tel:+18296379960" },
    { icon: "✉", label: "Correo",    value: "sibaikole@gmail.com",      href: "mailto:sibaikole@gmail.com" },
    { icon: "◉", label: "Dirección", value: "Av. Gustavo Mejía Ricart, Santo Domingo, RD" },
    { icon: "◷", label: "Horario",   value: "Lun–Vie · 09:00 – 18:00" },
  ];

  return (
    <section id="contact" className="px-5 md:px-10 py-20 md:py-28" style={{ background: C.paper, color: C.ink }}>
      <div className="max-w-[1480px] mx-auto">
        {/* Form + Info */}
        <div className="grid grid-cols-12 gap-5 md:gap-6">
          {/* FORM */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="col-span-12 lg:col-span-7 p-6 md:p-10 rounded-[12px] space-y-5"
            style={{ background: C.paperLight, border: `1px solid rgba(11,11,11,0.07)` }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { l: "Nombre completo", n: "name",  t: "text",  span: 1 },
                { l: "Email",            n: "email", t: "email", span: 1 },
                { l: "Empresa",          n: "company",t: "text", span: 1 },
                { l: "Teléfono",         n: "phone", t: "tel",   span: 1 },
              ].map((f) => (
                <div key={f.n}>
                  <label htmlFor={f.n} className="block text-[12px] mb-1.5" style={{ color: C.mute, fontWeight: 500, letterSpacing: "0.02em" }}>{f.l}</label>
                  <input
                    id={f.n}
                    name={f.n}
                    type={f.t}
                    className="w-full px-4 py-3 rounded-[6px] outline-none text-[14px]"
                    style={{ background: C.paper, border: `1px solid rgba(11,11,11,0.1)`, color: C.ink }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.red)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(11,11,11,0.1)")}
                  />
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="program" className="block text-[12px] mb-1.5" style={{ color: C.mute, fontWeight: 500, letterSpacing: "0.02em" }}>Tipo de proyecto</label>
              <select
                id="program"
                name="program"
                className="w-full px-4 py-3 rounded-[6px] outline-none text-[14px]"
                style={{ background: C.paper, border: `1px solid rgba(11,11,11,0.1)`, color: C.ink }}
              >
                <option>Diseño arquitectónico</option>
                <option>Construcción / obra nueva</option>
                <option>Remodelación / intervención</option>
                <option>Aún no estoy seguro</option>
              </select>
            </div>

            <div>
              <label htmlFor="msg" className="block text-[12px] mb-1.5" style={{ color: C.mute, fontWeight: 500, letterSpacing: "0.02em" }}>Descripción del proyecto</label>
              <textarea
                id="msg"
                name="msg"
                rows={4}
                placeholder="Programa, m², ubicación aproximada, plazo deseado..."
                className="w-full px-4 py-3 rounded-[6px] outline-none resize-none text-[14px]"
                style={{ background: C.paper, border: `1px solid rgba(11,11,11,0.1)`, color: C.ink }}
                onFocus={(e) => (e.currentTarget.style.borderColor = C.red)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(11,11,11,0.1)")}
              />
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap pt-2">
              <span className="text-[12px]" style={{ color: C.mute }}>Al enviar aceptas nuestra política de privacidad.</span>
              <Button variant="solid-dark">Enviar mensaje →</Button>
            </div>
          </form>

          {/* INFO CARDS */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            {infoCards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                className={`flex items-start gap-4 p-5 rounded-[10px] transition-transform ${card.href ? "hover:-translate-y-0.5" : ""}`}
                style={{ background: C.paperLight, border: `1px solid rgba(11,11,11,0.07)` }}
              >
                <span
                  className="w-11 h-11 rounded-full grid place-items-center flex-shrink-0"
                  style={{ background: C.red, color: C.paper, fontSize: 16 }}
                  aria-hidden
                >
                  {card.icon}
                </span>
                <div className="flex-1">
                  <div className="text-[11px]" style={{ color: C.mute, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>{card.label}</div>
                  <div className="mt-1.5 text-[14.5px] leading-[1.4]" style={{ color: C.ink, fontWeight: 500 }}>{card.value}</div>
                </div>
                {card.href && <span style={{ color: C.red }}>→</span>}
              </a>
            ))}

            {/* Map / coords block */}
            <div className="p-5 rounded-[10px] relative overflow-hidden" style={{ background: C.dark, color: C.paper }}>
              <div
                aria-hidden
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(245,242,236,0.25) 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              />
              <div className="relative z-10">
                <div className="text-[11px]" style={{ color: C.oliveLight, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Ubicación</div>
                <div className="mt-2 text-[14.5px]" style={{ color: C.paper, fontWeight: 500 }}>Av. Gustavo Mejía Ricart</div>
                <div className="text-[13px]" style={{ color: "rgba(245,242,236,0.7)" }}>Santo Domingo, RD · 18°28′ N · 69°55′ O</div>
                <a
                  href="https://maps.google.com/?q=Av.+Gustavo+Mej%C3%ADa+Ricart+Santo+Domingo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-[13px] hover:underline"
                  style={{ color: C.oliveLight, fontWeight: 500 }}
                >
                  Abrir en Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ embedded */}
        <div className="mt-20 md:mt-28">
          <div className="max-w-2xl mb-10">
            <EyebrowLabel>Preguntas frecuentes</EyebrowLabel>
            <h3
              className="mt-5 leading-[1.1] tracking-[-0.015em]"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(1.7rem, 3vw, 2.4rem)" }}
            >
              Antes de escribirnos, mira esto.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {cols.map((col, ci) => (
              <div key={ci} className="space-y-3">
                {col.map((f) => {
                  const isOpen = open === f.n;
                  return (
                    <div
                      key={f.n}
                      className="rounded-[8px] overflow-hidden transition-colors"
                      style={{ background: C.paperLight, border: `1px solid rgba(11,11,11,0.08)` }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : f.n)}
                        className="w-full flex items-center gap-4 p-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span
                          className="w-9 h-9 rounded-full grid place-items-center flex-shrink-0"
                          style={{ background: isOpen ? C.red : C.ink, color: C.paper, fontSize: 13, fontWeight: 600 }}
                        >
                          {f.n}
                        </span>
                        <span className="flex-1" style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500 }}>
                          {f.q}
                        </span>
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} aria-hidden>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pl-[68px] text-[14px] leading-[1.65]" style={{ color: C.inkSoft }}>
                              {f.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// ─────────────────────────────────────────────────────────────
// NEWS — 3 cards
// ─────────────────────────────────────────────────────────────
export function News() {
  const TAGS = ["Todas", "Estudio", "Proyecto", "Bitácora"] as const;
  const [tag, setTag] = useState<(typeof TAGS)[number]>("Todas");
  const filtered = tag === "Todas" ? NEWS : NEWS.filter((n) => n.tag === tag);

  return (
    <section id="news" className="px-5 md:px-10 py-20 md:py-28" style={{ background: C.paperLight, color: C.ink }}>
      <div className="max-w-[1480px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <EyebrowLabel>Bitácora</EyebrowLabel>
            <h2
              className="mt-5 leading-[1.05] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "clamp(2rem, 4.4vw, 3.2rem)",
              }}
            >
              Notas y publicaciones<br />del estudio.
            </h2>
            <p className="mt-4 text-[14.5px] leading-[1.6]" style={{ color: C.inkSoft }}>
              Apuntes técnicos, casos de obra y reflexiones sobre construir en clima caribeño. Una nota al mes.
            </p>
          </div>

          {/* Newsletter signup */}
          <form onSubmit={(e) => e.preventDefault()} className="md:max-w-sm w-full">
            <label htmlFor="news-email" className="block mb-2 text-[12px]" style={{ color: C.mute, fontWeight: 500, letterSpacing: "0.02em" }}>
              Recíbelas en tu correo
            </label>
            <div className="flex gap-2">
              <input
                id="news-email"
                type="email"
                placeholder="tu@correo.com"
                className="flex-1 px-4 py-2.5 rounded-full text-[13px] outline-none"
                style={{ background: C.paper, border: `1px solid rgba(11,11,11,0.12)`, color: C.ink }}
                onFocus={(e) => (e.currentTarget.style.borderColor = C.red)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(11,11,11,0.12)")}
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full transition-opacity hover:opacity-90"
                style={{ background: C.ink, color: C.paper, fontSize: 13, fontWeight: 500 }}
              >
                Suscribir
              </button>
            </div>
          </form>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map((t) => {
            const active = tag === t;
            const count = t === "Todas" ? NEWS.length : NEWS.filter((n) => n.tag === t).length;
            return (
              <button
                key={t}
                onClick={() => setTag(t)}
                className="px-4 py-2 rounded-full transition-colors"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: active ? C.paper : C.ink,
                  background: active ? C.ink : "transparent",
                  border: `1px solid ${active ? C.ink : "rgba(11,11,11,0.18)"}`,
                }}
              >
                {t} <span style={{ color: active ? "rgba(245,242,236,0.6)" : C.mute, marginLeft: 4 }}>{count}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((n, i) => (
              <motion.article
                layout
                key={n.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group rounded-[10px] overflow-hidden"
                style={{ background: C.paper, border: `1px solid rgba(11,11,11,0.06)` }}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 11" }}>
                  <Image
                    src={n.image}
                    alt={n.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={90}
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[12px]" style={{ color: C.mute }}>
                    <span
                      className="px-2.5 py-1 rounded-full"
                      style={{ background: C.red, color: C.paper, fontWeight: 500, fontSize: 11 }}
                    >
                      {n.tag}
                    </span>
                    <span>{n.date}</span>
                  </div>
                  <h3
                    className="mt-4 leading-[1.25]"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
                    }}
                  >
                    {n.title}
                  </h3>
                  <a href="#" className="mt-4 inline-flex items-center gap-2 group/link text-[13px]" style={{ color: C.red, fontWeight: 500 }}>
                    Leer nota
                    <span className="transition-transform group-hover/link:translate-x-1">→</span>
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[14px]" style={{ color: C.mute }}>
            No hay notas en esta categoría todavía.
          </div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FOOTER — dark, 4 columns
// ─────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="px-5 md:px-10 pt-16 pb-8" style={{ background: C.dark, color: C.paper }}>
      <div className="max-w-[1480px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12" style={{ borderBottom: `1px solid ${C.darkRule}` }}>
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <Image src="/images/sibaikole-mark.png" alt="Sibaikole" width={44} height={44} className="h-9 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 20, color: C.paper }}>
                Sibaikole<span style={{ color: C.red }}>.</span>
              </span>
            </div>
            <p className="mt-5 text-[14px] leading-[1.6] max-w-xs" style={{ color: "rgba(245,242,236,0.7)" }}>
              Estudio dominicano de arquitectura, construcción y remodelación. Fundado en Santo Domingo en 2009.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { l: "IG", href: "https://www.instagram.com/sibaikole" },
                { l: "FB", href: "https://www.facebook.com/people/Siba-Ikole-Dise%C3%B1os-y-Construciones/100083310222111/" },
                { l: "IN", href: "https://www.linkedin.com/company/siba-ikole/about/" },
              ].map((s) => (
                <a
                  key={s.l}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 grid place-items-center rounded-full hover:bg-white/10 transition-colors"
                  style={{ border: `1px solid ${C.darkRule}`, fontSize: 11, color: C.paper, fontWeight: 600 }}
                >
                  {s.l}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <div className="text-[13px] font-semibold mb-5" style={{ color: C.paper }}>Sitio</div>
            <ul className="space-y-2.5 text-[14px]" style={{ color: "rgba(245,242,236,0.7)" }}>
              {NAV.map((n) => (
                <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Recent */}
          <div className="md:col-span-3">
            <div className="text-[13px] font-semibold mb-5" style={{ color: C.paper }}>Notas recientes</div>
            <ul className="space-y-4">
              {NEWS.slice(0, 2).map((n, i) => (
                <li key={i} className="text-[13px]" style={{ color: "rgba(245,242,236,0.7)" }}>
                  <div className="text-[11px] mb-1" style={{ color: C.oliveLight }}>{n.date}</div>
                  <a href="#" className="hover:text-white leading-[1.4] block">{n.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <div className="text-[13px] font-semibold mb-5" style={{ color: C.paper }}>Contacto</div>
            <ul className="space-y-2.5 text-[14px]" style={{ color: "rgba(245,242,236,0.7)" }}>
              <li>Av. Gustavo Mejía Ricart</li>
              <li>Santo Domingo, RD</li>
              <li><a href="mailto:sibaikole@gmail.com" className="hover:text-white">sibaikole@gmail.com</a></li>
              <li><a href="tel:+18296379960" className="hover:text-white">+1 (829) 637-9960</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[12px]" style={{ color: "rgba(245,242,236,0.55)" }}>
          <span>© {new Date().getFullYear()} Sibaikole. Todos los derechos reservados.</span>
          <span>Santo Domingo · República Dominicana</span>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// PAGE HERO — header pequeño para páginas internas (estudio, servicios, etc.)
// ─────────────────────────────────────────────────────────────
export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <section
      className="relative pt-40 md:pt-52 pb-20 md:pb-28 px-5 md:px-10 overflow-hidden"
      style={{ background: C.dark, color: C.paper }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(122,31,31,0.2) 0%, rgba(11,11,11,0) 65%)",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <EyebrowLabel color={C.oliveLight}>{eyebrow}</EyebrowLabel>
        <h1
          className="mt-6 leading-[1.05] tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(2.4rem, 6vw, 5rem)",
            color: C.paper,
            textShadow: "0 2px 24px rgba(0,0,0,0.45)",
          }}
        >
          {title}
        </h1>
        {sub && (
          <p className="mt-6 max-w-xl mx-auto text-[15px] leading-[1.65]" style={{ color: "rgba(245,242,236,0.78)" }}>
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT CTA — banner final para páginas internas
// ─────────────────────────────────────────────────────────────
export function ContactCTA() {
  return (
    <section className="px-5 md:px-10 py-20 md:py-24" style={{ background: C.olive, color: C.ink }}>
      <div className="max-w-[1480px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <EyebrowLabel color={C.ink}>¿Tienes un proyecto en mente?</EyebrowLabel>
          <h2
            className="mt-5 leading-[1.05] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)" }}
          >
            Empecemos a trabajar juntos.
          </h2>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button href="/contacto" variant="solid-dark">Solicitar cotización →</Button>
          <Button href="tel:+18296379960" variant="ghost-dark">+1 (829) 637-9960</Button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME — landing condensado (Header / Footer van en layout)
// ─────────────────────────────────────────────────────────────
export default function V2Page() {
  return (
    <>
      <Hero />
      <ClientStrip />
      <HomeAboutPreview />
      <HomeServicesPreview />
      <HomeWorksPreview />
      <Testimonials />
      <ContactCTA />
    </>
  );
}

function HomeAboutPreview() {
  return (
    <section className="px-5 md:px-10 py-20 md:py-28" style={{ background: C.paper, color: C.ink }}>
      <div className="max-w-[1480px] mx-auto grid grid-cols-12 gap-8 md:gap-16 items-center">
        <div className="col-span-12 md:col-span-6">
          <EyebrowLabel>Estudio Sibaikole</EyebrowLabel>
          <h2
            className="mt-6 leading-[1.05] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
          >
            Edificios que <br />se aguantan el tiempo.
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-[1.7]" style={{ color: C.inkSoft }}>
            Estudio dominicano fundado en 2009. Diseñamos, dirigimos y construimos bajo la misma firma con un solo criterio: que cada obra resista lo cotidiano.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-5 max-w-sm">
            {STATS.map((s) => (
              <div key={s.k}>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(1.6rem, 2.4vw, 2rem)" }}>{s.v}</div>
                <div className="mt-1 text-[12px]" style={{ color: C.mute }}>{s.k}</div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/estudio" variant="solid-dark">Conocer el estudio →</Button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="relative w-full overflow-hidden rounded-[6px]" style={{ aspectRatio: "5 / 4" }}>
            <Image src="/projects/crown plaza/foto3.webp" alt="Estudio Sibaikole" fill sizes="(max-width: 768px) 100vw, 50vw" quality={92} loading="lazy" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeServicesPreview() {
  return (
    <section className="px-5 md:px-10 py-20 md:py-28" style={{ background: C.olive, color: C.ink }}>
      <div className="max-w-[1480px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <EyebrowLabel color={C.ink}>Lo que hacemos</EyebrowLabel>
          <h2 className="mt-5 leading-[1.05] tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
            Tres maneras de transformar tu espacio.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((s) => (
            <article key={s.n} className="rounded-[10px] p-6 md:p-7 transition-transform hover:-translate-y-1" style={{ background: C.paper, color: C.ink }}>
              <div className="relative w-full overflow-hidden rounded-[6px] mb-5" style={{ aspectRatio: "5 / 4" }}>
                <Image src={s.image} alt={s.title} fill sizes="(max-width: 768px) 100vw, 33vw" quality={88} loading="lazy" className="object-cover" />
                <div className="absolute top-3 left-3 w-12 h-12 rounded-full grid place-items-center" style={{ background: C.red, color: C.paper, fontWeight: 600, fontSize: 14 }}>{s.n}</div>
              </div>
              <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: C.mute, fontWeight: 500 }}>
                {s.sub}
              </div>
              <h3 className="mt-2 leading-[1.1]" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(1.4rem, 2.2vw, 1.7rem)" }}>{s.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.6]" style={{ color: C.inkSoft }}>{s.desc}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/servicios" variant="solid-dark">Ver todos los servicios →</Button>
        </div>
      </div>
    </section>
  );
}

function HomeWorksPreview() {
  const featured = PROJECTS.slice(0, 4);
  return (
    <section className="px-5 md:px-10 py-20 md:py-28" style={{ background: C.paper, color: C.ink }}>
      <div className="max-w-[1480px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <EyebrowLabel>Proyectos seleccionados</EyebrowLabel>
            <h2 className="mt-5 leading-[1.05] tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Obra reciente.
            </h2>
          </div>
          <Button href="/proyectos" variant="ghost-dark">Ver todos los proyectos →</Button>
        </div>
        <div className="grid grid-cols-12 gap-3 md:gap-4">
          {featured.map((p) => (
            <div key={p.id} className="col-span-12 sm:col-span-6 lg:col-span-3">
              <Link href="/proyectos" className="group block">
                <div className="relative w-full overflow-hidden rounded-[6px]" style={{ aspectRatio: "3 / 4" }}>
                  <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 25vw" quality={90} loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 opacity-65 group-hover:opacity-85 transition-opacity" style={{ background: "linear-gradient(to top, rgba(11,11,11,0.92), transparent 55%)" }} />
                  <div className="absolute bottom-5 left-5 right-5 text-left" style={{ color: C.paper }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: C.oliveLight, fontWeight: 500 }}>{p.program} · {p.year}</div>
                    <div className="mt-1.5 leading-tight" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)" }}>{p.title}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeNewsPreview() {
  return (
    <section className="px-5 md:px-10 py-20 md:py-28" style={{ background: C.paperLight, color: C.ink }}>
      <div className="max-w-[1480px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <EyebrowLabel>Bitácora</EyebrowLabel>
            <h2 className="mt-5 leading-[1.05] tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Últimas notas.
            </h2>
          </div>
          <Button href="/notas" variant="ghost-dark">Ver todas las notas →</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {NEWS.slice(0, 3).map((n, i) => (
            <article key={i} className="group rounded-[10px] overflow-hidden" style={{ background: C.paper, border: `1px solid rgba(11,11,11,0.06)` }}>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 11" }}>
                <Image src={n.image} alt={n.title} fill sizes="(max-width: 768px) 100vw, 33vw" quality={90} loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-[12px]" style={{ color: C.mute }}>
                  <span className="px-2.5 py-1 rounded-full" style={{ background: C.red, color: C.paper, fontWeight: 500, fontSize: 11 }}>{n.tag}</span>
                  <span>{n.date}</span>
                </div>
                <h3 className="mt-4 leading-[1.25]" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}>{n.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
