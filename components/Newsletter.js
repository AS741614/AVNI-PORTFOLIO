"use client";
import { useState } from "react";
import { SITE } from "@/lib/config";
import { Doodle, HeartDoodle } from "@/components/Doodles";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e) {
    e.preventDefault();
    // TODO: connect to Mailchimp / Buttondown / ConvertKit API
    if (email.includes("@")) setDone(true);
  }

  return (
    <div className="card-pop p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative" style={{ background: "var(--yellow)" }}>
      <Doodle style={{ top: "-1rem", left: "1.75rem" }} rotate={-10} float={false}>
        <span className="diecut">
          <HeartDoodle size={18} />
        </span>
      </Doodle>
      <div>
        <p className="font-display text-xl" style={{ fontFamily: "var(--font-display)" }}>
          One email. Every chapter.
        </p>
        <p className="text-sm mt-1" style={{ color: "var(--ink)" }}>{SITE.newsletter.blurb}</p>
      </div>
      {done ? (
        <p className="text-sm font-bold" style={{ color: "var(--red)" }}>
          You're in. See you in the inbox.
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="rounded-full px-4 py-2 text-sm flex-1 sm:w-56 bg-white min-w-0"
            style={{ border: "2px solid var(--ink)" }}
          />
          <button type="submit" className="btn-pop justify-center">
            Count me in
          </button>
        </form>
      )}
    </div>
  );
}
