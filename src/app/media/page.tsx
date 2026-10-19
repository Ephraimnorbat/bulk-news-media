import { Suspense } from "react";
import { getMedia, type MediaAsset } from "@/lib/api/content";
export const metadata = { title: "Media" };
function MediaFallback() {
  return (
    <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-8">
      <h1 className="font-serif text-4xl">Media</h1>
      <p className="mt-6 text-[color:var(--muted)]">Loading media…</p>
    </section>
  );
}

async function MediaContent() {
  let assets: MediaAsset[] = [];
  try { assets = await getMedia(); } catch { /* The API may not be running during frontend development. */ }
  return <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-8"><h1 className="font-serif text-4xl">Media</h1><ul className="mt-6 space-y-4">{assets.map((asset) => <li key={asset.id} className="rounded-2xl border border-[color:var(--line)] p-4"><a href={asset.file} className="font-serif text-xl" target="_blank" rel="noreferrer">{asset.title}</a><p className="mt-1 text-xs uppercase tracking-wide text-[color:var(--muted)]">{asset.media_type}</p>{asset.description ? <p className="mt-2 text-sm text-[color:var(--muted)]">{asset.description}</p> : null}</li>)}</ul>{assets.length === 0 ? <p className="mt-3 text-[color:var(--muted)]">No media published yet.</p> : null}</section>;
}

export default function MediaPage() {
  return <Suspense fallback={<MediaFallback />}><MediaContent /></Suspense>;
}
