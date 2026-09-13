import { Link } from "@tanstack/react-router";
import { categoryLabel, type BlogPost } from "@/lib/blog";

export function BlogCard({ post, readMore }: { post: BlogPost; readMore: string }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="fill-card group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
        <span className="absolute start-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider text-[#8FE24A] uppercase">
          {categoryLabel(post.category)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold group-hover:text-accent">{post.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-fg-muted">{post.excerpt}</p>
        <p className="mt-4 text-xs text-fg-subtle">
          {post.author} · {post.date}
        </p>
        <span className="mt-3 text-sm font-semibold text-accent">{readMore} →</span>
      </div>
    </Link>
  );
}
