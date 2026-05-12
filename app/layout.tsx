import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header, Footer } from "./V2Page";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
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

export const viewport = {
  themeColor: "#0B0B0B",
  colorScheme: "dark" as const,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${mono.variable}`}
        style={{
          fontFamily: "var(--font-sans)",
          background: "#0B0B0B",
          color: "#F5F2EC",
          minHeight: "100dvh",
          margin: 0,
        }}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
