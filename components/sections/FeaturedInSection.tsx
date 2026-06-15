"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  "/featured/logo-1.png",
  "/featured/logo-2.png",
  "/featured/logo-3.png",
  "/featured/logo-4.png",
  "/featured/logo-5.png",
];

export default function FeaturedInSection() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-12">

          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-6" />

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Featured In
          </h2>

        </div>

        {/* MARQUEE WRAPPER */}
        <div className="relative bg-white rounded-3xl shadow-2xl py-12 overflow-hidden">

          {/* ✨ SOFT GLOW / SPARKLE BACKDROP */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-[500px] h-[500px] bg-white rounded-full blur-3xl" />
          </motion.div>

          {/* MOVING LOGO TRACK */}
          <motion.div
            className="relative flex gap-20 w-max items-center z-20"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >

            {/* DUPLICATED LOGOS FOR SEAMLESS LOOP */}
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex justify-center items-center min-w-[180px]"
              >
                <Image
                  src={logo}
                  alt={`Featured organization ${index + 1}`}
                  width={220}
                  height={140}
                  className="object-contain transition"
                />
              </div>
            ))}

          </motion.div>

        </div>

      </div>

    </section>
  );
}