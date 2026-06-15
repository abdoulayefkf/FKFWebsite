import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// NEW GLOBAL COMPONENTS
import ChatBot from "@/components/layout/ChatBot";
import FirstVisitModal from "@/components/layout/FirstVisitModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        {/* GLOBAL POPUP (first visit only) */}
        <FirstVisitModal />

        {/* GLOBAL CHATBOT (all pages) */}
        <ChatBot />

        {/* NAV + PAGE CONTENT */}
        <Navbar />

        <main className="min-h-screen">{children}</main>

        <Footer />

      </body>
    </html>
  );
}