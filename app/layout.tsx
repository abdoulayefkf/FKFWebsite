import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-content";

// NEW GLOBAL COMPONENTS
import ChatBot from "@/components/layout/ChatBot";
import FirstVisitModal from "@/components/layout/FirstVisitModal";
import { RecoveryHashHandler } from "@/components/auth/RecoveryHashHandler";
import { getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Francis Koroma Foundation", template: "%s | Francis Koroma Foundation" },
  description: "Empowering the next generation of global leaders through education, mentorship, leadership development, and community engagement.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Francis Koroma Foundation", images: [{ url: "/about/about-image.jpg", alt: "Francis Koroma Foundation" }] },
  twitter: { card: "summary_large_image", images: ["/about/about-image.jpg"] },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings=await getSiteSettings();
  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-white text-black antialiased">

        <RecoveryHashHandler />

        {/* GLOBAL POPUP (first visit only) */}
        <FirstVisitModal />

        {/* GLOBAL CHATBOT (all pages) */}
        <ChatBot />

        {/* NAV + PAGE CONTENT */}
        <Navbar logoUrl={settings.logoUrl} organizationName={settings.organizationName} />

        <main id="main-content" className="min-h-screen">{children}</main>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "NonprofitOrganization", name: "Francis Koroma Foundation", url: siteUrl, logo: `${siteUrl}/fkf-logo.png`, email: "info@franciskoromafoundation.org", sameAs: ["https://www.linkedin.com/company/franciskoromafoundation/", "https://www.instagram.com/franciskoromafoundation/", "https://www.youtube.com/channel/UCKZT3HpsOhZ_r1TmU2sY7Og"] }).replace(/</g, "\\u003c") }} />

        <Footer />

      </body>
    </html>
  );
}
