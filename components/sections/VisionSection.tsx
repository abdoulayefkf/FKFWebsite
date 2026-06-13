"use client";

import Image from "next/image";

export default function VisionSection() {
  return (
    <>
      {/* VISION HERO */}
      <section className="relative w-screen h-[900px] overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <Image
            src="/vision/vision-bg.jpg"
            alt="FKF Vision Background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 " />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 text-center text-yellow-400 px-6 py-28">

         
          {/* MAIN HEADING */}
          <h2 className="text-4xl md:text-6xl font-semibold max-w-4xl mx-auto leading-tight">
            Building a Future Defined by Leadership, Opportunity, and Service
          </h2>

        </div>

      </section>

      {/* VISION BODY TEXT */}
      <section className="bg-white py-20">

        <div className="max-w-4xl mx-auto px-6">

           {/* SUBHEADING */}
          <p className="text-yellow-400 text-bold text-center uppercase tracking-[0.25em] font-semibold mb-6">
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