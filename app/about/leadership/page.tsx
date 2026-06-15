"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LeadershipPage() {
  const [selectedLeader, setSelectedLeader] = useState<any>(null);

  return (
    <main className="bg-white">

  {/* BOARD OF DIRECTORS */}
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6">

      <div className="text-center mb-22 mt-8">

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
          Board of Directors
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          The Francis Koroma Foundation is guided by experienced leaders
          committed to advancing education, youth empowerment, leadership,
          and global impact.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-16">

        {[
          {
            name: "Hawa Taylor Kamara Diallo",
            title: "Board Director",
            image: "/leadership/hawa.jpg",
            bio: "30+ years of United Nations experience working in various positions in the Department of Public Information and the Office of the Deputy Secretary-General. United Nations Peacekeeping experience in Somalia and Cambodia as well as country-level and community development programme management experience focused on youth, girls, and women with UN-Habitat’s Nairobi and New York Offices. Extensive work in public information and outreach, as well as in fostering partnerships with civil society, local government and the private sector. ",
          },
          {
            name: "DR. ANDRISE BASS",
            title: "Board Director",
            image: "/leadership/bass.jpg",
            bio: "Dr. Andrise Bass is President and founder of the Humanitarian Focus Foundation, Vice President of ASPAFrique, CEO of PRISCON, Mentor/Leader at Al Gore’s Climate Reality Project, and is on the Global Board of Advisors for the SDG Impact Awards. Dr. Bass is a Transformational Strategist Coach, Entrepreneur, and Philanthropist with over 28 years of experience in the business industry. She has been a community organizer for grassroots movements, an author, a keynote speaker, a business entrepreneur for business start-ups and a business strategist for nonprofits. Her passion is helping individuals become leaders in their communities and she has trained and mentored thousands of corporate professionals and entrepreneurs from diverse backgrounds and varied industries across the globe. ",
          },
          {
            name: "DR. GBUJIE DANIEL CHIDUBEM",
            title: "Board Director",
            image: "/leadership/daniel.jpg",
            bio: "Dr. Daniel Chidubem Gbujie hails from Ahiazu-Mbaise, Imo State, Nigeria. he made history in 2016 by being the first African to represent the World Medical Association at the United Nations Framework Convention on Climate Change (UNFCCC) (COP 22) held in Marrakech, Morocco. He founded a youth-based group called Team54Project International (team54project.org), which promotes localized climate solutions to address climate crises and advocates for environmental health regulations. He believes that character-driven leadership is the progressive direction that young people need, and uses this mindset to find ways to resolve local issues in many African nations.",
          },
        ].map((member, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center group"
          >

            {/* CIRCLE IMAGE */}
            <div className="relative w-72 h-72 mx-auto">

              <div className="absolute inset-0 rounded-full bg-yellow-400 scale-105 group-hover:scale-110 transition-all duration-500" />

              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white">

                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-500"
                />

              </div>

            </div>

            {/* NAME */}
            <h3 className="mt-8 text-2xl font-bold text-gray-900">
              {member.name}
            </h3>

            {/* TITLE */}
            <p className="mt-2 text-black font-medium">
              {member.title}
            </p>

            {/* BUTTON */}
            <button
              onClick={() => setSelectedLeader(member)}
              className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              Read Bio
            </button>

          </motion.div>

        ))}

      </div>

    </div>
  </section>

  {/* MODAL */}
  <AnimatePresence>
    {selectedLeader && (
      <>
        {/* BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setSelectedLeader(null)}
        />

        {/* MODAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedLeader(null)}
              className="absolute top-4 right-6 text-4xl text-gray-500 hover:text-black z-20"
            >
              ×
            </button>

            {/* PROFILE IMAGE */}
            <div className="flex justify-center pt-12">

              <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-2xl">

                <Image
                  src={selectedLeader.image}
                  alt={selectedLeader.name}
                  fill
                  className="object-cover"
                />

              </div>

            </div>

            {/* CONTENT */}
            <div className="p-10 md:p-14 text-center">

              <h2 className="text-4xl font-bold text-gray-900">
                {selectedLeader.name}
              </h2>

              <p className="text-yellow-500 font-semibold text-lg mt-2">
                {selectedLeader.title}
              </p>

              <div className="mt-8 max-w-3xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {selectedLeader.bio}
                </p>
              </div>

            </div>

          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>

</main>
  );
}