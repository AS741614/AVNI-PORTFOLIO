"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GrowthChart from "./GrowthChart";

// Fixed locale + timezone so server and client render the exact same string
// (an unqualified toLocaleString() picks up whatever timezone/locale the
// runtime happens to be in, which differs between the Node server and the
// browser and causes a hydration mismatch).
function formatUpdatedAt(iso) {
  return new Date(iso).toLocaleString("en-IE", {
    timeZone: "Europe/Dublin",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function StatusRow({ item }) {
  return (
    <div className="flex items-start gap-3 py-3" style={{ borderBottom: "1px solid #e3e3e3" }}>
      <span
        className="mt-1 inline-block rounded-full flex-shrink-0"
        style={{ width: 10, height: 10, background: item.connected ? "#1a7f37" : "var(--red)" }}
        aria-hidden="true"
      />
      <div>
        <p className="font-bold text-sm">
          {item.name} <span style={{ color: item.connected ? "#1a7f37" : "var(--red)", fontWeight: 700 }}>{item.connected ? "· connected" : "· not set"}</span>
        </p>
        <p className="text-sm" style={{ color: "var(--muted)" }}>{item.detail}</p>
        {item.extra && <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{item.extra}</p>}
      </div>
    </div>
  );
}

export default function DashboardClient({ integrations, initialStats }) {
  const router = useRouter();
  const [stats, setStats] = useState(initialStats);
  const [form, setForm] = useState({
    subscribers: initialStats.subscribers,
    followers: initialStats.followers,
    topRegion: initialStats.topRegion,
  });
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  async function saveStats(e) {
    e.preventDefault();
    setSaving(true);
    setSavedMsg("");
    const res = await fetch("/api/dashboard/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const next = await res.json();
    setStats(next);
    setSaving(false);
    setSavedMsg("Saved — live on Work with me now.");
  }

  async function logSnapshot() {
    setSaving(true);
    const res = await fetch("/api/dashboard/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "log-snapshot", subscribers: form.subscribers, followers: form.followers }),
    });
    const next = await res.json();
    setStats(next);
    setSaving(false);
    setSavedMsg(`Logged today's snapshot (${next.history.length} total).`);
  }

  async function logout() {
    await fetch("/api/dashboard/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  }

  return (
    <div className="container-x py-12 max-w-3xl">
      <div className="flex items-center justify-between mb-8 gap-3 flex-wrap">
        <h1 className="font-display text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          Dashboard
        </h1>
        <button onClick={logout} className="btn-pop-ghost !py-1.5 !px-4 text-xs">
          Log out
        </button>
      </div>

      {/* Integration status */}
      <section className="mb-12">
        <h2 className="font-display text-xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
          What's connected
        </h2>
        <div className="card-pop p-5">
          {integrations.map((item) => (
            <StatusRow key={item.name} item={item} />
          ))}
        </div>
      </section>

      {/* Editable stats */}
      <section className="mb-12">
        <h2 className="font-display text-xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Work-with-me stats
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          These three numbers are what visitors see on the public Work-with-me page.
        </p>
        <form onSubmit={saveStats} className="card-pop p-5 flex flex-col gap-4">
          <label className="text-sm font-bold flex flex-col gap-1">
            YouTube subscribers
            <input
              type="number"
              value={form.subscribers}
              onChange={(e) => setForm({ ...form, subscribers: Number(e.target.value) })}
              className="rounded-lg px-3 py-2 text-sm bg-white font-normal"
              style={{ border: "2px solid var(--ink)" }}
            />
          </label>
          <label className="text-sm font-bold flex flex-col gap-1">
            Instagram followers
            <input
              type="number"
              value={form.followers}
              onChange={(e) => setForm({ ...form, followers: Number(e.target.value) })}
              className="rounded-lg px-3 py-2 text-sm bg-white font-normal"
              style={{ border: "2px solid var(--ink)" }}
            />
          </label>
          <label className="text-sm font-bold flex flex-col gap-1">
            Top audience region
            <input
              type="text"
              value={form.topRegion}
              onChange={(e) => setForm({ ...form, topRegion: e.target.value })}
              className="rounded-lg px-3 py-2 text-sm bg-white font-normal"
              style={{ border: "2px solid var(--ink)" }}
            />
          </label>
          <div className="flex items-center gap-3 flex-wrap">
            <button type="submit" disabled={saving} className="btn-pop !py-2">
              {saving ? "Saving…" : "Save"}
            </button>
            <button type="button" onClick={logSnapshot} disabled={saving} className="btn-pop-ghost !py-2">
              Log today's snapshot
            </button>
            {savedMsg && <span className="text-sm font-bold" style={{ color: "#1a7f37" }}>{savedMsg}</span>}
          </div>
          {stats.updatedAt && (
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Last updated {formatUpdatedAt(stats.updatedAt)}
            </p>
          )}
        </form>
      </section>

      {/* Growth log */}
      <section className="mb-4">
        <h2 className="font-display text-xl mb-1" style={{ fontFamily: "var(--font-display)" }}>
          Growth log
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          Manual for now — click "Log today's snapshot" above whenever you check your real numbers. Once a YouTube
          Data API key and a persistent store are wired up, this can log itself daily.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <GrowthChart
            title="Subscribers"
            color="var(--red)"
            data={stats.history.map((h) => ({ date: h.date, value: h.subscribers }))}
          />
          <GrowthChart
            title="Followers"
            color="var(--cobalt)"
            data={stats.history.map((h) => ({ date: h.date, value: h.followers }))}
          />
        </div>
      </section>
    </div>
  );
}
