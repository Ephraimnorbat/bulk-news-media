import Image from "next/image";
import Link from "next/link";
import { getStories } from "@/lib/api/stories";
import { formatDeskDate } from "@/lib/format";

export function CategoryFeed({
  category,
  title,
  description,
}: {
  category: string;
  title: string;
  description: string;
}) {
  return <CategoryStories category={category} title={title} description={description} />;
}

async function CategoryStories({ category, title, description }: { category: string; title: string; description: string }) {
  const stories = await getStories(category);
  return (
    <section className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface)] p-4 sm:rounded-[28px] sm:p-8">
      <p className="text-[10px] font-semibold tracking-[0.22em] text-[color:var(--muted)]">BULK NEWS MEDIA</p>
      <h1 className="mt-2 font-serif text-3xl text-[color:var(--cream)] sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-[color:var(--muted)]">{description}</p>
      <ul className="mt-7 divide-y divide-[color:var(--line)]">
        {stories.map((story) => (
          <li key={story.id} className="py-5 first:pt-0 last:pb-0">
            <Link href={`/stories/${story.slug}`} className="group grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
              <div>
                <h2 className="font-serif text-xl leading-snug text-[color:var(--cream)] group-hover:underline sm:text-2xl">{story.title}</h2>
                {story.excerpt ? <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{story.excerpt}</p> : null}
                <p className="mt-3 text-xs text-[color:var(--muted)]">{story.author} · {formatDeskDate(story.published_at)}</p>
              </div>
              {story.image ? (
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[color:var(--chip)]">
                  <Image src={story.image} alt={story.title} fill sizes="(max-width: 640px) 100vw, 220px" className="object-contain" unoptimized />
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
      {stories.length === 0 ? <p className="mt-7 text-sm text-[color:var(--muted)]">No {title.toLowerCase()} published yet.</p> : null}
    </section>
  );
}
