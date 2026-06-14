"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VisionSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Premium parallax movement
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Slow cinematic zoom
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.03, 1.06]
  );

  return (
    <>
      {/* VISION HERO */}
      <section
        ref={ref}
        className="relative w-[1500px] h-[800px] rounded-2xl overflow-hidden mx-auto shadow-2xl"
      >
        {/* IMAGE CONTAINER */}
        <motion.div
          style={{ scale, y }}
          className="absolute inset-y-0 left-10 right-10 rounded-2xl overflow-hidden"
        >
          <Image
            src="/vision/initiative.jpg"
            alt="FKF Vision Background"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>

        {/* CONTENT */}
        <div className="relative text-center text-yellow-400 px-6 py-28 -mt-25 z-10">

          <h3 className="text-3xl md:text-6xl font-semibold max-w-4xl mx-auto leading-tight">
            Building a Future Defined by Leadership, Opportunity, and Service
          </h3>

        </div>
      </section>

      {/* BODY TEXT */}
      <section className="bg-white py-20">

        <div className="max-w-4xl mx-auto px-6">

          {/* SUBHEADING */}
          <p className="text-yellow-400 text-center uppercase tracking-[0.25em] font-semibold mb-6">
            Our Vision
          </p>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
            Our vision is to create a more just and equitable society that offers
            equal access to education, resources, and opportunities, irrespective
            of race, gender, or socio-economic background. At the Francis Koroma
            Foundation, we aspire to empower our community, enabling each
            individual to reach their full potential.
          </p>

          <p className="mt-8 text-lg md:text-xl text-gray-700 leading-relaxed text-center">
            By promoting education, fostering personal growth, and cultivating
            sustainable development, we aim to build a brighter future for all.
            Together, with unwavering dedication and a commitment to making a
            lasting impact, the Francis Koroma Foundation is driving positive
            change and empowering the next generation to transform their lives
            and contribute to the betterment of society.
          </p>

        </div>

      </section>
    </>
  );
}