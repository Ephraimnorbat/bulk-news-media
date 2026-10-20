import { Suspense } from "react";
import { CategoryFeed } from "@/components/CategoryFeed";

export const metadata = { title: "Court Cases" };

export default function CourtCasesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[color:var(--muted)]">Loading court cases...</div>}>
      <CategoryFeed category="court_case" title="Court Cases" description="Coverage of court cases and legal proceedings." />
    </Suspense>
  );
}