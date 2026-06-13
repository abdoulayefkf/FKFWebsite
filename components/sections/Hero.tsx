import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">

      <h1 className="max-w-4xl text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
        Empowering the Next Generation of Global Leaders and Changemakers
      </h1>

      <p className="max-w-3xl mt-8 text-lg md:text-xl text-gray-600 leading-relaxed">
        The Francis Koroma Foundation supports young people through academic
        assistance, mentorship, leadership development, and transitional
        guidance that prepares them to become impactful leaders in their
        communities and beyond.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Button size="lg">Get Involved</Button>

        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </div>

    </section>
  );
}