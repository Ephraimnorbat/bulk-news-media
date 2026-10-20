import { CategoryFeed } from "@/components/CategoryFeed";

export const metadata = { title: "Interviews" };

export default function InterviewsPage() {
  return <CategoryFeed category="interview" title="Interviews" description="Conversations, profiles, and first-hand perspectives." />;
}
