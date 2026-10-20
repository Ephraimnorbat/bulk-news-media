import { Suspense } from "react";
import { CategoryFeed } from "@/components/CategoryFeed";

export const metadata = { title: "Interviews" };

export default function InterviewsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[color:var(--muted)]">Loading interviews...</div>}>
      <CategoryFeed category="interview" title="Interviews" description="Conversations, profiles, and first-hand perspectives." />
    </Suspense>
  );
}