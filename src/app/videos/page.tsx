import { getVideos, type Video } from "@/lib/api/content";
export const metadata = { title: "Videos" };
export default async function VideosPage() {
  let videos: Video[] = [];
  try { videos = await getVideos(); } catch { /* The API may not be running during frontend development. */ }
  return <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-8"><h1 className="font-serif text-4xl">Videos</h1><ul className="mt-6 grid gap-4 sm:grid-cols-2">{videos.map((video) => <li key={video.id} className="rounded-2xl border border-[color:var(--line)] p-4"><a href={video.video_url} className="font-serif text-xl" target="_blank" rel="noreferrer">{video.title}</a><p className="mt-2 text-sm text-[color:var(--muted)]">{video.description}</p></li>)}</ul>{videos.length === 0 ? <p className="mt-3 text-[color:var(--muted)]">No videos published yet.</p> : null}</section>;
}
