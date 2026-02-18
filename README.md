# OpenVCS (FreeVCS Test)

OpenVCS is a free, open-source clone-style Visual Contrast Sensitivity screening web app inspired by public FACT/Shoemaker/CIRS resources.

> **Medical disclaimer:** Screening tool only – not diagnostic – consult a physician.

## Stack
- Next.js 15 + TypeScript (App Router)
- TailwindCSS + lucide-react + shadcn-compatible component style
- Canvas API for sine-wave gratings
- @react-pdf/renderer for report generation
- Resend for optional emailed PDF
- Zustand state management

## Features
- Home + science background + references
- Pre-test calibration (ruler width, viewing distance, brightness/gamma ramp)
- VCS core test: 5 frequencies (A–E), 9 contrast levels, randomized orientation/phase
- Row stop logic: two misses or cannot-see
- Optional 37-question symptom screen in 13 clusters
- Results with chart, C/D screening interpretation, CSV export
- Multi-page-ready PDF generation (implemented compact single-page layout)
- Email PDF with Resend API
- Local history in localStorage
- Privacy/About/FAQ/How-to pages

## Scoring algorithm (public)
- Rows are scored 1–9 based on last correctly identified contrast level.
- This implementation uses a public Shoemaker-style screening threshold focusing on:
  - `C >= 7`
  - `D >= 6`
- If both true: screen pass/negative; else fail/positive screening note.
- This is intentionally transparent and editable in `lib/vcs.ts`.

## Grating math
Gratings are generated in `components/grating-canvas.tsx` with direct Canvas pixel math:

```ts
value = 127 + 127 * contrast * sin(2π * freq * xr + phase)
```

- `xr` is the rotated coordinate based on orientation angle.
- Orientation options: left oblique (~135°), vertical (90°), right oblique (~45°).
- Phase randomized each trial.

## Run locally
```bash
npm install
npm run dev
```

## Deploy on Vercel (free)
1. Push repo to GitHub.
2. Import to Vercel.
3. Add env vars from `.env.example`.
4. Deploy.

## Resend setup
1. Create free Resend account.
2. Verify sender domain.
3. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`.
4. Use the "Send PDF Report" feature.

## Self-host
- Any Node 18+ host:
```bash
npm install
npm run build
npm start
```

## References (public starting points)
- Surviving Mold / Shoemaker public resources
- PubMed entries on VCS and biotoxin illness
- NLM/NIH visual contrast and neuro-ophthalmic literature
- FACT/contrast sensitivity chart methodology publications

## Open source
MIT licensed. Contributions welcome.

> **Medical disclaimer:** Screening tool only – not diagnostic – consult a physician.
## TEST LINE