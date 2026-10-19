import api from "./client";
import type { Paginated } from "./types";

export type Video = { id: number; title: string; slug: string; description: string; video_url: string; thumbnail: string; published_at: string };
export type MediaAsset = { id: number; title: string; description: string; file: string; media_type: "photo" | "audio" | "document"; created_at: string };
export type BlogPost = { id: number; title: string; slug: string; excerpt: string; body: string; image: string | null; author: string; published_at: string };
export type Topic = { id: number; name: string; slug: string; description: string };

async function list<T>(path: string): Promise<T[]> {
  const { data } = await api.get<Paginated<T> | T[]>(path);
  return Array.isArray(data) ? data : data.results;
}
export const getVideos = () => list<Video>("/videos/");
export const getMedia = () => list<MediaAsset>("/media/");
export const getBlogPosts = () => list<BlogPost>("/blog/");
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try { const { data } = await api.get<BlogPost>(`/blog/${slug}/`); return data; }
  catch { return null; }
}
export const getTopics = () => list<Topic>("/topics/");
export async function sendTip(payload: { name: string; email: string; phone?: string; message: string }) {
  const { data } = await api.post("/tips/", payload);
  return data;
}
