import api from "./client";
import { ENDPOINTS } from "./config";
import { mockDesk, mockFeatured, mockMostRead, mockRising } from "../mock-data";
import type { Paginated, Story } from "./types";

function unwrap(data: Paginated<Story> | Story[]): Story[] {
  return Array.isArray(data) ? data : data.results;
}

async function safeGet(path: string, fallback: Story[]): Promise<Story[]> {
  try {
    const { data } = await api.get<Paginated<Story> | Story[]>(path);
    const items = unwrap(data);
    return items.length ? items : fallback;
  } catch {
    return fallback;
  }
}

export function getFeaturedStory() {
  return safeGet(ENDPOINTS.featured, [mockFeatured]).then((items) => items[0] ?? mockFeatured);
}

export function getDeskStories() {
  return safeGet(ENDPOINTS.desk, mockDesk);
}

export function getRisingStories() {
  return safeGet(ENDPOINTS.rising, mockRising);
}

export function getMostReadStories() {
  return safeGet(ENDPOINTS.mostRead, mockMostRead);
}

export async function getStory(slug: string): Promise<Story | null> {
  try {
    const { data } = await api.get<Story>(ENDPOINTS.storyDetail(slug));
    return data;
  } catch {
    const all = [mockFeatured, ...mockDesk, ...mockRising, ...mockMostRead];
    return all.find((story) => story.slug === slug) ?? null;
  }
}

export async function searchStories(query: string): Promise<Story[]> {
  if (!query.trim()) return [];
  try {
    const { data } = await api.get<Paginated<Story> | Story[]>(ENDPOINTS.search, {
      params: { q: query },
    });
    return unwrap(data);
  } catch {
    const haystack = [mockFeatured, ...mockDesk, ...mockRising, ...mockMostRead];
    const needle = query.toLowerCase();
    return haystack.filter(
      (story) =>
        story.title.toLowerCase().includes(needle) ||
        story.excerpt.toLowerCase().includes(needle),
    );
  }
}
