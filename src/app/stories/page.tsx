import Link from "next/link";
import { Suspense } from "react";
import { getDeskStories, getRisingStories } from "@/lib/api/stories";
import { formatDeskDate } from "@/lib/format";

export const metadata = { title: "Stories" };

// 1. Move your asynchronous data fetching and rendering logic into a child component
async function StoriesList() {
  const [desk, rising] = await Promise.all([getDeskStories(), getRisingStories()]);
  const stories = [...desk, ...rising];

  return (
    <ul className="mt-8 divide-y divide-[color:var(--line)]">
      {stories.map((story) => (
        <li key={story.id} className="group rounded-xl px-3 py-5 transition duration-300 hover:bg-[color:var(--chip)] motion-reduce:transition-none">
          <Link href={`/stories/${story.slug}`} className="block">
            {story.status ? (
              <span className="text-[10px] font-semibold tracking-[0.16em] text-[color:var(--primary-light)]">
                {story.status.toUpperCase()}
              </span>
            ) : null}
            <h2 className="mt-1 font-serif text-2xl leading-snug transition-colors group-hover:text-[color:var(--primary-light)]">{story.title}</h2>
            {story.excerpt ? (
              <p className="mt-2 max-w-2xl text-sm text-[color:var(--muted)]">{story.excerpt}</p>
            ) : null}
            <p className="mt-2 text-xs text-[color:var(--muted)]">
              {story.author} · {formatDeskDate(story.published_at)}
            </p>
          </Link>
        </li>
      ))}
      {stories.length === 0 ? (
        <p className="py-6 text-sm text-[color:var(--muted)]">No stories available right now.</p>
      ) : null}
    </ul>
  );
}

// 2. The main page component wraps the list in a Suspense boundary
export default function StoriesPage() {
  return (
    <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 sm:p-8">
      <p className="text-[10px] font-semibold tracking-[0.22em] text-[color:var(--muted)]">LIVE DESK</p>
      <h1 className="mt-2 font-serif text-4xl text-[color:var(--cream)]">Stories</h1>
      
      <Suspense fallback={<div className="mt-8 text-sm text-[color:var(--muted)]">Loading stories...</div>}>
        <StoriesList />
      </Suspense>
    </section>
  );
}