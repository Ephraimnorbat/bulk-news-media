import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getStory } from "@/lib/api/stories";
import { formatDeskDate } from "@/lib/format";

export const metadata = { title: "Story" };

export default function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<StoryFallback />}>
      <StoryContent params={params} />
    </Suspense>
  );
}

async function StoryContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();

  return (
    <article className="group rounded-[28px] border border-[color:var(--card-edge)] bg-[color:var(--surface)] p-6 transition duration-300 hover:border-[color:var(--line-strong)] hover:shadow-xl motion-reduce:transition-none sm:p-10">
      {story.kicker ? (
        <p className="text-[10px] font-semibold tracking-[0.22em] text-[color:var(--muted)]">
          {story.kicker}
        </p>
      ) : (
        <p className="text-[10px] font-semibold tracking-[0.22em] text-[color:var(--primary-light)]">STORY</p>
      )}
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-[color:var(--cream)]">
        {story.title}
      </h1>
      <p className="mt-4 text-sm text-[color:var(--muted)]">
        {story.author} · {formatDeskDate(story.published_at)}
      </p>
      {story.image ? (
        <div className="relative mt-7 aspect-[16/9] max-h-[560px] overflow-hidden rounded-2xl">
          <Image
            src={story.image}
            alt={story.title}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
            unoptimized
            priority
          />
        </div>
      ) : null}
      <p className="mt-8 max-w-2xl text-lg leading-8 text-[color:var(--cream-dim)]">
        {story.body ?? story.excerpt}
      </p>
    </article>
  );
}

function StoryFallback() {
  return (
    <div className="animate-pulse rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-8" aria-label="Loading story">
      <div className="h-8 w-2/3 rounded bg-[color:var(--chip)]" />
      <div className="mt-6 aspect-[16/9] rounded-2xl bg-[color:var(--chip)]" />
      <div className="mt-8 h-40 rounded bg-[color:var(--chip)]" />
    </div>
  );
}
