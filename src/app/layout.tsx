import type { Metadata } from "next";
import { Manrope, MuseoModerno } from "next/font/google";
import "./globals.css";

// Self-hosted at build time: visitors' browsers never request Google Fonts.
const museoModerno = MuseoModerno({
  subsets: ["latin"],
  variable: "--font-museo-moderno",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Lucrecia Cornaglia",
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
