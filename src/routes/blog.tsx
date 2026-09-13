import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BLOG_CATEGORIES, BLOG_POSTS, categoryLabel, type BlogCategoryId } from "@/lib/blog";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/layout/final-cta";
import { Reveal } from "@/components/layout/reveal";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { BlogCard } from "@/components/sections/blog-card";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: pageMeta(
      "Blog, Synapse Marketing Agency",
      "Practical writing on digital marketing, Meta Ads, websites, SEO, social media and growth for businesses in Quetta and across Pakistan.",
    ),
  }),
});

function BlogPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<BlogCategoryId>("all");

  const featured = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0]!;
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => {
      if (p.featured) return false;
      if (cat !== "all" && p.category !== cat) return false;
      if (!q) return true;
      return `${p.title} ${p.excerpt} ${p.author} ${categoryLabel(p.category)}`.toLowerCase().includes(q);
    });
  }, [query, cat]);

  const showFeatured = cat === "all" && !query.trim();

  return (
    <>
      <PageHero kicker={t("blog.kicker")} title={t("blog.title")} sub={t("blog.sub")} bg="/page-bg/blogs-key.jpg" />

      <section className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-wrap gap-2">
            {BLOG_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                className={cn("word-box !py-2 text-xs sm:text-sm", cat === c.id && "is-on")}
              >
                <span className="word-box-label">{c.id === "all" ? t("blog.all") : c.label}</span>
              </button>
            ))}
          </div>
          <label className="relative block w-full lg:max-w-xs">
            <span className="sr-only">{t("blog.search")}</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("blog.search")}
              className="h-11 w-full rounded-full border border-border bg-surface px-4 text-sm text-fg outline-none placeholder:text-fg-subtle focus:border-accent focus:ring-2 focus:ring-accent/25"
            />
          </label>
        </div>
      </section>

      {showFeatured ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <Reveal>
              <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group grid overflow-hidden rounded-[1.75rem] border border-border bg-surface lg:grid-cols-2">
                <div className="relative min-h-[16rem] overflow-hidden lg:min-h-[28rem]">
                  <img
                    src={featured.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10">
                  <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">{categoryLabel(featured.category)}</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold sm:text-4xl">{featured.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted sm:text-base">{featured.excerpt}</p>
                  <p className="mt-5 text-xs text-fg-subtle">
                    {featured.author} · {featured.date}
                  </p>
                  <span className="mt-6 inline-flex text-sm font-semibold text-accent">{t("blog.readMore")} →</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          {filtered.length === 0 ? (
            <p className="text-fg-muted">{t("blog.empty")}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <Reveal key={post.slug} delay={i * 50} from="scale">
                  <BlogCard post={post} readMore={t("blog.readMore")} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <FinalCta />
    </>
  );
}

