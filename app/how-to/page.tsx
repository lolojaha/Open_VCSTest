import { Disclaimer } from "@/components/disclaimer";

export default function HowToPage() {
  return (
    <div className="space-y-4 card">
      <h1 className="text-2xl font-bold">How to Use</h1>
      <Disclaimer />
      <ol className="list-decimal space-y-2 pl-5">
        <li>Set brightness and screen calibration with a ruler.</li>
        <li>Sit 45-60 cm from your screen in consistent ambient lighting.</li>
        <li>For each grating, select orientation or cannot-see.</li>
        <li>Review results, export CSV/PDF, and optionally email the report.</li>
      </ol>
    </div>
  );
}
