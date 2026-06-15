"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  AnimatePresence,
  useTransform,
} from "framer-motion";

import { useRef } from "react";
import { useState } from "react";



const impactAreas = [
  "Education",
  "Youth Empowerment",
  "Leadership Development",
  "Entrepreneurship",
  "Global Advocacy",
  "Community Service",
];

export default function FounderPage() {

  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.15]
  );

  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    [80, -80]
  );

  const storyY = useTransform(
    scrollYProgress,
    [0, 1],
    [60, -60]
  );

  const [activeMilestone, setActiveMilestone] = useState(0);
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
            >

                <div className="flex flex-wrap gap-4 ">
              <p className="uppercase tracking-[0.25em] text-yellow-400 font-semibold">
                Founder & President
              </p>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
                Francis Koroma
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Founder, speaker, entrepreneur, and global advocate dedicated
                to empowering young leaders and advancing sustainable development.
              </p>

              <div className="flex flex-wrap gap-4 mt-5">
                <Link
                    href="#story"
                    className="bg-yellow-400 text-black px-6 py-3 rounded-xl"
                    >
                    Read Bio
                </Link>

               
              </div>
              </div>
            </motion.div>
<motion.div
  ref={heroRef}
  style={{
    scale: heroScale,
    y: heroY,
  }}
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: false }}
  transition={{ duration: 0.8 }}
>
  <div className="relative h-[700px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/founder/hero.jpg"
                  alt="Francis Koroma"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">

            {[
              ["2,500+", "Young People Impacted"],
              ["300+", "Global Volunteers"],
              ["8", "Countries Represented"],
              ["54", "Podcast Listener Countries"],
            ].map(([number, label]) => (
              <div
                key={label}
                className="bg-white rounded-3xl shadow-xl p-8 text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                <p className="text-5xl font-bold text-yellow-400">{number}</p>
                <p className="mt-3 text-gray-600">{label}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-28">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-14 items-center">

            <motion.div
                style={{ y: storyY }}
                className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/founder/francis2.jpg"
                alt="Foundation Work"
                fill
                className="object-cover"
              />
            </motion.div>

            <div>
              <p className="uppercase tracking-[0.25em] text-yellow-400 font-semibold">
                His Story
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Building Opportunities for the Next Generation
              </h2>

              <div className="space-y-6 mt-8 text-lg text-gray-700 leading-relaxed">
                <p>
                  Francis Koroma is a founder, speaker, entrepreneur, and advocate
                  committed to empowering young leaders and fostering global development.
                </p>

                <p>
                  Through the Francis Koroma Foundation, he has created opportunities
                  for students and emerging leaders through mentorship, scholarships,
                  leadership development, advocacy, and professional growth initiatives.
                </p>

                <p>
                  His work spans education, youth empowerment, entrepreneurship,
                  diplomacy, innovation, and global advocacy, helping young people
                  turn ideas into solutions that contribute to the United Nations
                  Sustainable Development Goals.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-5">
               <button
                    onClick={() => setStoryOpen(true)}
                    className="bg-yellow-400 text-black px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300"
                    >
                    Read More
                    </button>

               
              </div>

            </div>

          </div>
        </div>
      </section>

      <AnimatePresence>
  {storyOpen && (
    <>
      {/* DARK BACKGROUND */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => setStoryOpen(false)}
      />

      {/* POPUP */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-y-auto relative"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setStoryOpen(false)}
            className="absolute top-5 right-6 text-5xl font-dark text-yellow-400 hover:text-black z-20"
          >
            ×
          </button>

          {/* HEADER IMAGE */}
          <div className="relative h-[350px] w-full">
            <Image
              src="/founder/francis2.jpg"
              alt="Francis Koroma"
              fill
              className="object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="p-10 md:p-14">

            <p className="uppercase tracking-[0.25em] text-yellow-400 font-semibold">
              Full Bio
            </p>

            <h2 className="text-4xl font-bold mt-4 mb-8">
              Francis Koroma's Journey
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">

              
                <p>
                Francis Koroma is a founder, president, speaker, and advocate dedicated to empowering young leaders and advancing global development. He is an official member of the Forbes Council, selected through a rigorous review process that recognizes accomplished leaders based on their professional achievements, business impact, and demonstrated influence.
                </p>

                <p>
                As a member of the Council, Francis collaborates with respected leaders across industries, contributes expert insights through published articles, and participates in thought leadership initiatives designed to drive meaningful conversations on business, leadership, and social impact.
                </p>

                <p>
                He leads the Francis Koroma Foundation, a U.S.-based 501(c)(3) nonprofit organization committed to supporting the next generation of global leaders and changemakers through mentorship, educational support, and leadership development programs.
                </p>

                <p>
                The foundation's mission extends beyond academics. Its programs focus on youth empowerment, professional development, entrepreneurship, community service, advocacy, diplomacy, and representation. These initiatives help young people transform ideas into practical solutions that contribute to the United Nations Sustainable Development Goals.
                </p>

                <p>
                Through its speaker series and mentorship network, the foundation connects students and emerging leaders with accomplished professionals from diverse fields, creating opportunities for learning, inspiration, and meaningful engagement.
                </p>

                <p>
                Since its establishment, the foundation has expanded its reach to volunteers and mentees across eight countries and four continents, impacting more than 2,500 young people worldwide.
                </p>

                <p>
                The organization has awarded scholarships to college and high school students, helping cover tuition, books, and academic expenses. It has also assisted students in securing fully funded scholarships to institutions such as Berea College in the United States and Asia Pacific University in Japan.
                </p>

                <p>
                In addition, mentees have gained admission to prestigious programs such as Yale Young Global Scholars, while students have received internship opportunities and professional development experiences through the foundation's growing global network of more than 300 volunteers.
                </p>

                <p>
                Francis's contributions have earned international recognition, including the African Pacesetter for Development Award, the 25 Under 25 Global Legacy Award, appointment as Youth Ambassador to the Sierra Leone Permanent Mission to the United Nations, and his selection as Secretary General of the Organization of African Youth.
                </p>

                <p>
                He is also an experienced advocate on the international stage. As a United Nations speaker, Francis has participated in high-level events including the High-Level Political Forum, the ECOSOC Youth Forum, and sessions of the United Nations General Assembly, where he champions youth leadership and sustainable development.
                </p>

                <p>
                During the summer of 2018, Francis developed FranTech3D at Yale University, an initiative designed to address Sustainable Development Goal 6 by leveraging modern technology to create affordable water storage solutions for underserved communities in Africa and South America.
                </p>

                <p>
                His entrepreneurial efforts have received global recognition, including selection as one of the top entrepreneurs in the New Jersey Institute of Technology's New Business Model Challenge. Drawing on his expertise in 3D printing, he has also organized educational workshops in Sierra Leone, teaching students how technology can be used to create innovative solutions.
                </p>

                <p>
                With a strong background in database administration and computer science, Francis brings a unique combination of technical expertise and humanitarian leadership to his work. He previously served as a SQL Server Database Administrator at Poshem Technologies Institute and volunteered as an instructor teaching Microsoft Azure AI Fundamentals and SQL Server Administration.
                </p>

                <p>
                His educational background includes studies in computer science and business administration, along with professional certifications in artificial intelligence and emerging technologies. These experiences have equipped him with the analytical and technical skills necessary to tackle complex global challenges.
                </p>

                <p>
                Beyond his work in leadership and technology, Francis has pursued opportunities in the fashion industry as a runway model, collaborating with various brands and appearing at New York Fashion Week in September 2023.
                </p>

                <p>
                He is also an active member of influential communities including ForbesBLK, Vogue's global fashion community, and The Recording Academy. Through these affiliations, he mentors aspiring professionals seeking careers in music, entertainment, and creative industries.
                </p>

                <p>
                During the pandemic, Francis launched the Decade Goal Podcast, a platform that explores how individuals and communities can prepare for the challenges and opportunities of the coming decade. The podcast features accomplished guests from around the world and has reached listeners in 54 countries and more than 300 cities globally.
                </p>



            </div>

          </div>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

      {/* LEADERSHIP */}

<section className="py-28 -mt-10">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <p className="uppercase tracking-[0.25em] text-yellow-400 font-semibold">
        Global Leadership
      </p>

      <h2 className="text-5xl font-bold mt-4">
        Advocacy & Influence
      </h2>
    </div>

    <div className="grid md:grid-cols-4 gap-8">

      {[
        {
          title: "Forbes Council",
          img: "/founder/forbes2.jpg",
        },
        {
          title: "United Nations Speaker",
          img: "/founder/un2.jpg",
        },
        {
          title: "Youth Ambassador",
          img: "/founder/youth3.jpg",
        },
        {
          title: "Organization of African Youth",
          img: "/founder/african.jpg",
        },
      ].map((item) => (

        <div
          key={item.title}
          className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col"
        >

          {/* IMAGE */}
          <div className="relative w-full h-70">
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover object-top"
            />
          </div>

          {/* TEXT */}
          <div className="p-2 text-center flex-1 flex items-center justify-center">
            <h3 className="font-bold text-xl">{item.title}</h3>
          </div>

        </div>

      ))}

    </div>

  </div>
</section>

{/* IMPACT AREAS */}
<section className="py-24 bg-white -mt-2">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold">
        Areas of Impact
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      {[
        {
          title: "Education",
          img: "/founder/b1.jpg",
        },
        {
          title: "Youth Empowerment",
          img: "/founder/b2.jpg",
        },
        {
          title: "Leadership Development",
          img: "/founder/b12.jpg",
        },
        {
          title: "Entrepreneurship",
          img: "/founder/b4.jpg",
        },
        {
          title: "Global Advocacy",
          img: "/founder/b5.jpg",
        },
        {
          title: "Community Service",
          img: "/founder/b7.jpg",
        },
      ].map((area) => (

        <div
          key={area.title}
          className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col h-[360px]"
        >

          {/* IMAGE */}
          <div className="relative w-full h-80">
            <Image
              src={area.img}
              alt={area.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* TEXT */}
          <div className="p-4 flex-1 flex items-center justify-center text-center">
            <h3 className="text-2xl font-semibold">
              {area.title}
            </h3>
          </div>

        </div>

      ))}

    </div>

  </div>
</section>


      {/* MESSAGE */}
<section className="py-28 ">
  <div className="max-w-6xl mx-auto px-6">

    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

      {/* LEFT SIDE - TEXT */}
      <div className="flex-1 p-12">

        <p className="uppercase tracking-[0.25em] text-yellow-400 font-semibold">
          A Message From The Founder
        </p>

        <h2 className="text-4xl font-bold mt-4 mb-8">
          Thank You For Being Part Of This Journey
        </h2>

        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">

          <p>
            The Francis Koroma Foundation was founded on the belief that every
            young person deserves access to opportunity, mentorship, and the
            support needed to achieve their full potential.
          </p>

          <p>
            Together, we can build stronger communities, empower future leaders,
            and create sustainable solutions that positively impact lives around
            the world.
          </p>

          <p>
            Thank you for joining us in this mission.
          </p>

          <p className="font-semibold pt-4">
            Francis Koroma
            <br />
            Founder & President
          </p>

        </div>

      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="relative w-full md:w-[45%] h-80 md:h-auto">

        <Image
          src="/founder/message.jpg"
          alt="Founder Message"
          fill
          className="object-cover object-top"
        />

      </div>

    </div>

  </div>
</section>

{/* TIMELINE */}
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-6">

    <div className="text-center mb-12">
      <p className="uppercase tracking-[0.25em] text-yellow-400 font-semibold">
        Leadership Journey
      </p>

      <h2 className="text-4xl font-bold mt-3">
        Milestones of Impact
      </h2>
    </div>

    <div className="text-center mb-6">
      <p className="text-gray-500 text-sm md:text-base italic">
        Explore the milestones that have shaped Francis Koroma's leadership journey.
      </p>
    </div>

    <div className="flex items-center justify-center gap-2 mb-10 text-gray-500">
      <span className="animate-pulse text-yellow-400">●</span>
      <p className="text-sm md:text-base italic">
        Hover over each marker below.
      </p>
    </div>

    {/* TIMELINE LINE */}
    <div className="relative mb-12">

      <div className="absolute top-6 left-0 right-0 h-1 bg-yellow-200 rounded-full" />

      <div className="relative flex justify-between">

        {[
          {
            year: "2018",
            title: "FranTech3D at Yale University",
          },
          {
            year: "2020",
            title: "NJIT New Business Model Challenge Recognition",
          },
          {
            year: "2022",
            title: "African Pacesetter for Development Award",
          },
          {
            year: "2023",
            title: "25 Under 25 Global Legacy Award",
          },
          {
            year: "2023",
            title: "New York Fashion Week Runway Appearance",
          },
          {
            year: "Present",
            title: "Secretary General, Organization of African Youth",
          },
        ].map((item, index) => (
          <button
            key={`${item.year}-${item.title}`}
            onMouseEnter={() => setActiveMilestone(index)}
            onClick={() => setActiveMilestone(index)}
            className="flex flex-col items-center group z-10"
          >
            <span
              className={`text-sm md:text-base font-semibold mb-3 transition-colors ${
                activeMilestone === index
                  ? "text-yellow-500"
                  : "text-gray-500"
              }`}
            >
              {item.year}
            </span>

            <div
              className={`w-5 h-5 rounded-full transition-all duration-300 ${
                activeMilestone === index
                  ? "bg-yellow-400 scale-125 shadow-lg"
                  : "bg-yellow-300"
              }`}
            />
          </button>
        ))}

      </div>
    </div>

    {/* ACTIVE MILESTONE CARD */}
    <AnimatePresence mode="wait">
      <motion.div
        key={activeMilestone}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.25 }}
        className="bg-white border border-yellow-200 rounded-3xl p-8 text-center shadow-2xl max-w-3xl mx-auto"
      >
        <div className="text-yellow-500 font-bold text-lg mb-2">
          {
            [
              "2018",
              "2020",
              "2022",
              "2023",
              "2023",
              "Present",
            ][activeMilestone]
          }
        </div>

        <div className="text-2xl font-semibold">
          {
            [
              "FranTech3D at Yale University",
              "NJIT New Business Model Challenge Recognition",
              "African Pacesetter for Development Award",
              "25 Under 25 Global Legacy Award",
              "New York Fashion Week Runway Appearance",
              "Secretary General, Organization of African Youth",
            ][activeMilestone]
          }
        </div>
      </motion.div>
    </AnimatePresence>

  </div>
</section>
       

      
{/* QUOTE */}
<section className="py-24">
  <div className="max-w-7xl mx-auto px-6">

    <div className="bg-yellow-400 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

      {/* LEFT SIDE - QUOTE */}
      <div className="flex-1 p-8 flex flex-col justify-center text-center md:text-left">

        <p className="text-2xl md:text-5xl font-semibold text-black leading-relaxed">
          “Young people are not leaders of tomorrow. They are leaders of today
          whose ideas and actions can transform communities around the world.”
        </p>

        <p className="mt-8 text-black text-xl">
          — Francis Koroma
        </p>

      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="relative w-full md:w-[40%] h-70 md:h-auto">

        <Image
          src="/founder/quote.jpg"
          alt="Inspirational leadership"
          fill
          className="object-cover object-top"
        />

      </div>

    </div>

  </div>
</section>

      


      {/* CTA */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-5xl font-bold">
            Join The Mission
          </h2>

          <p className="mt-6 text-xl text-gray-300">
            Together, we can empower the next generation of leaders and changemakers.
          </p>

          <div className="flex justify-center gap-4 mt-10">
            <Link
              href="/get-involved"
              className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold"
            >
              Get Involved
            </Link>

            <Link
              href="/donate"
              className="border border-white px-8 py-4 rounded-xl"
            >
              Donate
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}

