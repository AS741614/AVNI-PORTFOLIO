"use client";
import { useState } from "react";
import { SITE } from "@/lib/config";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e) {
    e.preventDefault();
    // TODO: connect to Mailchimp / Buttondown / ConvertKit API
    if (email.includes("@")) setDone(true);
  }

  return (
    <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: "var(--warm)" }}>
      <div>
        <p className="font-medium text-lg">Never miss a story</p>
        <p className="text-sm" style={{ color: "var(--muted)" }}>{SITE.newsletter.blurb}</p>
      </div>
      {done ? (
        <p className="text-sm font-medium" style={{ color: "var(--amber)" }}>
          You're in — thanks for joining! 🍀
        </p>
      ) : (
        <form onSubmit={submit} className="flex gap-2 w-full sm:w-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="rounded-lg px-3 py-2 text-sm border flex-1 sm:w-56 bg-white"
            style={{ borderColor: "var(--line)" }}
          />
          <button
            type="submit"
            className="rounded-lg px-5 py-2 text-sm font-medium text-white whitespace-nowrap"
            style={{ background: "var(--ink)", color: "#fff" }}
          >
            Join
          </button>
        </form>
      )}
    </div>
  );
}
