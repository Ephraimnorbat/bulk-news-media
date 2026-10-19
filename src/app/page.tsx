import { Suspense } from "react";
import { HomeDesk } from "@/components/HomeDesk";

export default function Home() {
  return (
    <Suspense fallback={<HomeDeskFallback />}>
      <HomeDesk />
    </Suspense>
  );
}

function HomeDeskFallback() {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]" aria-label="Loading stories">
      <div className="space-y-5">
        <div className="h-[300px] animate-pulse rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)]" />
        <div className="h-[260px] animate-pulse rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)]" />
      </div>
      <div className="h-[360px] animate-pulse rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)]" />
    </div>
  );
}
