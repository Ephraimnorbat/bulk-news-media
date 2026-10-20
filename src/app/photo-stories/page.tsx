import { Suspense } from "react";
import { CategoryFeed } from "@/components/CategoryFeed";

export const metadata = { title: "Photo Stories" };

export default function PhotoStoriesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[color:var(--muted)]">Loading photo stories...</div>}>
      <CategoryFeed category="photo_story" title="Photo Stories" description="Stories told through images and captions." />
    </Suspense>
  );
}