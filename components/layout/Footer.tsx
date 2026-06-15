import Link from "next/link";

import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-12">

          {/* FOUNDATION INFO */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Francis Koroma Foundation
            </h3>

            <p className="text-gray-300 leading-relaxed">
              Empowering the next generation of global leaders and changemakers
              through academic support, mentorship, leadership development, and
              community engagement.
            </p>
          </div>

          {/* QUICK LINKS (slightly more centered) */}
          <div className="md:pl-25">
            <h4 className="font-semibold mb-4">
              Quick Links
            </h4>

            <div className="flex flex-col gap-2 text-gray-300">

              <Link href="/about">About Us</Link>
              <Link href="/programs">Programs</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/donate">Donate</Link>

            </div>
          </div>

          {/* CONTACT + SOCIAL ICONS INLINE */}
          <div className="md:-ml-10">
            <div className="flex items-center justify-between mb-4 ">
              <h4 className="font-semibold">
                Contact
              </h4>

              {/* SOCIAL ICONS (RIGHT SIDE OF HEADER LINE) */}
              <div className="flex gap-4 text-white">

                <a href="https://www.linkedin.com/company/franciskoromafoundation/" target="_blank" className="hover:text-blue-500 transition">
                  <FaLinkedin size={18} />
                </a>

                <a href="https://www.instagram.com/franciskoromafoundation/" target="_blank" className="hover:text-pink-500 transition">
                  <FaInstagram size={18} />
                </a>

                <a href="https://www.facebook.com/franciskoromafoundation/#" target="_blank" className="hover:text-pink-500 transition">
                  <FaFacebook size={18} />
                </a>

                <a href="https://www.tiktok.com/@franciskoromafoundation" target="_blank" className="hover:text-white transition">
                  <FaTiktok size={18} />
                </a>

                <a href="https://www.youtube.com/channel/UCKZT3HpsOhZ_r1TmU2sY7Og" target="_blank" className="hover:text-red-500 transition">
                  <FaYoutube size={18} />
                </a>

              </div>
            </div>

            <div className="space-y-2 text-gray-300">

              <p>United States</p>
              <p>info@franciskoromafoundation.org</p>
              <p>501(c)(3) Nonprofit Organization</p>

            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#d4a501] mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

          <p>
            © {new Date().getFullYear()} Francis Koroma Foundation.
            All rights reserved.
          </p>

          <p className="mt-4 md:mt-0">
            Empowering Future Leaders Worldwide
          </p>

        </div>

      </div>

    </footer>
  );
}