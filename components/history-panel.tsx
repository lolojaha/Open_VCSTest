"use client";

import { useEffect, useState } from "react";

type Entry = { date: string; c: number; d: number; pass: boolean };

export function HistoryPanel() {
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem("openvcs-history");
    if (raw) setEntries(JSON.parse(raw));
  }, []);

  if (!entries.length) return <p className="text-sm text-slate-400">No local history yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400">
            <th>Date</th><th>C</th><th>D</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={i} className="border-t border-slate-700">
              <td>{e.date}</td><td>{e.c}</td><td>{e.d}</td><td>{e.pass ? "Pass" : "Fail"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
