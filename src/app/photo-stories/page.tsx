import { CategoryFeed } from "@/components/CategoryFeed";

export const metadata = { title: "Photo Stories" };

export default function PhotoStoriesPage() {
  return <CategoryFeed category="photo_story" title="Photo Stories" description="Stories told through images and captions." />;
}
