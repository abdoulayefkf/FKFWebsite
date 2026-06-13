export default function FocusAreas() {
  return (
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
  );
}