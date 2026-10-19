import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { FloatButtons } from "@/components/FloatButtons";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BulkNewsMedia",
    template: "%s · BulkNewsMedia",
  },
  description: "Unfiltered. Bold. Uncovered. Live news desk reporting from BulkNewsMedia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[color:var(--page)] text-[color:var(--cream)]">
        <Header />
        <div className="mx-auto flex max-w-[1440px] gap-5 px-4 py-5 lg:px-6">
          <Sidebar />
          <main className="min-w-0 flex-1 pb-20">{children}</main>
        </div>
        <FloatButtons />
      </body>
    </html>
  );
}
