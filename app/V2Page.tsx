"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// Palette (mantener identidad nueva propuesta)
// ─────────────────────────────────────────────────────────────
const C = {
  ink: "#020202",      // negro profundo (Sibaikole)
  panel: "#141414",    // gris oscuro panel
  bone: "#F8F8F8",     // cream / off-white
  gold: "#590100",     // vino (acento de marca)
  goldSoft: "#7F2726", // vino claro (hover)
  mute: "#C1C1C1",     // gris claro
  line: "#1F1F1F",     // hairlines on dark
};

const NAV = [
  { label: "Obra", href: "#works" },
  { label: "Estudio", href: "#studio" },
  { label: "Servicios", href: "#services" },
  { label: "Contacto", href: "#contact" },
];

const PROJECTS = [
  { id: "lynk-and-go", n: "01", title: "Lynk & Co", category: "Retail", year: "2025", area: "640 m²", thumbnail: "/projects/lynk and go/lynk1.webp" },
  { id: "jumbo-car-la-caleta", n: "02", title: "Jumbo Car", category: "Retail", year: "2024", area: "420 m²", thumbnail: "/projects/jumbo car la caleta/jumbo26.webp" },
  { id: "crown-plaza", n: "03", title: "Crowne Plaza", category: "Hospitalidad", year: "2024", area: "1.200 m²", thumbnail: "/projects/crown plaza/foto3.webp" },
  { id: "pedidosya", n: "04", title: "PedidosYa", category: "Comercial", year: "2023", area: "380 m²", thumbnail: "/projects/PedidosYa/foto5.webp" },
  { id: "bcdc", n: "05", title: "BCDC", category: "Comercial", year: "2019", area: "920 m²", thumbnail: "/projects/bcdc/bcdc4.webp" },
  { id: "aniomis", n: "06", title: "Aniomis", category: "Comercial", year: "2021", area: "260 m²", thumbnail: "/projects/aniomis/ani10.webp" },
];

const SERVICES = [
  { n: "01", title: "Diseño Arquitectónico", line: "Del primer trazo al detalle constructivo.", image: "/images/diseno-arquitectonico.png" },
  { n: "02", title: "Construcción", line: "Ejecución bajo estándares estrictos.", image: "/images/construccion.png" },
  { n: "03", title: "Remodelación", line: "Devolverle sentido a lo construido.", image: "/images/bar-remodelacion.png" },
  { n: "04", title: "Consultoría", line: "Acompañamiento técnico continuo.", image: "/projects/crown plaza/foto3.webp" },
];

const STATS = [
  { v: "15+", l: "Años" },
  { v: "60+", l: "Proyectos" },
  { v: "06", l: "Sectores" },
  { v: "100%", l: "Compromiso" },
];

// ─────────────────────────────────────────────────────────────
// Smooth scroll (Lenis)
// ─────────────────────────────────────────────────────────────
// Lenis removed — native scroll for performance

// CustomCursor removed for performance — native cursor

// ─────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textShadow = scrolled
    ? "none"
    : "0 1px 2px rgba(0,0,0,0.55), 0 0 10px rgba(0,0,0,0.35)";

  return (
    <>
      {/* Top gradient — always present when not scrolled, ensures legibility */}
      {!scrolled && (
        <div
          aria-hidden
          className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
          style={{
            height: 140,
            background:
              "linear-gradient(to bottom, rgba(2,2,2,0.55) 0%, rgba(2,2,2,0.25) 50%, rgba(2,2,2,0) 100%)",
          }}
        />
      )}

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
        style={{
          background: scrolled ? "rgba(2,2,2,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
          borderBottom: scrolled ? `1px solid ${C.line}` : "1px solid transparent",
        }}
      >
        <div className="px-6 md:px-10 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            style={{ color: C.bone, textShadow }}
          >
            {/* Isotipo Sibaikole */}
            <Image
              src="/images/sibaikole-mark.png"
              alt="Sibaikole"
              width={56}
              height={56}
              priority
              className="h-11 w-auto md:h-12"
            />
            <span className="text-sm tracking-[0.32em] font-semibold">SIBAIKOLE</span>
          </Link>
          <nav className="hidden md:flex items-center gap-9">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] tracking-[0.24em] uppercase font-medium transition-opacity hover:opacity-70"
                style={{ color: C.bone, textShadow }}
                data-cursor="read"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <span
            className="hidden md:inline text-[10px] tracking-[0.24em] uppercase font-medium"
            style={{ color: scrolled ? C.mute : C.bone, opacity: scrolled ? 1 : 0.85, textShadow }}
          >
            Santo Domingo · DO
          </span>
        </div>
      </header>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO — full screen, image cinematic, minimal text
// ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", minHeight: 720, background: C.ink }}
    >
      <div className="absolute inset-0">
        <video
          src="/projects/lynk and go/lynk1_compressed.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/projects/lynk and go/lynk1.webp"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Single combined overlay for performance */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 50%, rgba(2,2,2,0.85) 0%, rgba(2,2,2,0.55) 40%, rgba(2,2,2,0.6) 70%, rgba(2,2,2,0.95) 100%)",
        }}
      />

      {/* Top corners metadata */}
      <div className="absolute top-0 inset-x-0 z-10 px-6 md:px-10 pt-24 md:pt-28 grid grid-cols-2 text-[10px] tracking-[0.24em] uppercase" style={{ color: C.bone }}>
        <span>[Estudio · Arquitectura]</span>
        <span className="text-right">{new Date().getFullYear()} · Vol. 15</span>
      </div>

      {/* Center brand — isotype + wordmark */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-10"
          aria-hidden
        >
          <Image
            src="/images/sibaikole-mark.png"
            alt="Sibaikole isotipo"
            width={220}
            height={220}
            priority
            className="w-[140px] h-auto md:w-[200px]"
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.6rem, 14vw, 14rem)",
            fontWeight: 400,
            color: C.bone,
            letterSpacing: "0.04em",
            textShadow: "0 4px 32px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.4)",
          }}
        >
          SIBAIKOLE
        </motion.h1>
      </div>

      {/* Bottom corners */}
      <div className="absolute bottom-0 inset-x-0 z-10 px-6 md:px-10 pb-10 grid grid-cols-2 items-end">
        <div className="text-[10px] tracking-[0.24em] uppercase" style={{ color: C.bone }}>
          <div style={{ color: C.mute }}>Santo Domingo · República Dominicana</div>
          <div className="mt-1">Av. Gustavo Mejía Ricart</div>
        </div>
        <div className="text-right text-[10px] tracking-[0.24em] uppercase" style={{ color: C.bone }}>
          <div style={{ color: C.mute }}>Proyectos entregados</div>
          <div
            className="mt-1 text-3xl md:text-5xl tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: C.gold }}
          >
            60<span style={{ color: C.bone }}>+</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-10" style={{ background: C.bone, opacity: 0.5 }} />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// MANIFESTO — single sentence, scroll-reveal mask
// ─────────────────────────────────────────────────────────────
function Manifesto() {
  return (
    <section
      className="relative px-6 md:px-10 py-44 md:py-64"
      style={{ background: C.ink, color: C.bone }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1280px] mx-auto leading-[0.96] tracking-[-0.02em]"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "clamp(2.8rem, 9.2vw, 9rem)",
        }}
      >
        <span className="block">Construimos</span>
        <span className="block">lo que otros</span>
        <span className="block" style={{ color: C.gold, fontStyle: "italic" }}>
          sólo dibujan.
        </span>
      </motion.div>
      <div
        className="mt-24 max-w-[1280px] mx-auto flex items-center gap-3 text-[10px] tracking-[0.24em] uppercase"
        style={{ color: C.mute }}
      >
        <span className="block w-8 h-px" style={{ background: C.gold }} />
        Manifiesto · MMXXVI
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// WORKS — bento asymmetric grid + filters
// ─────────────────────────────────────────────────────────────
function Works() {
  const [filter, setFilter] = useState<"Todo" | "Comercial" | "Hospitalidad" | "Retail">("Todo");

  const filtered = useMemo(
    () => filter === "Todo" ? PROJECTS : PROJECTS.filter((p) => p.category === filter),
    [filter]
  );

  // Bento layout classes per index
  const layout = (i: number, total: number) => {
    const map = [
      "col-span-12 lg:col-span-8 aspect-[16/10]",
      "col-span-12 sm:col-span-6 lg:col-span-4 aspect-[3/4]",
      "col-span-12 sm:col-span-6 lg:col-span-4 aspect-[4/3]",
      "col-span-12 sm:col-span-6 lg:col-span-4 aspect-[4/3]",
      "col-span-12 sm:col-span-12 lg:col-span-8 aspect-[21/9]",
      "col-span-12 lg:col-span-12 aspect-[21/8]",
    ];
    return map[i] || "col-span-12 sm:col-span-6 lg:col-span-6 aspect-[16/10]";
  };

  return (
    <section
      id="works"
      className="px-6 md:px-10 py-32 md:py-44"
      style={{ background: "#FFFFFF", color: C.ink }}
    >
      <div className="max-w-[1480px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-24 items-end">
          <div className="col-span-12 md:col-span-3">
            <span
              className="text-[10px] tracking-[0.24em] uppercase inline-flex items-center gap-3"
              style={{ color: C.gold }}
            >
              <span className="w-8 h-px" style={{ background: C.gold }} />
              Selected works
            </span>
          </div>
          <h2
            className="col-span-12 md:col-span-6 leading-[0.95] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5.6vw, 4.6rem)",
              fontWeight: 300,
            }}
          >
            Obra <em style={{ color: C.gold, fontStyle: "italic" }}>reciente</em>.
          </h2>
          <div className="col-span-12 md:col-span-3 flex md:justify-end gap-2 flex-wrap">
            {(["Todo", "Comercial", "Hospitalidad", "Retail"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-cursor="read"
                className="text-[10px] tracking-[0.24em] uppercase px-4 py-2 transition-all"
                style={{
                  color: filter === f ? "#FFFFFF" : C.ink,
                  background: filter === f ? C.gold : "transparent",
                  border: `1px solid ${filter === f ? C.gold : "rgba(2,2,2,0.18)"}`,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Bento grid */}
        <motion.div layout className="grid grid-cols-12 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={layout(i, filtered.length)}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Archive link */}
        <div className="mt-16 md:mt-24 flex justify-end">
          <Link
            href="#works"
            data-cursor="read"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase group"
            style={{ color: C.ink }}
          >
            Archivo completo
            <span
              className="block h-px transition-all duration-500 group-hover:w-16"
              style={{ width: 32, background: C.gold }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof PROJECTS[number] }) {
  return (
    <Link
      href="#works"
      data-cursor="view"
      className="group relative block w-full h-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
          quality={70}
          loading="lazy"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      {/* Gradient bottom */}
      <div
        className="absolute inset-0 opacity-50 group-hover:opacity-80 transition-opacity duration-500"
        style={{ background: "linear-gradient(to top, rgba(10,10,10,0.92), transparent 55%)" }}
      />
      {/* Top-left number */}
      <div
        className="absolute top-5 left-5 text-[10px] tracking-[0.24em] uppercase"
        style={{ color: C.bone }}
      >
        {project.n}
      </div>
      {/* Bottom-left meta */}
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
        <div>
          <div
            className="text-[10px] tracking-[0.24em] uppercase mb-2"
            style={{ color: C.gold }}
          >
            {project.category} · {project.year}
          </div>
          <div
            className="leading-none tracking-[-0.01em]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)",
              fontWeight: 400,
              color: C.bone,
            }}
          >
            {project.title}
          </div>
        </div>
        <div
          className="text-[10px] tracking-[0.24em] uppercase whitespace-nowrap text-right"
          style={{ color: C.bone, opacity: 0.6 }}
        >
          {project.area}
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// SERVICES — numbered editorial, hover reveals image
// ─────────────────────────────────────────────────────────────
function Services() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative px-6 md:px-10 py-32 md:py-44"
      style={{ background: "#EAEAEA", color: C.ink }}
    >
      <div className="max-w-[1480px] mx-auto">
        <div className="grid grid-cols-12 gap-8 mb-20 md:mb-28 items-end">
          <div className="col-span-12 md:col-span-3">
            <span
              className="text-[10px] tracking-[0.24em] uppercase inline-flex items-center gap-3"
              style={{ color: C.gold }}
            >
              <span className="w-8 h-px" style={{ background: C.gold }} />
              Servicios
            </span>
          </div>
          <h2
            className="col-span-12 md:col-span-9 leading-[0.95] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5.6vw, 4.6rem)",
              fontWeight: 300,
            }}
          >
            Cuatro maneras de <em style={{ color: C.gold, fontStyle: "italic" }}>intervenir</em>.
          </h2>
        </div>

        <ul>
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <li
                key={s.n}
                className="border-t"
                style={{ borderColor: "rgba(2,2,2,0.12)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor="read"
                  aria-expanded={isOpen}
                  className="w-full text-left grid grid-cols-12 gap-6 items-center py-10 md:py-14 cursor-pointer group"
                >
                  <div
                    className="col-span-2 md:col-span-1 text-[clamp(1.6rem,3vw,2.4rem)] leading-none transition-colors"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: C.gold,
                      fontWeight: 300,
                    }}
                  >
                    {s.n}
                  </div>
                  <div className="col-span-9 md:col-span-7">
                    <h3
                      className="leading-[0.98] tracking-[-0.01em] transition-transform duration-500 group-hover:translate-x-2"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.8rem, 4.4vw, 3.4rem)",
                        fontWeight: 300,
                      }}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <div className="hidden md:block md:col-span-3 text-right">
                    <p className="text-sm" style={{ color: "#6B6B6B" }}>
                      {s.line}
                    </p>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block"
                      aria-hidden
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 3v14M3 10h14" stroke={C.gold} strokeWidth="1.4" strokeLinecap="square" />
                      </svg>
                    </motion.span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-6 md:gap-10 pb-12 md:pb-16 pt-2 md:pt-4">
                        <div className="col-span-12 md:col-span-1" />
                        <div className="col-span-12 md:col-span-7">
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                              src={s.image}
                              alt={s.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 60vw"
                              quality={75}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-4 flex flex-col justify-between">
                          <p
                            className="text-base md:text-lg leading-relaxed"
                            style={{ color: C.ink }}
                          >
                            {s.line}
                          </p>
                          <div className="mt-8 md:mt-0 pt-6 border-t" style={{ borderColor: "rgba(2,2,2,0.12)" }}>
                            <Link
                              href="#contact"
                              data-cursor="read"
                              className="inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase group/link"
                              style={{ color: C.gold }}
                            >
                              Ver más sobre {s.title.toLowerCase()}
                              <span
                                className="block h-px transition-all duration-500 group-hover/link:w-16"
                                style={{ width: 28, background: C.gold }}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
          <li className="border-t" style={{ borderColor: "rgba(2,2,2,0.12)" }} />
        </ul>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// STUDIO — 1 paragraph + 4 huge stats + b/w studio image
// ─────────────────────────────────────────────────────────────
function Studio() {
  return (
    <section
      id="studio"
      className="px-6 md:px-10 py-32 md:py-44"
      style={{ background: C.ink, color: C.bone }}
    >
      <div className="max-w-[1480px] mx-auto grid grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Left — image */}
        <div className="col-span-12 md:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/projects/bcdc/bcdc4.webp"
              alt="Estudio Sibaikole"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              className="object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none mix-blend-multiply"
              style={{ background: "rgba(10,10,10,0.35)" }}
            />
          </div>
        </div>

        {/* Right — content */}
        <div className="col-span-12 md:col-span-6 md:pl-8">
          <span
            className="text-[10px] tracking-[0.24em] uppercase inline-flex items-center gap-3"
            style={{ color: C.gold }}
          >
            <span className="w-8 h-px" style={{ background: C.gold }} />
            Estudio
          </span>

          <p
            className="mt-8 leading-[1.18] tracking-[-0.01em]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
              fontWeight: 300,
            }}
          >
            Estudio dominicano fundado en 2009. Diseñamos y ejecutamos proyectos comerciales y residenciales con una sola medida: <em style={{ color: C.gold, fontStyle: "italic" }}>hacer las cosas bien</em>.
          </p>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-y-12 gap-x-6">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <div
                  className="leading-none tracking-[-0.04em]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(3rem, 6vw, 5.2rem)",
                    fontWeight: 300,
                    color: C.bone,
                  }}
                >
                  {s.v}
                </div>
                <div
                  className="mt-3 text-[10px] tracking-[0.24em] uppercase"
                  style={{ color: C.mute }}
                >
                  {s.l}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT — 50/50 split, minimal form
// ─────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="grid grid-cols-1 md:grid-cols-2 min-h-[90vh]">
      {/* Left — image */}
      <div className="relative overflow-hidden min-h-[420px]" style={{ background: C.panel }}>
        <Image
          src="/projects/crown plaza/foto3.webp"
          alt="Estudio"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={70}
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom right, rgba(10,10,10,0.4), rgba(10,10,10,0.1))" }}
        />
        <div className="absolute bottom-10 left-10 right-10 z-10">
          <span
            className="text-[10px] tracking-[0.24em] uppercase inline-flex items-center gap-3"
            style={{ color: C.gold }}
          >
            <span className="w-8 h-px" style={{ background: C.gold }} />
            Contacto
          </span>
          <h2
            className="mt-6 leading-[0.96] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
              fontWeight: 300,
              color: C.bone,
            }}
          >
            Comencemos.
          </h2>
        </div>
      </div>

      {/* Right — form */}
      <div
        className="flex items-center justify-center px-8 md:px-16 py-20"
        style={{ background: C.ink, color: C.bone }}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md space-y-10"
        >
          {[
            { l: "Nombre", n: "name", t: "text" },
            { l: "Email", n: "email", t: "email" },
          ].map((f) => (
            <div key={f.n}>
              <label
                htmlFor={f.n}
                className="block text-[10px] tracking-[0.24em] uppercase mb-3"
                style={{ color: C.mute }}
              >
                {f.l}
              </label>
              <input
                id={f.n}
                name={f.n}
                type={f.t}
                className="w-full bg-transparent border-0 border-b py-2 text-base outline-none transition-colors"
                style={{ borderColor: C.line, color: C.bone }}
                onFocus={(e) => (e.currentTarget.style.borderColor = C.gold)}
                onBlur={(e) => (e.currentTarget.style.borderColor = C.line)}
              />
            </div>
          ))}
          <div>
            <label
              htmlFor="msg"
              className="block text-[10px] tracking-[0.24em] uppercase mb-3"
              style={{ color: C.mute }}
            >
              Mensaje
            </label>
            <textarea
              id="msg"
              name="msg"
              rows={3}
              className="w-full bg-transparent border-0 border-b py-2 text-base outline-none resize-none"
              style={{ borderColor: C.line, color: C.bone }}
              onFocus={(e) => (e.currentTarget.style.borderColor = C.gold)}
              onBlur={(e) => (e.currentTarget.style.borderColor = C.line)}
            />
          </div>

          <button
            type="submit"
            data-cursor="read"
            className="group inline-flex items-center gap-4 cursor-pointer"
          >
            <span
              className="text-[11px] tracking-[0.24em] uppercase transition-colors"
              style={{ color: C.bone }}
            >
              Enviar mensaje
            </span>
            <span
              className="block h-px transition-all duration-500 group-hover:w-20"
              style={{ width: 36, background: C.gold }}
            />
          </button>

          <div
            className="pt-12 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] tracking-[0.18em]"
            style={{ borderColor: C.line, color: C.mute }}
          >
            <a href="tel:+18296379960" className="hover:text-white transition-colors">
              +829 637 9960
            </a>
            <a href="mailto:sibaikole@gmail.com" className="hover:text-white transition-colors">
              sibaikole@gmail.com
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FOOTER — big logo + minimal info
// ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="px-6 md:px-10 pt-24 pb-10"
      style={{ background: C.ink, color: C.bone, borderTop: `1px solid ${C.line}` }}
    >
      <div className="max-w-[1480px] mx-auto">
        <div
          className="leading-[0.86] tracking-[-0.04em] mb-16 select-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4.5rem, 18vw, 18rem)",
            fontWeight: 300,
            color: C.bone,
            opacity: 0.95,
          }}
        >
          SIBAIKOLE
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 border-t" style={{ borderColor: C.line }}>
          <div>
            <div className="text-[10px] tracking-[0.24em] uppercase mb-4" style={{ color: C.mute }}>
              Navegación
            </div>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-white/70 transition-colors" data-cursor="read">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.24em] uppercase mb-4" style={{ color: C.mute }}>
              Contacto
            </div>
            <ul className="space-y-2 text-sm">
              <li>+1 829 637 9960</li>
              <li>sibaikole@gmail.com</li>
              <li>Av. Gustavo Mejía Ricart</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.24em] uppercase mb-4" style={{ color: C.mute }}>
              Redes
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/sibaikole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/70 transition-colors"
                  data-cursor="read"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/people/Siba-Ikole-Dise%C3%B1os-y-Construciones/100083310222111/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/70 transition-colors"
                  data-cursor="read"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/siba-ikole/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/70 transition-colors"
                  data-cursor="read"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[10px] tracking-[0.24em] uppercase"
          style={{ borderColor: C.line, color: C.mute }}
        >
          <span>© {new Date().getFullYear()} · Santo Domingo, RD</span>
          <span>Estudio · Arquitectura · Construcción</span>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function V2Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Works />
        <Services />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
