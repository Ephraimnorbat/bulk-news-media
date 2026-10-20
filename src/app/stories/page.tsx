import { Suspense } from "react";
import { CategoryFeed } from "@/components/CategoryFeed";

export const metadata = { title: "News" };

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[color:var(--muted)]">Loading news...</div>}>
      <CategoryFeed category="news" title="News" description="Latest reporting and developing coverage." />
    </Suspense>
  );
}