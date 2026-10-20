import { Suspense } from "react";
import { CategoryFeed } from "@/components/CategoryFeed";

export const metadata = { title: "Opinion" };

export default function OpinionPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[color:var(--muted)]">Loading opinion...</div>}>
      <CategoryFeed category="opinion" title="Opinion" description="Commentary and viewpoints from our contributors." />
    </Suspense>
  );
}