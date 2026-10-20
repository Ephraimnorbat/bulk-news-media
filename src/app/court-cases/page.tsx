import { CategoryFeed } from "@/components/CategoryFeed";

export const metadata = { title: "Court Cases" };

export default function CourtCasesPage() {
  return <CategoryFeed category="court_case" title="Court Cases" description="Coverage of court cases and legal proceedings." />;
}
