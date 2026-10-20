import { CategoryFeed } from "@/components/CategoryFeed";

export const metadata = { title: "News" };

export default function NewsPage() {
  return <CategoryFeed category="news" title="News" description="Latest reporting and developing coverage." />;
}
