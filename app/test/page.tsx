"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { GratingCanvas } from "@/components/grating-canvas";
import { SymptomForm } from "@/components/symptom-form";
import { Disclaimer } from "@/components/disclaimer";
import { useAppStore } from "@/lib/store";
import { CONTRAST_LEVELS, FREQUENCIES, type Orientation, type RowScore } from "@/lib/vcs";

const orientations: Orientation[] = ["left", "vertical", "right"];

export default function TestPage() {
  const router = useRouter();
  const setDemographics = useAppStore((s) => s.setDemographics);
  const setScores = useAppStore((s) => s.setScores);

  const [phase, setPhase] = useState<"setup" | "vcs" | "symptoms">("setup");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [physicalCm, setPhysicalCm] = useState("10");
  const [distanceOk, setDistanceOk] = useState(false);

  const [row, setRow] = useState(0);
  const [level, setLevel] = useState(0);
  const [target, setTarget] = useState<Orientation>("vertical");
  const [scores, setLocalScores] = useState<RowScore[]>([]);
  const [streakMiss, setStreakMiss] = useState(0);
  const [lastCorrect, setLastCorrect] = useState(0);

  useEffect(() => {
    setTarget(orientations[Math.floor(Math.random() * orientations.length)]);
  }, [row, level]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (phase === "vcs") {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== "vcs") return;
      if (e.key === "ArrowLeft") answer("left");
      if (e.key === "ArrowUp") answer("vertical");
      if (e.key === "ArrowRight") answer("right");
      if (e.key === " ") answer("none");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const totalProgress = useMemo(() => ((row * 9 + level + 1) / 45) * 100, [row, level]);

  const finishRow = (score: number) => {
    const nextScores = [...scores, { frequency: FREQUENCIES[row].key, lastCorrectLevel: score }];
    setLocalScores(nextScores);
    if (row === FREQUENCIES.length - 1) {
      setScores(nextScores);
      setPhase("symptoms");
      return;
    }
    setRow((r) => r + 1);
    setLevel(0);
    setStreakMiss(0);
    setLastCorrect(0);
  };

  const answer = (value: Orientation | "none") => {
    const correct = value === target;
    if (correct) {
      setLastCorrect(level + 1);
      setStreakMiss(0);
      if (level === CONTRAST_LEVELS.length - 1) return finishRow(level + 1);
      return setLevel((l) => l + 1);
    }
    if (value === "none") return finishRow(lastCorrect);
    const miss = streakMiss + 1;
    setStreakMiss(miss);
    if (miss >= 2) return finishRow(lastCorrect);
    if (level === CONTRAST_LEVELS.length - 1) return finishRow(lastCorrect);
    setLevel((l) => l + 1);
  };

  if (phase === "setup") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Pre-test Setup</h1>
        <Disclaimer />
        <section className="card space-y-4">
          <label className="block">Age <input className="ml-2 rounded bg-slate-900 p-1" value={age} onChange={(e) => setAge(e.target.value)} /></label>
          <label className="block">Sex <input className="ml-2 rounded bg-slate-900 p-1" value={sex} onChange={(e) => setSex(e.target.value)} /></label>
          <p>Measure the blue bar with a ruler and enter the observed centimeters.</p>
          <div className="h-3 w-64 rounded bg-sky-400" />
          <label>Observed width (cm): <input className="ml-2 w-20 rounded bg-slate-900 p-1" value={physicalCm} onChange={(e) => setPhysicalCm(e.target.value)} /></label>
          <label className="block"><input type="checkbox" checked={distanceOk} onChange={(e) => setDistanceOk(e.target.checked)} /> I am seated 45–60 cm from screen.</label>
          <p className="text-sm">Adjust brightness so grayscale bands are visible but smooth.</p>
          <div className="h-8 rounded bg-gradient-to-r from-black via-slate-500 to-white" />
          <button
            className="btn-primary"
            onClick={() => {
              setDemographics({ age, sex, distanceConfirmed: distanceOk, calibrationPxPerCm: 256 / Number(physicalCm) });
              setPhase("vcs");
            }}
            disabled={!distanceOk}
          >
            Begin VCS test
          </button>
        </section>
      </div>
    );
  }

  if (phase === "symptoms") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Optional 37-question CIRS symptom screen</h2>
        <p className="text-sm text-slate-300">Skip if not needed; clustered summary is shown on results.</p>
        <SymptomForm />
        <button className="btn-primary" onClick={() => router.push("/results")}>View Results</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Disclaimer />
      <div className="card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Row {FREQUENCIES[row].key} · {FREQUENCIES[row].cpd} cpd</h2>
          <span className="text-sm">{Math.round(totalProgress)}%</span>
        </div>
        <div className="mb-4 h-2 rounded bg-slate-800"><div className="h-2 rounded bg-sky-400" style={{ width: `${totalProgress}%` }} /></div>
        <p className="mb-4 text-sm text-slate-300"><AlertTriangle className="mr-2 inline size-4" />Use arrow keys: ← left, ↑ vertical, → right, space = cannot see.</p>
        <div className="rounded-xl bg-black p-8">
          <GratingCanvas contrast={CONTRAST_LEVELS[level]} cpd={FREQUENCIES[row].cpd} orientation={target} phase={Math.random() * Math.PI * 2} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button className="btn-outline" onClick={() => answer("left")}>Left</button>
          <button className="btn-outline" onClick={() => answer("vertical")}>Vertical</button>
          <button className="btn-outline" onClick={() => answer("right")}>Right</button>
          <button className="btn-outline" onClick={() => answer("none")}>I cannot see it</button>
        </div>
      </div>
    </div>
  );
}
