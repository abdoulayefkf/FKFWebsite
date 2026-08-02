"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CTASection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // LEFT TEXT MOTION
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // IMAGE MOTION
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* LEFT SIDE */}
          <motion.div style={{ y: textY }}>

            <p className="uppercase tracking-[0.25em] text-yellow-400 font-semibold mb-4">
              Get Involved
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Join Us in Shaping Tomorrow&apos;s Leaders
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Together, we can provide mentorship, educational opportunities,
              leadership development, and support systems that empower young
              people to reach their full potential.
            </p>

            {/* ✨ ENHANCED BUTTON */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Button
                asChild
                size="lg"
                className="mt-8 bg-yellow-400 hover:bg-yellow-600 hover:shadow-xl transition-all duration-300 text-black"
              >
                <Link href="/support-us">Support Our Mission</Link>
              </Button>
            </motion.div>

          </motion.div>

          {/* RIGHT SIDE IMAGE */}
          <motion.div
            style={{ scale: imageScale, y: imageY }}
            className="flex justify-center relative"
          >

            {/* ✨ BACKGROUND GLOW */}
            <div className="absolute w-[420px] h-[420px] bg-yellow-300/30 rounded-full blur-3xl animate-pulse" />

            <div className="relative w-[450px] h-[550px] rounded-3xl overflow-hidden shadow-2xl z-10">

              <Image
                src="/cta/image.jpg"
                alt="Francis Koroma Foundation"
                fill
                className="object-cover"
              />

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
