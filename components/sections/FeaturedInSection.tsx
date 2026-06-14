"use client";

import Image from "next/image";

const logos = [
  "/featured/logo-1.png",
  "/featured/logo-2.png",
  "/featured/logo-3.png",
  "/featured/logo-4.png",
  "/featured/logo-5.png",
];

export default function FeaturedInSection() {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-12">

          <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mb-6" />

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Featured In
          </h2>

        </div>

        {/* LOGO CARD */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14">

          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12 items-center">

            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex justify-center items-center transition-all duration-300 hover:scale-105"
              >
                <Image
                  src={logo}
                  alt={`Featured organization ${index + 1}`}
                  width={260}
                  height={160}
                  className="object-contain transition-all duration-300"
                />
              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}