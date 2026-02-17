export type Orientation = "left" | "vertical" | "right";

export const FREQUENCIES = [
  { key: "A", cpd: 1.5 },
  { key: "B", cpd: 3 },
  { key: "C", cpd: 6 },
  { key: "D", cpd: 12 },
  { key: "E", cpd: 18 },
] as const;

// 9 levels, descending contrast around ~0.15 log steps.
export const CONTRAST_LEVELS = [1, 0.71, 0.5, 0.355, 0.251, 0.178, 0.126, 0.089, 0.063] as const;

export type RowScore = {
  frequency: (typeof FREQUENCIES)[number]["key"];
  lastCorrectLevel: number;
};

export function evaluateBiotoxinScreen(scores: RowScore[]) {
  const c = scores.find((s) => s.frequency === "C")?.lastCorrectLevel ?? 0;
  const d = scores.find((s) => s.frequency === "D")?.lastCorrectLevel ?? 0;
  const passed = c >= 7 && d >= 6;
  return {
    passed,
    c,
    d,
    rationale:
      "Public Shoemaker-style screening convention often references C and D rows; this implementation marks pass if C >= 7 and D >= 6 (1-9 scale).",
  };
}

export function normRange(freq: string) {
  if (freq === "A" || freq === "B") return [5, 9];
  if (freq === "C") return [6, 9];
  if (freq === "D") return [5, 9];
  return [4, 8];
}
