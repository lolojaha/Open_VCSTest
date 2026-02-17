"use client";

import { symptomClusters } from "@/lib/questions";
import { useAppStore } from "@/lib/store";

export function SymptomForm() {
  const answers = useAppStore((s) => s.symptomAnswers);
  const setAnswer = useAppStore((s) => s.setSymptomAnswer);

  return (
    <div className="space-y-6">
      {symptomClusters.map((cluster) => (
        <section key={cluster.cluster} className="card">
          <h3 className="mb-3 font-semibold text-sky-300">{cluster.cluster}</h3>
          <div className="space-y-2">
            {cluster.questions.map((q) => (
              <label className="flex items-center justify-between rounded border border-slate-700 p-3" key={q}>
                <span>{q}</span>
                <input type="checkbox" checked={answers[q] || false} onChange={(e) => setAnswer(q, e.target.checked)} />
              </label>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
