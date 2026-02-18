import { Disclaimer } from "@/components/disclaimer";

export default function AboutPage() {
  return (
    <div className="space-y-4 card">
      <h1 className="text-2xl font-bold">About / Science</h1>
      <Disclaimer />
      <p>OpenVCS documents all scoring logic publicly. The algorithm focuses on rows C and D as commonly cited in public Shoemaker screening descriptions.</p>
      <ul className="list-disc pl-5">
        <li>Shoemaker RC et al. biotoxin/CIRS resources and VCS screening literature.</li>
        <li>FACT and contrast sensitivity references from vision science publications.</li>
        <li>NIH/NLM resources on contrast sensitivity and visual pathways.</li>
      </ul>
    </div>
  );
}
