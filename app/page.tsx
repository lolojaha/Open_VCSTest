import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="card space-y-4">
        <h1 className="text-3xl font-bold">OpenVCS / FreeVCS Test</h1>
        <p>
          OpenVCS is a free, open-source visual contrast sensitivity (VCS) screening app inspired by published
          Functional Acuity Contrast Test (FACT) and biotoxin/CIRS literature.
        </p>
        <p>
          It is built for education, self-screening, and research support. No account is required; local history is optional.
        </p>
        <Disclaimer />
        <Link href="/test" className="btn-primary">Start Free Test</Link>
      </section>
      <section className="card">
        <h2 className="mb-3 text-xl font-semibold">Research links</h2>
        <ul className="list-disc space-y-2 pl-5 text-sky-200">
          <li><a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank">PubMed index for CIRS/VCS papers</a></li>
          <li><a href="https://www.survivingmold.com" target="_blank">Shoemaker protocol resource</a></li>
          <li><a href="https://www.ncbi.nlm.nih.gov/books/NBK219042/" target="_blank">Contrast sensitivity science overview</a></li>
        </ul>
      </section>
    </div>
  );
}
