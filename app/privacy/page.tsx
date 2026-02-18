import { Disclaimer } from "@/components/disclaimer";

export default function PrivacyPage() {
  return (
    <div className="space-y-4 card">
      <h1 className="text-2xl font-bold">Privacy</h1>
      <Disclaimer />
      <p>No accounts are required. No test results are stored server-side by default.</p>
      <p>Only email delivery via Resend transmits report data when you explicitly send a report.</p>
    </div>
  );
}
