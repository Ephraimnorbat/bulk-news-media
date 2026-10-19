"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { login, register } from "@/lib/api/auth";

type Mode = "signin" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      if (mode === "signin") {
        await login(username, password);
      } else {
        await register({ username, email, password });
      }
      router.push("/");
    } catch {
      setError(
        mode === "signin"
          ? "Could not sign in. Check your details or API URL."
          : "Could not create the account. The Django API may be offline.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-8">
      <h1 className="font-serif text-3xl text-[color:var(--cream)]">
        {mode === "signin" ? "Sign in" : "Create an account"}
      </h1>
      <p className="mt-2 text-sm text-[color:var(--muted)]">
        {mode === "signin"
          ? "Use the Django REST credentials issued by the newsroom."
          : "Join BulkNewsMedia to follow live desks and send leads."}
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block text-sm">
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--page)] px-4 py-2 outline-none"
          />
        </label>
        {mode === "signup" ? (
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
        ) : null}
        <label className="block text-sm">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--page)] px-4 py-2 outline-none"
          />
        </label>
        {error ? <p className="text-sm text-[color:var(--primary-light)]">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-[color:var(--primary)] hover:bg-[color:var(--primary-light)] py-2.5 font-medium text-[color:var(--on-primary)] disabled:opacity-60"
        >
          {pending ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
        </button>
      </form>
      <p className="mt-4 text-sm text-[color:var(--muted)]">
        {mode === "signin" ? (
          <>
            No account?{" "}
            <Link href="/signup" className="text-[color:var(--cream)] underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/signin" className="text-[color:var(--cream)] underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
