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
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageLoader } from "@/components/ui/PageLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium 3D Web Development & Custom AI Software Agency | The Webpage Builder",
  description: "Global agency specializing in premium 3D web experiences, Three.js, React applications, and enterprise AI software. We engineer digital solutions that scale worldwide.",
  keywords: "premium 3D web development, custom AI software agency, React development company, Three.js agency, enterprise web apps, top web development agency",
  openGraph: {
    title: "The Webpage Builder — Premium 3D Web & AI Software Agency",
    description: "We engineer extraordinary digital experiences. Three.js, React, AI/ML, mobile. 350+ clients. 500+ projects.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Webpage Builder — Premium Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Webpage Builder — Premium 3D Web & AI Agency",
    description: "We engineer extraordinary digital experiences. 350+ clients worldwide.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased font-sans selection:bg-primary selection:text-primary-foreground relative min-h-screen grain-overlay`}>
        {/* Branded loading screen — only on first visit per session */}
        <PageLoader />

        <SmoothScroll>
          <ScrollProgress />
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
