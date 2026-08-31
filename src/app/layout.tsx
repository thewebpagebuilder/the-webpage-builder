import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../index.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium 3D Web Development & Custom AI Software Agency | The Webpage Builder",
  description: "Global agency specializing in premium 3D web experiences, Three.js, React applications, and enterprise AI software. We engineer digital solutions that scale worldwide.",
  keywords: "premium 3D web development, custom AI software agency, React development company, Three.js agency, enterprise web apps, top web development agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 antialiased font-sans selection:bg-white selection:text-black relative min-h-screen`}>
        <SmoothScroll>
          <div className="print:hidden">
            <WhatsAppButton />
            <CustomCursor />
            <CookieConsent />
            <Navbar />
            <StickyMobileCTA />
          </div>
          <main>
            {children}
          </main>
          <div className="print:hidden">
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
