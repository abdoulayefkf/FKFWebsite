"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const sdgs = [
  {
    number: 4,
    title: "Quality Education",
    color: "bg-[#C5192D]",
    icon: "/sdg/sdg4.png",
    link: "https://globalgoals.org/goals/4-quality-education/",
  },
  {
    number: 9,
    title: "Industry, Innovation & Infrastructure",
    color: "bg-[#FD6925]",
    icon: "/sdg/sdg9.png",
    link: "https://globalgoals.org/goals/9-industry-innovation-and-infrastructure/",
  },
  {
    number: 10,
    title: "Reduced Inequalities",
    color: "bg-[#DD1367]",
    icon: "/sdg/sdg10.png",
    link: "https://globalgoals.org/goals/10-reduced-inequalities/",
  },
  {
    number: 11,
    title: "Sustainable Cities & Communities",
    color: "bg-[#FD9D24]",
    icon: "/sdg/sdg11.png",
    link: "https://globalgoals.org/goals/11-sustainable-cities-and-communities/",
  },
  {
    number: 17,
    title: "Partnerships for the Goals",
    color: "bg-[#19486A]",
    icon: "/sdg/sdg17.png",
    link: "https://globalgoals.org/goals/17-partnerships-for-the-goals/",
  },
];

export default function SDGSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Section motion (same premium system)
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.03, 1.06]);

  // ⭐ NEW: SDG wheel zoom (more dramatic but still elegant)
  const wheelScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const wheelY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={ref} className="py-24 bg-white -mt-25">

      {/* SDG WHEEL (NOW ANIMATED) */}
      <motion.div
        style={{ scale: wheelScale, y: wheelY }}
        className="flex justify-center mb-2"
      >
        <Image
          src="/sdg/sdg-wheel.png"
          alt="UN Sustainable Development Goals"
          width={300}
          height={300}
          className="object-contain"
        />
      </motion.div>

      {/* CONTENT */}
      <motion.div style={{ y, scale }}>
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="text-center mb-16">

            <p className="uppercase tracking-[0.25em] text-yellow-400 font-semibold -mt-10">
              Sustainable Development Goals
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Our Global Impact Framework
            </h2>

            <p className="max-w-3xl mx-auto mt-6 text-gray-600 text-lg">
              The Francis Koroma Foundation aligns its work with the United Nations
              Sustainable Development Goals to promote education, innovation,
              inclusion, sustainable communities, and strategic partnerships.
            </p>

          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-5 gap-8">

            {sdgs.map((sdg) => (
              <div key={sdg.number} className="group [perspective:1000px]">

                <div className="relative h-[320px] w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                  {/* FRONT */}
                  <div className={`absolute inset-0 rounded-2xl ${sdg.color} text-white flex flex-col items-center justify-center p-6 [backface-visibility:hidden]`}>
                    <Image
                      src={sdg.icon}
                      alt={sdg.title}
                      width={120}
                      height={120}
                    />

                    <h3 className="mt-4 text-2xl font-bold">
                      SDG {sdg.number}
                    </h3>

                    <p className="text-center mt-2 font-medium">
                      {sdg.title}
                    </p>
                  </div>

                  {/* BACK */}
                  <div className={`absolute inset-0 rounded-2xl ${sdg.color} text-white flex flex-col justify-center items-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]`}>
                    <h3 className="text-xl font-bold text-center mb-6">
                      Learn More
                    </h3>

                    <a
                      href={sdg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black px-5 py-3 rounded-full font-semibold hover:scale-105 transition"
                    >
                      View Goal
                    </a>
                  </div>

                </div>
              </div>
            ))}

          </div>

        </div>
      </motion.div>

    </section>
  );
}