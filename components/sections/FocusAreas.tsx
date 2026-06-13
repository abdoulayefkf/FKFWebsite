import Image from "next/image";
import Link from "next/link";

export default function FocusAreas() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* HEADER */}
        <div className="mb-14 max-w-2xl">

          <p className="text-sm uppercase tracking-wider text-yellow-500 font-medium">
            What We Do
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold mt-3 text-gray-900">
            Focus Areas That Shape Future Leaders
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            The Francis Koroma Foundation supports young people through structured programs
            that build academic strength, leadership capacity, and long-term opportunity.
          </p>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <Link href="/programs/academic-support">
            <div className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl transition">

              {/* IMAGE */}
              <div className="relative h-48 w-full">
                <Image
                  src="/focus/academic.jpg"
                  alt="Academic Support"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-8">

                <div className="w-10 h-10 mb-5 rounded-full bg-yellow-300 flex items-center justify-center">
                  <span className="text-black font-bold">01</span>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Academic Support
                </h3>

                <p className="text-gray-600">
                  Providing educational resources and structured support systems
                  that help students achieve academic excellence.
                </p>

              </div>

            </div>
          </Link>

          {/* CARD 2 */}
          <Link href="/programs/mentorship">
            <div className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl transition">

              <div className="relative h-48 w-full">
                <Image
                  src="/focus/mentorship.jpg"
                  alt="Mentorship Programs"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-8">

                <div className="w-10 h-10 mb-5 rounded-full bg-yellow-300 flex items-center justify-center">
                  <span className="text-black font-bold">02</span>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Mentorship Programs
                </h3>

                <p className="text-gray-600">
                  Connecting young people with mentors who provide guidance,
                  encouragement, and career insight.
                </p>

              </div>

            </div>
          </Link>

          {/* CARD 3 */}
          <Link href="/programs/leadership">
            <div className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl transition">

              <div className="relative h-48 w-full">
                <Image
                  src="/focus/leadership.jpg"
                  alt="Leadership Development"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-8">

                <div className="w-10 h-10 mb-5 rounded-full bg-yellow-300 flex items-center justify-center">
                  <span className="text-black font-bold">03</span>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Leadership Development
                </h3>

                <p className="text-gray-600">
                  Equipping future leaders with the skills, confidence,
                  and opportunities to create meaningful change.
                </p>

              </div>

            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}