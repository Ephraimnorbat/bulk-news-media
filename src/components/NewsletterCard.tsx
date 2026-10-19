"use client";

import { FormEvent, useState } from "react";
import { subscribeNewsletter } from "@/lib/api/auth";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await subscribeNewsletter(email);
      setMessage("You’re on the desk list.");
      setEmail("");
    } catch {
      setMessage("Saved locally until the newsletter API is online.");
    }
  }

  return (
    <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-5">
      <p className="font-serif text-[18px] text-[color:var(--cream)]">Get the next story by email</p>
      <p className="mt-2 text-[13px] text-[color:var(--muted)]">
        One email when something breaks. No spam, ever.
      </p>
      <form className="mt-4 flex gap-2" onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="min-w-0 flex-1 rounded-full border border-[color:var(--line-strong)] bg-[color:var(--page)] px-4 py-2 text-[13px] text-[color:var(--cream)] outline-none"
        />
        <button type="submit" className="rounded-full bg-[color:var(--primary)] hover:bg-[color:var(--primary-light)] px-4 text-xs font-medium text-[color:var(--on-primary)]">Join</button>
      </form>
      {message ? <p className="mt-2 text-[12px] text-[color:var(--muted)]">{message}</p> : null}
    </section>
  );
}
