"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useSyncExternalStore } from "react";
import { ChevronIcon, MoonIcon, QuillIcon, SearchIcon } from "./icons";
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
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <QuillIcon className="h-8 w-8 shrink-0 text-[color:var(--cream)]" />
          <span className="leading-tight">
            <span className="font-serif text-[22px] font-semibold tracking-tight text-[color:var(--cream)]">
              BulkNewsMedia
            </span>
            <span className="mt-0.5 hidden text-[9px] font-semibold tracking-[0.22em] text-[color:var(--muted)] sm:block">
              UNFILTERED. BOLD. UNCOVERED.
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
