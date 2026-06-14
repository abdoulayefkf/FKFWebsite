"use client";

import Image from "next/image";

export default function ImpactSection() {
  return (
    <section className="relative py-24 overflow-hidden">


      {/* CONTENT */}
      <div className="relative z-0 max-w-7xl mx-auto px-6">

        {/* HEADER */}
<div className="text-center ">

  <div className="inline-block bg-gray-50 backdrop-blur-sm rounded-2xl px-10 py-8 shadow-2xl mb-6">

    <p className="uppercase tracking-[0.25em] text-yellow-500 font-semibold">
      Our Impact
    </p>

    <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
      Creating Opportunities That Transform Lives
    </h2>

    <p className="max-w-3xl mx-auto mt-6 text-gray-700 text-lg">
      Through education, mentorship, leadership development, and community
      engagement, the Francis Koroma Foundation is helping shape the next
      generation of global leaders and changemakers.
    </p>

  </div>

</div>

        {/* COLLAGE */}
        <div className="grid md:grid-cols-4 gap-6 auto-rows-[280px]">

          {/* TILE 1 */}
          <div className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105">
            <Image
              src="/impact/impact-1.jpg"
              alt="Students Supported"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-5xl font-bold text-yellow-300">500+</p>
              <p className="text-lg">Students Supported</p>
            </div>
          </div>

          {/* FEATURED TILE */}
          <div className="relative rounded-2xl overflow-hidden md:col-span-2 md:row-span-2 transition-all duration-300 hover:scale-105">
            <Image
              src="/impact/impact-featured.jpg"
              alt="Lives Impacted"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/5" />

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">

              <p className="text-7xl font-bold text-yellow-300">
                1,200+
              </p>

              <h3 className="text-3xl font-semibold text-white mt-4">
                Lives Impacted
              </h3>

              <p className="text-white mt-4 max-w-md">
                Empowering young people through education, mentorship,
                leadership development, and community engagement.
              </p>

            </div>
          </div>

          {/* TILE 2 */}
          <div className="relative rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 transition-all duration-300 hover:scale-105">
            <Image
              src="/impact/impact-2.jpg"
              alt="Mentors"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-5xl font-bold text-yellow-300">50+</p>
              <p className="text-lg">Mentors Engaged</p>
            </div>
          </div>

          {/* TILE 3 */}
          <div className="relative rounded-2xl overflow-hidden hover:scale-105">
            <Image
              src="/impact/impact-3.jpg"
              alt="Programs"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-5xl font-bold text-yellow-300">15+</p>
              <p className="text-lg">Programs Delivered</p>
            </div>
          </div>

          {/* TILE 4 */}
          <div className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105">
            <Image
              src="/impact/impact-4.jpg"
              alt="Partners"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-5xl font-bold text-yellow-300">10+</p>
              <p className="text-lg">Partner Organizations</p>
            </div>
          </div>

          {/* TILE 5 */}
          <div className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105">
            <Image
              src="/impact/impact-5.jpg"
              alt="Communities"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-5xl font-bold text-yellow-300">20+</p>
              <p className="text-lg">Communities Reached</p>
            </div>
          </div>

          {/* TILE 6 */}
          <div className="relative rounded-2xl overflow-hidden hover:scale-105">
            <Image
              src="/impact/impact-6.jpg"
              alt="Mission Driven"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-5xl font-bold text-yellow-300">100%</p>
              <p className="text-lg">Mission Driven</p>
            </div>
          </div>



          {/* TILE 7 */}
          <div className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105">
            <Image
              src="/impact/impact-7.jpg"
              alt="Mission Driven"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-5xl font-bold text-yellow-300">100%</p>
              <p className="text-lg">Global Representation</p>
            </div>
          </div>

          {/* TILE 8 */}
          <div className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105">
            <Image
              src="/impact/impact-8.jpg"
              alt="Mission Driven"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-5xl font-bold text-yellow-300">100%</p>
              <p className="text-lg">Prestigious Engagements</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}