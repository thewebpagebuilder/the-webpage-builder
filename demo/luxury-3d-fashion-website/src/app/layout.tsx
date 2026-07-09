import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peach Petals | Luxurious Traditional Women's Fashion - Kurtis, Lehengas & Gowns",
  description: "Indulge in bespoke traditional Indian women's wear. Handcrafted kurtis, designer lehengas, flared anarkali gowns, and premium salwar suits in cotton silk, georgette, and Banarasi fabrics. Complimentary custom sizing & worldwide delivery.",
  keywords: ["Peach Petals", "kurtis", "lehengas", "anarkali gowns", "traditional Indian wear", "women's ethnic fashion", "designer salwar suits", "bridal lehengas", "custom tailoring"],
  openGraph: {
    title: "Peach Petals | Luxurious Traditional Women's Fashion",
    description: "Bespoke kurtis, lehengas, and gowns handcrafted for the modern Indian woman.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#fffdfa] text-stone-900 antialiased">{children}</body>
    </html>
  );
}
