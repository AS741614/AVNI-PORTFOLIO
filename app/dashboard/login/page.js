"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/dashboard/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push(params.get("next") || "/dashboard");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong.");
    }
  }

  return (
    <div className="container-x py-20 max-w-sm">
      <div className="flex justify-center mb-6">
        <span className="logo-sticker" style={{ width: 48, height: 48, fontSize: "1.4rem" }}>A</span>
      </div>
      <h1 className="font-display text-2xl text-center mb-2" style={{ fontFamily: "var(--font-display)" }}>
        Dashboard
      </h1>
      <p className="text-sm text-center mb-8" style={{ color: "var(--muted)" }}>
        Private — just for Avni.
      </p>
      <form onSubmit={submit} className="card-pop p-6 flex flex-col gap-4">
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="rounded-full px-4 py-2.5 text-sm bg-white"
          style={{ border: "2px solid var(--ink)" }}
        />
        {error && (
          <p className="text-sm font-bold" style={{ color: "var(--red)" }}>
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn-pop justify-center">
          {loading ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}

export default function DashboardLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
