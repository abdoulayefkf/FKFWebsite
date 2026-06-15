"use client";

import { useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-[#d4a501] text-white w-14 h-14 rounded-full shadow-xl z-50"
      >
        💬
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white shadow-2xl rounded-2xl z-50 flex flex-col">

          <div className="p-4 border-b font-semibold">
            FKF Assistant
          </div>

          <div className="flex-1 p-4 text-sm text-gray-600">
            Hello! How can we help you today?
          </div>

          <div className="p-3 border-t">
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Type a message..."
            />
          </div>

        </div>
      )}
    </>
  );
}