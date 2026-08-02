"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FocusAreas() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section className="bg-white mb-15 -mt-35">
      <div className="max-w-7xl mx-auto px-6 py-24">


        {/* HEADER */}
        <motion.div style={{ y: y1 }}>
        <div className="mb-14 max-w-2xl">

          <p className="text-lg uppercase tracking-wider text-yellow-400 font-medium">
            What We Do
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold mt-3 text-gray-900">
            Focus Areas That Shape Future Leaders
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            The Francis Koroma Foundation supports young people through structured
            programs that build academic strength, leadership capacity, and
            long-term opportunity.
          </p>

        </div>
        </motion.div>
        

        {/* GRID */}
        <div
          ref={ref}
          className="grid md:grid-cols-3 gap-10"
        >

          {/* CARD 1 */}
          <motion.div style={{ y: y1 }}>
            <Link href="/programs/scholarship">
              <div className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-2xl hover:shadow-xl transition-all duration-300">

                {/* IMAGE */}
                <div className="relative h-72 w-full">
                  <Image
                    src="/focus/academic.jpg"
                    alt="Academic Support"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-8">

                  <div className="w-10 h-10 mb-5 rounded-full bg-yellow-400 flex items-center justify-center">
                    <span className="text-black font-bold">01</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    Academic Support
                  </h3>

                  <p className="text-gray-600">
                    Providing educational resources and structured support
                    systems that help students achieve academic excellence.
                  </p>

                </div>

              </div>
            </Link>
          </motion.div>

          {/* CARD 2 */}
          <motion.div style={{ y: y2 }}>
            <Link href="/programs/mentorship">
              <div className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-2xl hover:shadow-xl transition-all duration-300">

                <div className="relative h-72 w-full">
                  <Image
                    src="/focus/mentorship.jpg"
                    alt="Mentorship Programs"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-8">

                  <div className="w-10 h-10 mb-5 rounded-full bg-yellow-400 flex items-center justify-center">
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
          </motion.div>

          {/* CARD 3 */}
          <motion.div style={{ y: y3 }}>
            <Link href="/programs">
              <div className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-2xl hover:shadow-xl transition-all duration-300">

                <div className="relative h-72 w-full">
                  <Image
                    src="/focus/leadership.jpg"
                    alt="Leadership Development"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-8">

                  <div className="w-10 h-10 mb-5 rounded-full bg-yellow-400 flex items-center justify-center">
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
          </motion.div>

        </div>

      </div>
    </section>
  );
}
