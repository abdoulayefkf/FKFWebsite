import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="border-t bg-white items-center">
      <div className="max-w-10xl mx-auto px-55 py-30">

        {/* AMBER CARD */}
        <div className="bg-yellow-300 rounded-xl overflow-hidden flex flex-col md:flex-row max-w-5xl">

          {/* TEXT SIDE */}
          <div className="flex-1 p-10 md:p-14">


            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900">
              Supporting Young Adults Through Education, Mentorship, and Leadership Development
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
             
              The mission of the Francis Koroma Foundation is to empower students to realize their full potential and become active contributors to society. We are dedicated to creating equal educational opportunities for all, regardless of their financial circumstances. By providing financial resources, support, and guidance, we strive to bridge the gap between educational aspirations and the means to achieve them.
            </p>

          </div>

          {/* IMAGE SIDE */}
          <div className="relative w-full md:w-[50%] h-64 md:h-auto">

            <Image
              src="/about/about-image.jpg"
              alt="FKF About Image"
              fill
              className="object-cover"
            />

          </div>

        </div>

      </div>
    </section>
  );
}