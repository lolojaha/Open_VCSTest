import Link from "next/link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-sky-300">
          OpenVCS / FreeVCS Test
        </Link>
        <nav className="flex gap-4 text-sm text-slate-300">
          <Link href="/about">About/Science</Link>
          <Link href="/how-to">How to Use</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mt-10 border-t border-slate-700/60 pt-6 text-sm text-slate-400">
        <p>Screening tool only – not diagnostic – consult a physician.</p>
        <p>
          Made open-source to help patients & researchers · MIT License · GitHub: add your repository URL in
          README.
        </p>
      </footer>
    </div>
  );
}
