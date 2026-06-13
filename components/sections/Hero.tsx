"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const heroImages = [
  "/hero/hero-1.jpg",
  "/hero/hero-2.jpg",
  "/hero/hero-3.jpg",
  "/hero/hero-4.jpg",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background Image/video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/De-BByJLQxw?autoplay=1&mute=1&loop=1&playlist=De-BByJLQxw&controls=0&modestbranding=1&showinfo=0"
                title="FKF Hero Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
            />
       </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">

        <div className="max-w-5xl text-center text-white px-6">

          <h1 className="text-5xl md:text-7xl font-semibold leading-tight">
            Empowering the Next Generation of Global Leaders and Changemakers
          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-gray-200">
            The Francis Koroma Foundation is a U.S.-based 501(c)(3) nonprofit organization committed to helping young people successfully navigate the transition into adulthood through academic support, mentorship opportunities, leadership training, and personal development initiatives.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">

            <Button size="lg">
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