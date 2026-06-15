"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function WhoWeArePage() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative h-[90vh] overflow-hidden">
        <Image
          src="/who-we-are/hero.jpg"
          alt="Who We Are"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <p className="uppercase tracking-[0.25em] text-yellow-400 font-semibold">
              Who We Are
            </p>

            <h1 className="text-5xl md:text-7xl font-bold text-white mt-6">
              Empowering The Next
              <br />
              Generation Of Leaders
            </h1>

            <p className="mt-8 text-xl text-gray-200 max-w-3xl mx-auto">
              Placeholder foundation story text. Replace with your official
              organization narrative.
            </p>

            <div className="flex justify-center gap-4 mt-10">
              <Link href="#story" className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold">
                Learn More
              </Link>

              <Link href="/get-involved" className="border border-white text-white px-8 py-4 rounded-xl">
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/who-we-are/story.jpg" alt="Story" fill className="object-cover" />
            </div>

            <div>
              <p className="uppercase tracking-[0.25em] text-yellow-400 font-semibold">
                Our Story
              </p>

              <h2 className="text-5xl font-bold mt-4">
                Building Opportunity Through Leadership
              </h2>

              <div className="space-y-6 mt-8 text-lg text-gray-700 leading-relaxed">
                <p>Placeholder story paragraph one.</p>
                <p>Placeholder story paragraph two.</p>
                <p>Placeholder story paragraph three.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MISSION VISION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">

            <div className="bg-white rounded-3xl p-12 shadow-2xl">
              <h3 className="text-4xl font-bold">Our Mission</h3>
              <p className="mt-6 text-lg text-gray-700">
                Placeholder mission statement.
              </p>
            </div>

            <div className="bg-yellow-400 rounded-3xl p-12 shadow-2xl">
              <h3 className="text-4xl font-bold text-black">Our Vision</h3>
              <p className="mt-6 text-lg text-black">
                Placeholder vision statement.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center mb-16">
            Areas of Impact
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Education",
              "Youth Empowerment",
              "Leadership Development",
              "Entrepreneurship",
              "Global Advocacy",
              "Community Service",
            ].map((item, i) => (
              <div key={item} className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="relative h-72">
                  <Image
                    src={`/impact/${i + 1}.jpg`}
                    alt={item}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold">{item}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="relative py-32">
        <Image src="/who-we-are/reach.jpg" alt="Reach" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {["2,500+","300+","8","54"].map((n, i) => (
              <div key={i}>
                <p className="text-6xl font-bold text-yellow-400">{n}</p>
                <p className="mt-3">Placeholder Metric</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">
            Partners & Collaborators
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[1,2,3,4,5,6].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 shadow-lg h-32 flex items-center justify-center">
                <Image
                  src={`/partners/logo${n}.png`}
                  alt={`Partner ${n}`}
                  width={140}
                  height={70}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">
            Moments That Define Our Journey
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map((n) => (
              <div key={n} className="relative h-80 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={`/gallery/${n}.jpg`}
                  alt={`Gallery ${n}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {["Leadership","Integrity","Service","Innovation","Collaboration","Empowerment"].map((value) => (
              <div key={value} className="bg-white rounded-3xl p-10 shadow-xl text-center">
                <h3 className="text-2xl font-semibold">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-yellow-400 rounded-3xl p-14 text-center shadow-2xl">
            <h2 className="text-5xl font-bold">Connect With Us</h2>

            <div className="flex justify-center gap-6 mt-10 text-4xl">
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaXTwitter /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <Image src="/who-we-are/cta.jpg" alt="CTA" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center text-white max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold">
            Join The Mission
          </h2>

          <p className="mt-6 text-xl">
            Together we can empower the next generation of leaders.
          </p>

          <div className="flex justify-center gap-4 mt-10">
            <Link href="/get-involved" className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold">
              Get Involved
            </Link>

            <Link href="/donate" className="border border-white px-8 py-4 rounded-xl">
              Donate
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
