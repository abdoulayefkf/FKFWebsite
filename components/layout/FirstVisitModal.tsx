"use client";

import { useEffect, useState } from "react";

export default function FirstVisitModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("fkf_first_visit_seen");
    if (!seen) window.setTimeout(() => setOpen(true), 0);
  }, []);

  const closeModal = () => {
    localStorage.setItem("fkf_first_visit_seen", "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">

        <h2 className="text-2xl font-bold mb-3">
          Stay Connected
        </h2>

        <p className="text-gray-600 mb-6">
          Get updates on our impact, stories, and blog posts.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded-lg px-4 py-3 mb-4"
        />

        <button className="w-full bg-yellow-500 text-white py-3 rounded-lg">
          Subscribe
        </button>

        <button
          onClick={closeModal}
          className="mt-4 text-sm text-gray-500"
        >
          Not now
        </button>

      </div>
    </div>
  );
}
