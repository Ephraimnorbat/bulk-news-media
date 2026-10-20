export type StoryStatus = "developing" | "live" | "update" | "standard";

export type Story = {
  id: string | number;
  slug: string;
  title: string;
  category?: "news" | "opinion" | "court_case" | "photo_story" | "interview";
  excerpt: string;
  body?: string;
  image?: string | null;
  author: string;
  published_at: string;
  updated_at?: string;
  status?: StoryStatus;
  updates?: number;
  kicker?: string;
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type AuthResponse = {
  access: string;
  refresh: string;
};

export type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  tip: string;
};
