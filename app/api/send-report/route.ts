import { Resend } from "resend";

export async function POST(req: Request) {
  const { email, pdfBase64 } = await req.json();
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return new Response("Missing RESEND env", { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: email,
    subject: "OpenVCS Report",
    html: "<p>Your OpenVCS report is attached.</p><p><strong>Screening tool only – not diagnostic – consult a physician.</strong></p>",
    attachments: [{ filename: "openvcs-report.pdf", content: pdfBase64 }],
  });

  return Response.json(result);
}
