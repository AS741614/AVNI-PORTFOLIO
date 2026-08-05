"use client";
import { useMemo, useState } from "react";

const WIDTH = 560;
const HEIGHT = 180;
const PAD = { top: 16, right: 16, bottom: 28, left: 44 };

// Single-series line — no legend needed (a single series is named by its
// title). 2px line, rounded data-end, hover crosshair + tooltip, table
// fallback. Color is passed in per-chart (poster red for subscribers,
// cobalt for followers) since these are two separate small multiples,
// never one dual-axis chart.
export default function GrowthChart({ title, data, color, unit = "" }) {
  const [hoverIdx, setHoverIdx] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const { points, minV, maxV } = useMemo(() => {
    if (!data.length) return { points: [], minV: 0, maxV: 1 };
    const values = data.map((d) => d.value);
    const minV = Math.min(...values);
    const maxV = Math.max(...values);
    const span = maxV - minV || 1;
    const innerW = WIDTH - PAD.left - PAD.right;
    const innerH = HEIGHT - PAD.top - PAD.bottom;
    const points = data.map((d, i) => ({
      ...d,
      x: PAD.left + (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW),
      y: PAD.top + innerH - ((d.value - minV) / span) * innerH,
    }));
    return { points, minV, maxV };
  }, [data]);

  if (!data.length) {
    return (
      <div className="card-pop p-5">
        <p className="font-bold mb-1">{title}</p>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          No snapshots logged yet — log today's number below to start the trend.
        </p>
      </div>
    );
  }

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const active = hoverIdx !== null ? points[hoverIdx] : points[points.length - 1];

  return (
    <div className="card-pop p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="font-bold">{title}</p>
        <button
          onClick={() => setShowTable((v) => !v)}
          className="text-xs font-bold underline"
          style={{ color: "var(--muted)" }}
        >
          {showTable ? "View chart" : "View table"}
        </button>
      </div>

      {showTable ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid var(--ink)" }}>
                <th className="text-left py-1">Date</th>
                <th className="text-right py-1">{title}</th>
              </tr>
            </thead>
            <tbody>
              {[...data].reverse().map((d) => (
                <tr key={d.date} style={{ borderBottom: "1px solid #e3e3e3" }}>
                  <td className="py-1">{d.date}</td>
                  <td className="py-1 text-right">{d.value.toLocaleString()}{unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="w-full"
            onMouseLeave={() => setHoverIdx(null)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const relX = ((e.clientX - rect.left) / rect.width) * WIDTH;
              let nearest = 0;
              let best = Infinity;
              points.forEach((p, i) => {
                const d = Math.abs(p.x - relX);
                if (d < best) {
                  best = d;
                  nearest = i;
                }
              });
              setHoverIdx(nearest);
            }}
          >
            {/* recessive gridline */}
            <line x1={PAD.left} y1={HEIGHT - PAD.bottom} x2={WIDTH - PAD.right} y2={HEIGHT - PAD.bottom} stroke="#e3e3e3" strokeWidth="1" />
            <text x={PAD.left} y={14} fontSize="10" fill="var(--muted)">{maxV.toLocaleString()}</text>
            <text x={PAD.left} y={HEIGHT - PAD.bottom - 4} fontSize="10" fill="var(--muted)">{minV.toLocaleString()}</text>

            <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* rounded data-end */}
            <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="4" fill={color} />

            {hoverIdx !== null && (
              <line x1={active.x} y1={PAD.top} x2={active.x} y2={HEIGHT - PAD.bottom} stroke="var(--ink)" strokeWidth="1" strokeDasharray="3,3" />
            )}
            {points.map((p, i) => (
              <circle
                key={p.date}
                cx={p.x}
                cy={p.y}
                r={hoverIdx === i ? 5 : 3}
                fill={hoverIdx === i ? color : "#fff"}
                stroke={color}
                strokeWidth="2"
              />
            ))}
          </svg>
          <div className="flex items-center justify-between mt-1 text-xs" style={{ color: "var(--muted)" }}>
            <span>{data[0].date}</span>
            <span className="font-bold" style={{ color: "var(--ink)" }}>
              {active.date}: {active.value.toLocaleString()}{unit}
            </span>
            <span>{data[data.length - 1].date}</span>
          </div>
        </>
      )}
    </div>
  );
}
