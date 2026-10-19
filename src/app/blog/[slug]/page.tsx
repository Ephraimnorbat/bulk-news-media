import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/api/content";

export const metadata = { title: "Blog" };

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<BlogPostFallback />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}

async function BlogPostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="group rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 transition duration-300 hover:border-[color:var(--line-strong)] hover:shadow-xl motion-reduce:transition-none sm:p-10">
      <p className="text-xs text-[color:var(--muted)]">{post.author}</p>
      <h1 className="mt-2 font-serif text-4xl">{post.title}</h1>
      <p className="mt-4 max-w-3xl text-[color:var(--cream-dim)]">{post.excerpt}</p>
      {post.image ? (
        <div className="relative mt-7 aspect-[16/9] max-h-[560px] overflow-hidden rounded-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
            unoptimized
            priority
          />
        </div>
      ) : null}
      <div className="mt-8 max-w-3xl whitespace-pre-wrap leading-8 text-[color:var(--cream-dim)]">
        {post.body}
      </div>
    </article>
  );
}

function BlogPostFallback() {
  return (
    <div className="animate-pulse rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-8" aria-label="Loading blog post">
      <div className="h-8 w-2/3 rounded bg-[color:var(--chip)]" />
      <div className="mt-6 aspect-[16/9] rounded-2xl bg-[color:var(--chip)]" />
      <div className="mt-8 h-40 rounded bg-[color:var(--chip)]" />
    </div>
  );
}
