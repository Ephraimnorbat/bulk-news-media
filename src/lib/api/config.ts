/**
 * Django REST API configuration.
 * Change NEXT_PUBLIC_API_URL in `.env.local` to point at your backend.
 */
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api",
  timeout: 15_000,
  accessTokenKey: "bnm_access_token",
  refreshTokenKey: "bnm_refresh_token",
} as const;

export const ENDPOINTS = {
  stories: "/stories/",
  storyDetail: (slug: string) => `/stories/${slug}/`,
  featured: "/stories/featured/",
  desk: "/stories/desk/",
  rising: "/stories/rising/",
  mostRead: "/stories/most-read/",
  search: "/stories/search/",
  login: "/auth/login/",
  register: "/auth/register/",
  refresh: "/auth/token/refresh/",
  me: "/auth/me/",
  logout: "/auth/logout/",
  leads: "/leads/",
  newsletter: "/newsletter/",
  videos: "/videos/",
  media: "/media/",
  blog: "/blog/",
  tips: "/tips/",
  topics: "/topics/",
} as const;
