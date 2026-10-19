import { Suspense } from "react";
import { getTopics, type Topic } from "@/lib/api/content";

export const metadata = { title: "Topics" };

// 1. Move the data fetching and rendering logic into a child component
async function TopicsList() {
  let topics: Topic[] = [];
  try { 
    topics = await getTopics(); 
  } catch { 
    /* The API may not be running during frontend development. */ 
  }

  return (
    <>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <li key={topic.id} className="rounded-2xl border border-[color:var(--line)] p-4">
            <h2 className="font-serif text-xl">{topic.name}</h2>
            <p className="mt-2 text-sm text-[color:var(--muted)]">{topic.description}</p>
          </li>
        ))}
      </ul>
      {topics.length === 0 ? (
        <p className="mt-3 text-[color:var(--muted)]">No topics published yet.</p>
      ) : null}
    </>
  );
}

// 2. The main page component wraps the list in a Suspense boundary
export default function TopicsPage() {
  return (
    <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-8">
      <h1 className="font-serif text-4xl">Topics</h1>
      <Suspense fallback={<div className="mt-6 text-sm text-[color:var(--muted)]">Loading topics...</div>}>
        <TopicsList />
      </Suspense>
    </section>
  );
}