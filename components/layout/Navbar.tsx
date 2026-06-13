import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/100 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative w-20 h-20">
            <Image
              src="/fkf-logo.png"
              alt="Francis Koroma Foundation Logo"
              fill
              priority
              className="object-contain scale-180"
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            href="/about"
            className="text-m font-medium hover:text-gray-600 transition-colors"
          >
            About
          </Link>

          <Link
            href="/programs"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            Programs
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            Contact
          </Link>

          <Link
            href="/donate"
            className="bg-black text-white px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition"
          >
            Donate
          </Link>
        </nav>

      </div>
    </header>
  );
}