import Link from "next/link";

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

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-4">
              Quick Links
            </h4>

            <div className="flex flex-col gap-2 text-gray-300">

              <Link href="/about">
                About Us
              </Link>

              <Link href="/programs">
                Programs
              </Link>

              <Link href="/contact">
                Contact
              </Link>

              <Link href="/donate">
                Donate
              </Link>

            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-4">
              Contact
            </h4>

            <div className="space-y-2 text-gray-300">

              <p>
                United States
              </p>

              <p>
                info@franciskoromafoundation.org
              </p>

              <p>
                501(c)(3) Nonprofit Organization
              </p>

            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

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