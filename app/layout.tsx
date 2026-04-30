import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sibaikole.com"),
  title: "Sibaikole — Estudio de arquitectura y construcción",
  description:
    "Estudio dominicano de arquitectura, construcción y remodelación. Santo Domingo desde 2009.",
  openGraph: {
    type: "website",
    locale: "es_DO",
    siteName: "Sibaikole",
    title: "Sibaikole — Estudio de arquitectura y construcción",
    description:
      "Estudio dominicano de arquitectura, construcción y remodelación. Santo Domingo desde 2009.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${fraunces.variable} ${inter.variable}`}
        style={{
          fontFamily: "var(--font-sans)",
          background: "#020202",
          color: "#F8F8F8",
          minHeight: "100dvh",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
