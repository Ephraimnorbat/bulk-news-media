import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts, type BlogPost } from "@/lib/api/content";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogListFallback />}>
      <BlogPosts />
    </Suspense>
  );
}

async function BlogPosts() {
  let posts: BlogPost[] = [];
  try {
    posts = await getBlogPosts();
  } catch {
    // The API may not be running during frontend development.
  }

  return (
    <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 sm:p-8">
      <h1 className="font-serif text-4xl">Blog</h1>
      <ul className="mt-6 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block h-full overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--chip)] transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--line-strong)] hover:shadow-xl motion-reduce:transition-none"
            >
              {post.image ? (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    unoptimized
                  />
                </div>
              ) : null}
              <div className="p-5">
                <h2 className="font-serif text-2xl leading-snug group-hover:text-[color:var(--primary-light)]">
                  {post.title}
                </h2>
                {post.excerpt ? (
                  <p className="mt-2 text-sm text-[color:var(--muted)]">{post.excerpt}</p>
                ) : null}
                <p className="mt-3 text-xs text-[color:var(--muted)]">
                  {post.author} · {new Date(post.published_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {posts.length === 0 ? (
        <p className="mt-3 text-[color:var(--muted)]">No blog posts published yet.</p>
      ) : null}
    </section>
  );
}

function BlogListFallback() {
  return (
    <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 sm:p-8" aria-label="Loading blog posts">
      <div className="h-10 w-48 animate-pulse rounded bg-[color:var(--chip)]" />
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {[0, 1].map((item) => (
          <div key={item} className="h-72 animate-pulse rounded-2xl bg-[color:var(--chip)]" />
        ))}
      </div>
    </section>
  );
}
