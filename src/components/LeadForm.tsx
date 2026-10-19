"use client";

import { FormEvent, useState } from "react";
import { sendLead } from "@/lib/api/auth";

export function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tip, setTip] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setStatus("idle");
    try {
      await sendLead({ name, email, phone, tip });
      setStatus("ok");
      setName("");
      setEmail("");
      setPhone("");
      setTip("");
    } catch {
      setStatus("err");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 max-w-xl space-y-4">
      <label className="block text-sm">
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--page)] px-4 py-2 outline-none"
        />
      </label>
      <label className="block text-sm">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--page)] px-4 py-2 outline-none"
        />
      </label>
      <label className="block text-sm">
        Phone
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--page)] px-4 py-2 outline-none"
        />
      </label>
      <label className="block text-sm">
        What should we look into?
        <textarea
          value={tip}
          onChange={(e) => setTip(e.target.value)}
          required
          rows={6}
          className="mt-1 w-full rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--page)] px-4 py-3 outline-none"
        />
      </label>
      {status === "ok" ? (
        <p className="text-sm text-[color:var(--live)]">Lead received. We will review it on the desk.</p>
      ) : null}
      {status === "err" ? (
        <p className="text-sm text-[color:var(--primary-light)]">
          Could not send yet. Confirm the Django API is running at the URL in `.env.local`.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[color:var(--primary)] hover:bg-[color:var(--primary-light)] px-6 py-2.5 font-medium text-[color:var(--on-primary)]"
      >
        {pending ? "Sending…" : "Send a lead"}
      </button>
    </form>
  );
}
