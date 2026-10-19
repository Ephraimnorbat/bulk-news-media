import Link from "next/link";
import { searchStories } from "@/lib/api/stories";

export const metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = q ? await searchStories(q) : [];

  return (
    <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 sm:p-8">
      <h1 className="font-serif text-4xl">Search</h1>
      <form className="mt-6">
        <input
          name="q"
          defaultValue={q}
          placeholder="Find people, cases, and stories"
          className="w-full max-w-xl rounded-full border border-[color:var(--line-strong)] bg-[color:var(--page)] px-5 py-3 outline-none"
        />
      </form>
      <ul className="mt-8 space-y-5">
        {results.map((story) => (
          <li key={story.id}>
            <Link href={`/stories/${story.slug}`} className="font-serif text-xl">
              {story.title}
            </Link>
            {story.excerpt ? (
              <p className="mt-1 text-sm text-[color:var(--muted)]">{story.excerpt}</p>
            ) : null}
          </li>
        ))}
        {q && results.length === 0 ? (
          <li className="text-[color:var(--muted)]">No matching stories yet.</li>
        ) : null}
      </ul>
    </section>
  );
}
