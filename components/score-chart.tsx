import { FREQUENCIES, normRange, type RowScore } from "@/lib/vcs";

export function ScoreChart({ scores }: { scores: RowScore[] }) {
  const width = 540;
  const height = 220;
  const x = (i: number) => 40 + i * 110;
  const y = (v: number) => 190 - v * 16;
  const points = FREQUENCIES.map((f, i) => `${x(i)},${y(scores.find((s) => s.frequency === f.key)?.lastCorrectLevel ?? 0)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full rounded-lg bg-slate-900 p-2">
      {[1, 3, 5, 7, 9].map((t) => (
        <g key={t}>
          <line x1={30} x2={width - 20} y1={y(t)} y2={y(t)} stroke="#334155" />
          <text x={8} y={y(t) + 4} fill="#94a3b8" fontSize="10">{t}</text>
        </g>
      ))}
      {FREQUENCIES.map((f, i) => {
        const [min, max] = normRange(f.key);
        return (
          <g key={f.key}>
            <rect x={x(i) - 10} y={y(max)} width={20} height={y(min) - y(max)} fill="#0ea5e955" />
            <text x={x(i) - 8} y={205} fill="#cbd5e1" fontSize="11">{f.key}</text>
          </g>
        );
      })}
      <polyline points={points} fill="none" stroke="#38bdf8" strokeWidth={2} />
      {FREQUENCIES.map((f, i) => (
        <circle key={f.key} cx={x(i)} cy={y(scores.find((s) => s.frequency === f.key)?.lastCorrectLevel ?? 0)} r={4} fill="#7dd3fc" />
      ))}
    </svg>
  );
}
