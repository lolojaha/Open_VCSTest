import { Disclaimer } from "@/components/disclaimer";

export default function FAQPage() {
  return (
    <div className="space-y-4 card">
      <h1 className="text-2xl font-bold">FAQ</h1>
      <Disclaimer />
      <p><strong>Is this diagnostic?</strong> No, screening tool only.</p>
      <p><strong>Do I need an account?</strong> No.</p>
      <p><strong>Where is my data stored?</strong> By default only in your browser localStorage.</p>
    </div>
  );
}
