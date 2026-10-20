import { CategoryFeed } from "@/components/CategoryFeed";

export const metadata = { title: "Opinion" };

export default function OpinionPage() {
  return <CategoryFeed category="opinion" title="Opinion" description="Commentary and viewpoints from our contributors." />;
}
