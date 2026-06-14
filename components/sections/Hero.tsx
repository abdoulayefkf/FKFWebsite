"use client";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden pt-16">

      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden z-0">

        <iframe
          className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/De-BByJLQxw?start=0:00&autoplay=1&mute=1&loop=1&playlist=De-BByJLQxw&controls=0&modestbranding=1&showinfo=0"
          title="FKF Hero Video"
          allow="autoplay; encrypted-media"
        />

      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* CONTENT */}
      <div className="relative z-20 flex items-center justify-center h-full">

        <div className="max-w-5xl text-center text-white px-6">

          <h1 className="text-5xl md:text-7xl font-semibold leading-tight">
            Empowering the Next Generation of Global Leaders and Changemakers
          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-gray-200">
            The Francis Koroma Foundation is a U.S.-based 501(c)(3) nonprofit organization committed to helping young people successfully navigate the transition into adulthood through academic support, mentorship opportunities, leadership training, and personal development initiatives.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">

            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-black"
            >
              Get Involved
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-black"
            >
              Learn More
            </Button>

          </div>

        </div>

      </div>

    </section>
  );
}