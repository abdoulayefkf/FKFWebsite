import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="border-t">
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">

        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Join Us in Shaping Tomorrow's Leaders
        </h2>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Together, we can provide the guidance,
          opportunities, and support that empower young
          people to become leaders and changemakers.
        </p>

        <Button size="lg">
          Support Our Mission
        </Button>

      </div>
    </section>
  );
}