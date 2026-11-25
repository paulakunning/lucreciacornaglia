import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lucrecia Cornaglia",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
