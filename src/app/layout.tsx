import type { Metadata } from "next";
import { Manrope, MuseoModerno } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time: visitors' browsers never request Google Fonts.
const museoModerno = MuseoModerno({
  subsets: ["latin"],
  variable: "--font-museo-moderno",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description:
    "Acompaño a empresas y productores a analizar sus costos, precios y resultados para mejorar su gestión.",
  openGraph: { type: "website", locale: "es_AR", siteName: site.name },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${museoModerno.variable} ${manrope.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
