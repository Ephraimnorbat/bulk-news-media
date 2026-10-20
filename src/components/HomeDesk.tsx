import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  getDeskStories,
  getFeaturedStory,
  getMostReadStories,
  getRisingStories,
} from "@/lib/api/stories";
import { formatDeskDate } from "@/lib/format";
import type { Story } from "@/lib/api/types";
import { NewsletterCard } from "./NewsletterCard";

function Featured({ story }: { story: Story }) {
  return (
    <article className="group rounded-[28px] border border-[color:var(--card-edge)] bg-[color:var(--surface)] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--line-strong)] hover:shadow-xl motion-reduce:transition-none sm:p-7">
      <p className="text-[10px] font-semibold tracking-[0.22em] text-[color:var(--muted)]">
        {story.kicker ?? "TOP OF THE DESK · 3D"}
      </p>
      <div className="mt-3 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <h1 className="font-serif text-[28px] leading-[1.15] tracking-tight text-[color:var(--cream)] sm:text-[34px]">
            <Link href={`/stories/${story.slug}`}>{story.title}</Link>
          </h1>
          <p className="mt-4 max-w-xl text-[14px] leading-6 text-[color:var(--muted)]">{story.excerpt}</p>
          <div className="mt-5 flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[color:var(--primary)] hover:bg-[color:var(--primary-light)] text-[12px] font-semibold text-[color:var(--on-primary)]">
              B
            </span>
            <div>
              <p className="text-[13px] text-[color:var(--cream)]">{story.author}</p>
              <p className="text-[11px] text-[color:var(--muted)]">Newsroom</p>
            </div>
          </div>
        </div>
        {story.image ? (
          <Link href={`/stories/${story.slug}`} className="group/image relative block h-[180px] overflow-hidden rounded-2xl sm:h-[210px]">
            <Image
              src={story.image}
              alt={story.title}
              fill
              className="object-cover transition-transform duration-500 group-hover/image:scale-105 motion-reduce:transition-none"
              unoptimized
              sizes="(max-width: 1024px) 100vw, 360px"
              priority
            />
          </Link>
        ) : (
          <div className="h-[180px] rounded-2xl bg-[color:var(--chip)] sm:h-[210px]" />
        )}
      </div>
    </article>
  );
}

function DeskCard({ story }: { story: Story }) {
  return (
    <article className="group flex min-h-[190px] flex-col rounded-2xl border border-[color:var(--line)] bg-[color:var(--chip)] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--line-strong)] hover:shadow-lg motion-reduce:transition-none">
      <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.16em]">
        <span className="text-[color:var(--primary-light)]">{(story.status ?? "developing").toUpperCase()}</span>
        {story.updates ? (
          <span className="text-[color:var(--muted)]">{story.updates} updates</span>
        ) : null}
      </div>
      <h3 className="mt-3 font-serif text-[16px] leading-snug text-[color:var(--cream)]">
        <Link href={`/stories/${story.slug}`}>{story.title}</Link>
      </h3>
      <p className="mt-auto pt-4 text-[11px] text-[color:var(--muted)]">
        Updated {formatDeskDate(story.published_at)}
      </p>
      <Link
        href={`/stories/${story.slug}`}
        className="mt-3 inline-flex w-fit rounded-full border border-[color:var(--line-strong)] px-3 py-1 text-[12px] text-[color:var(--cream-dim)]"
      >
        Open story
      </Link>
    </article>
  );
}

function SocialButton({
  label,
  filled,
  icon,
}: {
  label: string;
  filled?: boolean;
  icon: ReactNode;
}) {
  return (
    <a
      href="#"
      className={`flex items-center justify-center gap-2 rounded-full px-3 py-2 text-[13px] ${
        filled
          ? "bg-[color:var(--primary)] hover:bg-[color:var(--primary-light)] text-[color:var(--on-primary)]"
          : "border border-[color:var(--line-strong)] text-[color:var(--cream)]"
      }`}
    >
      {icon}
      {label}
    </a>
  );
}

export async function HomeDesk() {
  const [featured, desk, rising, mostRead] = await Promise.all([
    getFeaturedStory(),
    getDeskStories(),
    getRisingStories(),
    getMostReadStories(),
  ]);

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-5">
        <Featured story={featured} />

        <section>
          <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-[color:var(--cream)]">
              <span className="h-2 w-2 rounded-full bg-[color:var(--primary-light)]" />
              ON THE DESK NOW
            </p>
            <Link href="/stories" className="text-[12px] text-[color:var(--live)]">
              All live news →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {desk.slice(0, 3).map((story) => (
              <DeskCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-[color:var(--cream)]">
              <span className="h-2 w-2 rounded-full bg-[color:var(--primary-light)]" />
              RISING RIGHT NOW
            </p>
            <Link href="/stories" className="text-[12px] text-[color:var(--muted)]">
              See all news →
            </Link>
          </div>
          <ol className="space-y-4">
            {rising.map((story, index) => (
              <li key={story.id} className="flex gap-3">
                <span className="w-4 font-serif text-[15px] text-[color:var(--primary-light)]">{index + 1}</span>
                <div>
                  <Link
                    href={`/stories/${story.slug}`}
                    className="font-serif text-[16px] leading-snug text-[color:var(--cream)]"
                  >
                    {story.title}
                  </Link>
                  <p className="mt-1 text-[11px] text-[color:var(--muted)]">{story.author}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="space-y-4">
        <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-5">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[color:var(--muted)]">
            DISTRIBUTION
          </p>
          <p className="mt-2 text-[15px] text-[color:var(--cream)]">Join the official channels</p>
          <p className="mt-1 font-medium tracking-wide text-[color:var(--cream-dim)]">0710 280 973</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <SocialButton
              filled
              label="WhatsApp"
              icon={
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.33 4.94L2 22l5.4-1.41a10 10 0 0 0 4.64 1.17h.04c5.46 0 9.89-4.4 9.89-9.83C21.97 6.4 17.5 2 12.04 2Z" />
                </svg>
              }
            />
            <SocialButton
              filled
              label="Telegram"
              icon={
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M21.5 4.3 18.9 20.2c-.2 1-1.1 1.2-2.1.8l-5.7-4.2-2.8 2.7c-.3.3-.6.4-1 .4l.4-5.9 10.7-9.6c.5-.4 0-.7-.7-.3L5.4 12.3 1.7 11c-1-.3-1-1 .2-1.5L20.2 3.5c.9-.4 1.6.2 1.3.8Z" />
                </svg>
              }
            />
            <SocialButton
              label="Facebook"
              icon={
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4H16.5V5.3A19 19 0 0 0 14.2 5c-2.3 0-3.8 1.4-3.8 4v1.9H8v2.8h2.4V21h3.1Z" />
                </svg>
              }
            />
            <SocialButton
              label="X"
              icon={
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M17.6 3H20l-6.2 7.1L21 21h-5.5l-4.3-6.6L6.4 21H4l6.6-7.6L3.2 3h5.6l3.9 6L17.6 3Zm-1 16.2h1.5L7.5 4.7H5.9l10.7 14.5Z" />
                </svg>
              }
            />
            <SocialButton
              label="Instagram"
              icon={
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="4" y="4" width="16" height="16" rx="5" />
                  <circle cx="12" cy="12" r="3.5" />
                  <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
                </svg>
              }
            />
            <SocialButton
              label="TikTok"
              icon={
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M14 4c.4 2.6 2.1 4.4 4.7 4.7v2.4c-1.6 0-3.1-.5-4.4-1.4v6.6A6.3 6.3 0 1 1 9.8 10v2.6a3.7 3.7 0 1 0 2.6 3.5V4H14Z" />
                </svg>
              }
            />
          </div>
        </section>

        <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-5">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[color:var(--muted)]">
            MOST READ THIS WEEK
          </p>
          <ol className="mt-4 space-y-4">
            {mostRead.slice(0, 4).map((story, index) => (
              <li key={story.id} className="flex gap-3">
                <span className="font-serif text-[18px] text-[color:var(--primary-light)]">{index + 1}</span>
                <div>
                  <Link
                    href={`/stories/${story.slug}`}
                    className="text-[13.5px] leading-snug text-[color:var(--cream)]"
                  >
                    {story.title}
                  </Link>
                  <p className="mt-1 text-[11px] text-[color:var(--muted)]">{story.author}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <NewsletterCard />
      </div>
    </div>
  );
}
