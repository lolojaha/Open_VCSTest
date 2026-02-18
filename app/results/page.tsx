"use client";

import { useEffect, useMemo, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { ScoreChart } from "@/components/score-chart";
import { Disclaimer } from "@/components/disclaimer";
import { HistoryPanel } from "@/components/history-panel";
import { symptomClusters } from "@/lib/questions";
import { ReportDoc } from "@/lib/pdf";
import { useAppStore } from "@/lib/store";
import { evaluateBiotoxinScreen } from "@/lib/vcs";

export default function ResultsPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const scores = useAppStore((s) => s.scores);
  const demographics = useAppStore((s) => s.demographics);
  const answers = useAppStore((s) => s.symptomAnswers);

  const evalResult = evaluateBiotoxinScreen(scores);
  const clusterPositive = useMemo(
    () => symptomClusters.filter((c) => c.questions.some((q) => answers[q])).length,
    [answers],
  );

  useEffect(() => {
    if (!scores.length) return;
    const c = scores.find((s) => s.frequency === "C")?.lastCorrectLevel ?? 0;
    const d = scores.find((s) => s.frequency === "D")?.lastCorrectLevel ?? 0;
    const current = JSON.parse(localStorage.getItem("openvcs-history") || "[]");
    const next = [{ date: new Date().toLocaleString(), c, d, pass: evalResult.passed }, ...current].slice(0, 20);
    localStorage.setItem("openvcs-history", JSON.stringify(next));
  }, [scores, evalResult.passed]);

  const exportCsv = () => {
    const rows = scores.map((s) => `${s.frequency},${s.lastCorrectLevel}`).join("\n");
    const blob = new Blob([`frequency,level\n${rows}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "openvcs-results.csv";
    a.click();
  };

  const buildPdf = async () => {
    const doc = <ReportDoc date={new Date().toLocaleDateString()} user={`${demographics.age || "N/A"} / ${demographics.sex || "N/A"}`} scores={scores} symptomClusters={clusterPositive} />;
    const blob = await pdf(doc).toBlob();
    return blob;
  };

  const downloadPdf = async () => {
    const blob = await buildPdf();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "openvcs-report.pdf";
    a.click();
  };

  const sendEmail = async () => {
    setStatus("Sending...");
    const blob = await buildPdf();
    const b64 = await blob.arrayBuffer().then((b) => Buffer.from(b).toString("base64"));
    const res = await fetch("/api/send-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pdfBase64: b64 }),
    });
    setStatus(res.ok ? "Email sent" : "Email failed");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Results</h1>
      <Disclaimer />
      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">Summary: {evalResult.passed ? "Negative / pass screen" : "Positive / fail screen"}</h2>
        <p>{evalResult.rationale}</p>
        <p>Symptom clusters: {clusterPositive} / 13 {clusterPositive >= 8 ? "(positive screening note)" : ""}</p>
      </section>
      <section className="card">
        <ScoreChart scores={scores} />
      </section>
      <section className="card space-y-2">
        {scores.map((s) => <p key={s.frequency}>{s.frequency}: level {s.lastCorrectLevel}</p>)}
      </section>
      <section className="card space-y-3">
        <div className="flex flex-wrap gap-3">
          <button className="btn-primary" onClick={downloadPdf}>Download PDF</button>
          <button className="btn-outline" onClick={exportCsv}>Export CSV</button>
        </div>
        <div className="flex flex-wrap gap-2">
          <input className="rounded bg-slate-900 px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
          <button className="btn-outline" onClick={sendEmail}>Send PDF Report</button>
        </div>
        <p className="text-sm text-slate-400">{status}</p>
      </section>
      <section className="card">
        <h3 className="mb-3 text-lg font-semibold">Local history</h3>
        <HistoryPanel />
      </section>
    </div>
  );
}
