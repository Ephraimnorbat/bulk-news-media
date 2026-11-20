import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getStory } from "@/lib/api/stories";
import { formatDeskDate } from "@/lib/format";

export const metadata = { title: "News" };

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
    <article className="group rounded-[24px] border border-[color:var(--card-edge)] bg-[color:var(--surface)] p-4 transition duration-300 hover:border-[color:var(--line-strong)] hover:shadow-xl motion-reduce:transition-none sm:rounded-[28px] sm:p-10">
      {story.kicker ? (
        <p className="text-[10px] font-semibold tracking-[0.22em] text-[color:var(--muted)]">
          {story.kicker}
        </p>
      ) : (
        <p className="text-[10px] font-semibold tracking-[0.22em] text-[color:var(--primary-light)]">{categoryLabel(story.category)}</p>
      )}
      <h1 className="mt-3 max-w-3xl font-serif text-3xl leading-[1.12] text-[color:var(--cream)] sm:text-4xl sm:leading-tight">
        {story.title}
      </h1>
      <p className="mt-4 text-sm text-[color:var(--muted)]">
        {story.author} · {formatDeskDate(story.published_at)}
      </p>
      {story.image ? (
        <div className="relative mt-6 aspect-[4/5] max-h-[440px] overflow-hidden rounded-2xl bg-[color:var(--chip)] sm:mt-7 sm:aspect-[16/9] sm:max-h-[560px]">
          <Image
            src={story.image}
            alt={story.title}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-contain"
            unoptimized
            priority
          />
        </div>
      ) : null}
      <p className="mt-6 max-w-2xl text-base leading-7 text-[color:var(--cream-dim)] sm:mt-8 sm:text-lg sm:leading-8">
        {story.body ?? story.excerpt}
      </p>
    </article>
  );
}

function categoryLabel(category?: string) {
  const labels: Record<string, string> = {
    news: "NEWS",
    opinion: "OPINION",
    court_case: "COURT CASE",
    photo_story: "PHOTO STORY",
    interview: "INTERVIEW",
  };
  return labels[category ?? "news"] ?? "NEWS";
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
