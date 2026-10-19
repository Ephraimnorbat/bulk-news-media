import { LeadForm } from "@/components/LeadForm";

export const metadata = { title: "Send a lead" };

export default function SendLeadPage() {
  return (
    <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 sm:p-8">
      <p className="text-[10px] font-semibold tracking-[0.22em] text-[color:var(--muted)]">NEWSROOM</p>
      <h1 className="mt-2 font-serif text-4xl">Send a lead</h1>
      <p className="mt-3 max-w-xl text-[color:var(--muted)]">
        Documents, names, dates, and what you saw. The interceptor will attach your auth header if
        you are signed in.
      </p>
      <LeadForm />
    </section>
  );
}
