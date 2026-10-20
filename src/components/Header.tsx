"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useSyncExternalStore } from "react";
import { ChevronIcon, MoonIcon, QuillIcon, SearchIcon } from "./icons";
import { navItems } from "./Sidebar";
import { logout } from "@/lib/api/auth";
import {
  getServerAuthSnapshot,
  isAuthenticated,
  subscribeToAuthChanges,
} from "@/lib/api/tokens";

export function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const authenticated = useSyncExternalStore(
    subscribeToAuthChanges,
    isAuthenticated,
    getServerAuthSnapshot,
  );

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setOpen(false);
  }

  async function onLogout() {
    try {
      await logout();
    } catch {
      // The local session is cleared even if the API is unreachable.
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-[color:var(--header)]">
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center gap-4 px-4 lg:px-6">
        <button
          type="button"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[color:var(--line-strong)] lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <QuillIcon className="h-8 w-8 shrink-0 text-[color:var(--cream)]" />
          <span className="leading-tight">
            <span className="font-serif text-[22px] font-semibold tracking-tight text-[color:var(--cream)]">
              BulkNewsMedia
            </span>
            <span className="mt-0.5 hidden text-[9px] font-semibold tracking-[0.22em] text-[color:var(--muted)] sm:block">
              BEYOND THE HEADLINES.
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2 text-[13px] text-[color:var(--cream-dim)]">
          <form
            onSubmit={onSearch}
            className="hidden items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-[color:var(--page)] px-3 py-1.5 md:flex"
          >
            <SearchIcon className="h-4 w-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-28 bg-transparent text-[color:var(--cream)] outline-none placeholder:text-[color:var(--muted)] lg:w-36"
            />
            <kbd className="rounded border border-[color:var(--line-strong)] px-1.5 py-0.5 text-[10px] text-[color:var(--muted)]">
              ⌘K
            </kbd>
          </form>

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--line-strong)]"
            aria-label="Theme"
          >
            <MoonIcon className="h-4 w-4" />
          </button>

          <Link href="/stories" className="hidden px-2 py-1 hover:text-[color:var(--cream)] lg:inline">
            Stories
          </Link>
          <Link href="/send-a-lead" className="hidden px-2 py-1 hover:text-[color:var(--cream)] lg:inline">
            Send a lead
          </Link>
          <button
            type="button"
            className="hidden items-center gap-1 px-2 py-1 hover:text-[color:var(--cream)] lg:inline-flex"
          >
            Connect <ChevronIcon className="h-3 w-3" />
          </button>
          {authenticated ? (
            <button type="button" onClick={onLogout} className="px-2 py-1 hover:text-[color:var(--cream)]">
              Sign out
            </button>
          ) : (
            <>
              <Link href="/signin" className="hidden px-2 py-1 hover:text-[color:var(--cream)] sm:inline">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-[color:var(--primary)] hover:bg-[color:var(--primary-light)] px-4 py-1.5 text-[13px] font-medium text-[color:var(--on-primary)]"
              >
                Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--line-strong)] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Search"
          >
            <SearchIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="presentation" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <section
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-y-0 left-0 flex w-[min(84vw,340px)] flex-col overflow-y-auto border-r border-[color:var(--line)] bg-[color:var(--header)] px-5 pb-6 pt-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between border-b border-[color:var(--line)] pb-4">
              <span className="font-serif text-xl font-semibold text-[color:var(--cream)]">Explore</span>
              <button type="button" onClick={() => setMenuOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--line-strong)]" aria-label="Close navigation menu">
                <span aria-hidden="true" className="text-xl leading-none">×</span>
              </button>
            </div>
            <nav aria-label="Categories">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href + item.label}>
                    <Link href={item.href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-3 hover:bg-[color:var(--surface)]">
                      <span className="block font-serif text-base text-[color:var(--cream)]">{item.label}</span>
                      <span className="mt-0.5 block text-xs text-[color:var(--muted)]">{item.hint}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto border-t border-[color:var(--line)] pt-4">
              <Link href="/send-a-lead" onClick={() => setMenuOpen(false)} className="block rounded-full bg-[color:var(--primary)] px-4 py-3 text-center text-sm font-medium text-[color:var(--on-primary)]">Send a tip</Link>
            </div>
          </section>
        </div>
      ) : null}
      {open ? (
        <form onSubmit={onSearch} className="border-t border-[color:var(--line)] px-4 py-3 md:hidden">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories"
            className="w-full rounded-full border border-[color:var(--line-strong)] bg-[color:var(--page)] px-4 py-2 text-[color:var(--cream)] outline-none"
          />
        </form>
      ) : null}
    </header>
  );
}
