import Link from "next/link";

const nav = [
  { href: "/", label: "Home", hint: "Latest reporting" },
  { href: "/stories", label: "Stories", hint: "Developing & live coverage" },
  { href: "/videos", label: "Videos", hint: "Raw clips" },
  { href: "/media", label: "Media", hint: "Photos, audio, documents" },
  { href: "/topics", label: "Topics", hint: "Browse by subject" },
  { href: "/stories?sort=trending", label: "Trending", hint: "Most-read stories" },
  { href: "/search", label: "Search", hint: "Find people and cases" },
  { href: "/tips", label: "Tips", hint: "Send evidence" },
  { href: "/blog", label: "Blog", hint: "Analysis and columns" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-[210px] shrink-0 lg:block">
      <div className="sticky top-[84px] space-y-4">
        <nav className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-5">
          <ul className="space-y-4">
            {nav.map((item) => (
              <li key={item.href + item.label}>
                <Link href={item.href} className="block group">
                  <div className="font-serif text-[15px] text-[color:var(--cream)] group-hover:text-white">
                    {item.label}
                  </div>
                  <div className="text-[11px] leading-tight text-[color:var(--muted)]">{item.hint}</div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-5">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[color:var(--muted)]">
            TRACK THE STORY
          </p>
          <p className="mt-3 text-[13px] leading-5 text-[color:var(--cream-dim)]">
            Stories keep every update, document, video, and correction in one place.
          </p>
          <Link
            href="/stories"
            className="mt-4 inline-flex text-[13px] font-medium text-[color:var(--cream)] underline decoration-[color:var(--muted)] underline-offset-4"
          >
            Open live stories
          </Link>
        </div>
      </div>
    </aside>
  );
}
