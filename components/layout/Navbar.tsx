"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur-md border-b border-black/5 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

        {/* LOGO */}
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

        {/* NAVIGATION */}
        <nav className="flex items-center gap-8">

          {/* HOME */}
          <Link
            href="/"
            className={`text-base font-medium transition-colors ${
              pathname === "/"
                ? "text-black border-b-2 border-[#d4a501] pb-1"
                : "hover:text-gray-600"
            }`}
          >
            Home
          </Link>

          {/* ABOUT */}
          <div className="relative group">
            <button
              className={`flex items-center gap-1 text-base font-medium transition-colors ${
                pathname.startsWith("/about")
                  ? "text-black border-b-2 border-[#d4a501] pb-1"
                  : "hover:text-gray-600"
              }`}
            >
              About

              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div className="absolute left-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">

              <Link
                href="/about/who-we-are"
                className="block px-5 py-3 hover:bg-gray-50 rounded-t-2xl"
              >
                Who We Are
              </Link>

              <Link
                href="/about/founder"
                className="block px-5 py-3 hover:bg-gray-50"
              >
                Founder
              </Link>

              <Link
                href="/about/leadership"
                className="block px-5 py-3 hover:bg-gray-50"
              >
                Leadership
              </Link>

             
            </div>
          </div>

          {/* PROGRAMS */}
          <div className="relative group">
            <button
              className={`flex items-center gap-1 text-base font-medium transition-colors ${
                pathname.startsWith("/programs")
                  ? "text-black border-b-2 border-[#d4a501] pb-1"
                  : "hover:text-gray-600"
              }`}
            >
              Programs

              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div className="absolute left-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">

              <Link
                href="/programs"
                className="block px-5 py-3 hover:bg-gray-50 rounded-t-2xl"
              >
                Foundation Programs
              </Link>

              <Link
                href="/programs/academic-support"
                className="block px-5 py-3 hover:bg-gray-50"
              >
                Academic Support
              </Link>

              <Link
                href="/programs/mentorship"
                className="block px-5 py-3 hover:bg-gray-50"
              >
                Mentorship
              </Link>

              <Link
                href="/programs/leadership-development"
                className="block px-5 py-3 hover:bg-gray-50"
              >
                Leadership Development
              </Link>

              <Link
                href="/volunteer"
                className="block px-5 py-3 hover:bg-gray-50"
              >
                Volunteer
              </Link>

              <Link
                href="/get-involved"
                className="block px-5 py-3 hover:bg-gray-50 rounded-b-2xl"
              >
                Get Involved
              </Link>

            </div>
          </div>

          {/* IMPACT */}
          <Link
            href="/impact"
            className={`text-base font-medium transition-colors ${
              pathname.startsWith("/impact")
                ? "text-black border-b-2 border-[#d4a501] pb-1"
                : "hover:text-gray-600"
            }`}
          >
            FKF Impact
          </Link>

        
          {/* NEWS & RESOURCES */}
<div className="relative group">
  <button
    className={`flex items-center gap-1 text-base font-medium transition-colors ${
      pathname.startsWith("/blog") ||
      pathname.startsWith("/newsletter") ||
      pathname.startsWith("/resources") ||
      pathname.startsWith("/media") ||
      pathname.startsWith("/featured")
        ? "text-black border-b-2 border-[#d4a501] pb-1"
        : "hover:text-gray-600"
    }`}
  >
    News & Resources

    <svg
      className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  <div className="absolute left-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">

    {/* NEWS */}

    <Link
      href="/blog"
      className="block px-5 py-3 hover:bg-gray-50 rounded-t-2xl"
    >
      Blog
    </Link>

    <Link
      href="/newsletter"
      className="block px-5 py-3 hover:bg-gray-50"
    >
      Newsletter
    </Link>

    <Link
      href="/media"
      className="block px-5 py-3 hover:bg-gray-50"
    >
      Media & Press
    </Link>

    <Link
      href="/featured"
      className="block px-5 py-3 hover:bg-gray-50"
    >
      Featured In
    </Link>

    {/* DIVIDER */}

    <div className="mx-5 border-t border-gray-100 my-2" />

    {/* RESOURCES HEADER */}

    <div className="px-5 py-2 text-xs uppercase tracking-[0.25em] text-yellow-500 font-semibold">
      Resources
    </div>

    <Link
      href="/resources/sdgs"
      className="block px-5 py-3 hover:bg-gray-50"
    >
      Sustainable Development Goals (SDGs)
    </Link>

    <Link
      href="/resources/opportunities"
      className="block px-5 py-3 hover:bg-gray-50"
    >
      Opportunities for Organizations
    </Link>

    <Link
      href="/resources/grants"
      className="block px-5 py-3 hover:bg-gray-50"
    >
      Grant Opportunities
    </Link>

    <Link
      href="/resources/partnerships"
      className="block px-5 py-3 hover:bg-gray-50"
    >
      Partnership Resources
    </Link>

    <Link
      href="/resources/education"
      className="block px-5 py-3 hover:bg-gray-50 rounded-b-2xl"
    >
      Educational Materials
    </Link>

  </div>
</div>
          {/* CONTACT */}
          <Link
            href="/contact"
            className={`text-base font-medium transition-colors ${
              pathname.startsWith("/contact")
                ? "text-black border-b-2 border-yellow-500 pb-1"
                : "hover:text-gray-600"
            }`}
          >
            Contact Us
          </Link>

          {/* DONATE */}
          <Link
            href="/donate"
            className="bg-[#d4a501] text-white px-6 py-3 rounded-md text-base font-medium transition shadow-xl"
          >
            Donate
          </Link>

        </nav>

      </div>
    </header>
  );
}