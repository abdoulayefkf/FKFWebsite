"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* LEFT SIDE */}
          <div>

            <p className="uppercase tracking-[0.25em] text-yellow-500 font-semibold mb-4">
              Get Involved
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Join Us in Shaping Tomorrow's Leaders
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Together, we can provide mentorship, educational opportunities,
              leadership development, and support systems that empower young
              people to reach their full potential.
            </p>

            <Button
              size="lg"
              className="mt-8 bg-yellow-500 hover:bg-yellow-600"
            >
              Support Our Mission
            </Button>

          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex justify-center ">

            <div className="relative w-[450px] h-[600px] rounded-3xl overflow-hidden shadow-2xl">

              <Image
                src="/cta/image.jpg"
                alt="Francis Koroma Foundation"
                fill
                className="object-cover"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}