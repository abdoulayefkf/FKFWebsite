import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">

        {/* HEADLINE */}
        <h1 className="max-w-4xl text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
          Empowering the Next Generation of Global Leaders and Changemakers
        </h1>

        {/* SUBHEADLINE */}
        <p className="max-w-3xl mt-8 text-lg md:text-xl text-gray-600 leading-relaxed">
          The Francis Koroma Foundation supports young people through academic
          assistance, mentorship, leadership development, and transitional
          guidance that prepares them to become impactful leaders in their
          communities and beyond.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Button size="lg">
            Get Involved
          </Button>

          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-20">

          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
              About the Foundation
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Supporting Young Adults Through Education, Mentorship, and Leadership Development
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              The Francis Koroma Foundation is a U.S.-based 501(c)(3)
              nonprofit organization committed to helping young people
              successfully navigate the transition into adulthood through
              academic support, mentorship opportunities, leadership training,
              and personal development initiatives.
            </p>
          </div>

        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-20">

          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
            What We Do
          </p>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">
                Academic Support
              </h3>

              <p className="text-gray-600">
                Providing educational resources and support systems that help
                students achieve their academic goals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">
                Mentorship Programs
              </h3>

              <p className="text-gray-600">
                Connecting young people with mentors who provide guidance,
                encouragement, and professional insight.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">
                Leadership Development
              </h3>

              <p className="text-gray-600">
                Equipping future leaders with the skills, confidence, and
                opportunities needed to create meaningful change.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* IMPACT SECTION */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-20">

          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
              Our Vision
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Building a Future Defined by Leadership, Opportunity, and Service
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              We envision a world where every young person has access to the
              mentorship, educational support, and leadership opportunities
              necessary to realize their full potential and contribute
              positively to society.
            </p>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">

          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Join Us in Shaping Tomorrow's Leaders
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Together, we can provide the guidance, opportunities, and support
            that empower young people to become leaders and changemakers.
          </p>

          <Button size="lg">
            Support Our Mission
          </Button>

        </div>
      </section>

    </div>
  );
}