import type { Story } from "./api/types";

export const mockFeatured: Story = {
  id: 1,
  slug: "court-files-open-on-nairobi-metal-cage-standoff",
  kicker: "Top of the desk · 3d",
  title:
    "Court Files Open on the Nairobi Metal-Cage Standoff That Halted a Magistrate Hearing",
  excerpt:
    "What began as a tense afternoon in a downtown courtroom has widened into a money, police, and lawyers story — the kind of Nairobi drama that starts small and fills a docket.",
  image:
    "https://images.unsplash.com/photo-1589216532372-1c2a3676d0d3?auto=format&fit=crop&w=900&q=80",
  author: "BulkNewsMedia",
  published_at: "2026-10-08T09:00:00Z",
  status: "live",
};

export const mockDesk: Story[] = [
  {
    id: 2,
    slug: "court-adjourns-as-otieno-parents-delay-sentencing",
    title: "Court Temporarily Adjourns As Otieno Parents Delay Sentencing With Fresh Filings",
    excerpt: "The bench pushed the matter after last-minute papers arrived from counsel.",
    author: "BulkNewsMedia",
    published_at: "2026-09-16T11:00:00Z",
    status: "developing",
    updates: 2,
  },
  {
    id: 3,
    slug: "university-scion-held-over-sh1-2b-fraud-claims",
    title: "University scion held overnight over Sh1.2 billion fraud claims",
    excerpt: "Investigators say the paper trail now runs through three banks.",
    author: "BulkNewsMedia",
    published_at: "2026-09-11T08:00:00Z",
    status: "developing",
    updates: 2,
  },
  {
    id: 4,
    slug: "tanzania-cabinet-reshuffle-hits-samia-briefing",
    title: "Tanzania Cabinet Reshuffle Hits Samia Briefing on Regional Trade",
    excerpt: "Dar es Salaam sources say two dockets changed hands before dawn.",
    author: "BulkNewsMedia",
    published_at: "2026-08-22T07:00:00Z",
    status: "developing",
  },
];

export const mockRising: Story[] = [
  {
    id: 5,
    slug: "ruto-turns-to-camels-and-buffaloes-as-milk-prices-soar",
    title: "Ruto Turns to Camels and Buffaloes to Fix Kenya’s Milk Shortage as Prices Soar",
    author: "BulkNewsMedia",
    excerpt: "",
    published_at: "2026-10-10T06:00:00Z",
  },
  {
    id: 6,
    slug: "musk-questions-ambani-starlink-licensing-delays",
    title:
      "Elon Musk Questions Whether Mukesh Ambani is the Real Boss of India as Starlink Faces Licensing Delays",
    author: "BulkNewsMedia",
    excerpt: "",
    published_at: "2026-10-09T14:00:00Z",
  },
  {
    id: 7,
    slug: "pillay-wins-nobel-peace-prize-human-rights-law",
    title:
      "Navi Pillay Wins 2026 Nobel Peace Prize for Defending Human Rights and International Law",
    author: "BulkNewsMedia",
    excerpt: "",
    published_at: "2026-10-11T12:00:00Z",
  },
];

export const mockMostRead: Story[] = [
  {
    id: 1,
    slug: mockFeatured.slug,
    title: mockFeatured.title,
    excerpt: mockFeatured.excerpt,
    author: "BulkNewsMedia",
    published_at: mockFeatured.published_at,
  },
  {
    id: 8,
    slug: "body-found-near-daystar-identified-as-ivy-anyang",
    title:
      "Body found near Daystar University identified by friends as Ivy Anyango, who disappeared in June",
    author: "BulkNewsMedia",
    excerpt: "",
    published_at: "2026-10-07T10:00:00Z",
  },
  {
    id: 9,
    slug: "lawyers-forced-media-gag-order-mutai-fraud-case",
    title:
      "How Lawyers Forced a Media Gag Order to be Issued by Magistrate Paul Mutai in KSh14 Million Fraud Case Against Barnabas Kiprot Bwabok",
    author: "BulkNewsMedia",
    excerpt: "",
    published_at: "2026-10-06T09:00:00Z",
  },
  {
    id: 10,
    slug: "tet-tea-factory-employees-expose-mass-firings",
    title:
      "TET Tea Factory Employees Expose Mass Firings and Family Interference in Management",
    author: "BulkNewsMedia",
    excerpt: "",
    published_at: "2026-10-05T09:00:00Z",
  },
];
